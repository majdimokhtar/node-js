const User = require("../models/user")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")
const { validationResult } = require("express-validator/check")

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
)

exports.getLogin = (req, res, next) => {
  let message = req.flash("error")
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  })
}

exports.getSignup = (req, res, next) => {
  let message = req.flash("error")
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  })
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "invalid email or password")
        return res.redirect("/login")
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true
            req.session.user = user
            return req.session.save((err) => {
              console.log(err)
              res.redirect("/")
            })
          }
          req.flash("error", "invalid email or password")
          res.redirect("/login")
        })
        .catch((err) => {
          console.log(err)
          res.redirect("/login")
        })
    })
    .catch((err) => console.log(err))
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
    })
  }
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "email exist already")
        return res.redirect("/signup")
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          })
          return user.save()
        })
        .then((result) => {
          res.redirect("/login")
          return transporter
            .sendMail({
              to: email,
              from: "majdi.mokhtar@gmail.com",
              subject: "Signup Succeeded",
              html: "<h1>You signed up!</h1>",
            })
            .catch((err) => console.log(err))
        })
    })
    .catch((err) => console.log(err))
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect("/")
  })
}

exports.getReset = (req, res, next) => {
  let message = req.flash("error")
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  })
}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
      return res.redirect("/reset")
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No accout with that email found")
          return res.redirect("/reset")
        }
        user.resetToken = token
        user.resetTokenExperition = Date.now() + 360000
        user.save()
      })
      .then((result) => {
        res.redirect(`http://localhost:3000/reset/${token}`)
        transporter.sendMail({
          to: req.body.email,
          from: "majdi.mokhtar@gmail.com",
          subject: "Password Reset",
          html: `
          <p>Requested password reset</p>
          <p>Click this <a href='http://localhost:3000/reset/${token}'>link</a> to reset your password</p>
          `,
        })
      })
      .catch((err) => console.log(err))
  })
}

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token
  User.findOne({ resetToken: token, resetTokenExperition: { $gt: Date.now() } })
    .then((user) => {
      let message = req.flash("error")
      if (message.length > 0) {
        message = message[0]
      } else {
        message = null
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      })
    })
    .catch((err) => console.log(err))
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password
  const userId = req.body.userId
  const passwordToken = req.body.passwordToken
  let resetUser

  User.findOne({
    resetToken: passwordToken,
    resetTokenExperition: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user
      return bcrypt.hash(newPassword, 12)
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword
      resetUser.resetToken = undefined
      resetUser.resetTokenExperition = undefined
      return resetUser.save()
    })
    .then((result) => {
      res.redirect("/login")
    })
    .catch((err) => console.log(err))
}
