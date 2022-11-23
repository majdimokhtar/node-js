const path = require("path")

const bodyParser = require("body-parser")
const hbs = require("express-handlebars")

const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const express = require("express")

const app = express()

app.engine(
  "hbs",
  hbs({ layoutDir: "views/layouts", defaultLayout: "main-laout", extname :"hbs" })
)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminData.routes)

app.use(shopRoutes)

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
  res.render("404", { PageTitle: "404 Not Found" })
})

app.listen(3000, console.log("server is running on port 3000"))
