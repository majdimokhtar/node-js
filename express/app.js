const bodyParser = require("body-parser")

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const express = require("express")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use("/admin", adminRoutes)

app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found </h1>")
})

app.listen(3000, console.log("server is running on port 3000"))

// app.use("/", (req, res, next) => {
//   console.log("always runs")
//   next()
// })

// const server = http.createServer(app)

// server.listen(3000,console.log("server is running on port 3000"))
