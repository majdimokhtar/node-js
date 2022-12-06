const path = require("path")
require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const errorController = require("./controllers/error")
// const mongoConnect = require("./util/database").mongoConnect
const User = require("./models/user")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  User.findById("638f5b7f166485d5773053e2")
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.log(err))
})

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// mongoConnect(() => {
//   app.listen(3000, console.log(`server is running on port ${process.env.PORT}`))
// })

mongoose
  .connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.x5apesq.mongodb.net/${process.env.mongodb_database_key}?retryWrites=true&w=majority`
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Majdi",
          email: "majdi@test.com",
          cart: {
            items: [],
          },
        })
        user.save() 
      }
    })

    app.listen(
      3000,
      console.log(`server is running on port ${process.env.PORT}`)
    )
  })
  .catch((err) => console.log(err))
