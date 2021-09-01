const express = require("express");
const path = require("path");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
// prendemos el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

app.use(express.static(path.join(__dirname, "public")));
