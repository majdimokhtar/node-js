const path = require("path")

const bodyParser = require("body-parser")
// const hbs = require("express-handlebars")

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const express = require("express")

const app = express()
const errorController =require("./controllers/error")

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)

app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000, console.log("server is running on port 3000"))
