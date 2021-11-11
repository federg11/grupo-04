const express = require('express');
const path = require('path');
const cookie = require("cookie-parser");
const session = require('express-session');
const methodOverride = require("method-override");
const userLoggedNavBarMiddleware = require('./middlewares/userLoggedNavBarMiddleware');

//inicializamos express
const app = express();


app.use(session({
    secret: "es un secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookie());
app.use(userLoggedNavBarMiddleware);

//middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// prendemos el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
});


//routes system -require
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


//routes system - use
app.use('/', indexRouter);
app.use("/user", usersRouter);