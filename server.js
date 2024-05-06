import "dotenv/config";
import express from "express";
import { passport } from "./src/utils/auth.js";
import expressSession from "express-session";
import cors from "cors";

// import { sequelize } from './src/utils/db.js';
// import './src/models/user-model.js';
// sequelize.sync({ force: true });

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;
const URL = process.env.CLIENT_URL;

app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect(`/`);
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect(`/dashboard`);
  }

  next();
};

// const viewsPath = path.join(__dirname, "components");
// app.set("views", viewsPath);
// app.set('view engine', 'pug')
app.use(express.static("./public"));

app.get(`/register`, checkLoggedIn, (req, res) => {
  console.log("/register");

  res.send(req.user);
});

app.post(
  `/register`,
  passport.authenticate("local-signup", {
    successRedirect: `/login?reg=success`,
    failureRedirect: `/register?reg=failure`,
  })
);

app.get(`/login`, checkLoggedIn, (req, res) => {
  console.log("/login");

  res.send(req.user);
});

app.post(
  `/login`,
  passport.authenticate("local-login", {
    successRedirect: `/dashboard`,
    failureRedirect: `/login?log=failure`,
  })
);

app.get(`/dashboard`, checkAuthenticated, (req, res) => {
  console.log("/dashboard");
  
  res.send(req.user);
});

// app.get("/admin/users", authRole, async (req, res) => {
//   console.log("/admin/users");

//   const users = await usersController.getAll();
//   res.render("pages/admin/users.ejs", {
//     user: req.user,
//     users,
//   });
// });

// app.get("/admin/users/add", authRole, async (req, res) => {
//   console.log("/admin/users/add");

//   res.render("pages/admin/users_add.ejs", {
//     user: req.user,
//     users,
//   });
// });

// app.post("/admin/users/add", authRole, async (req, res) => {
//   console.log("/admin/users/add");
//   console.log("req.body: ", req.body);

//   const userDb = await usersController.createUser(req.body);
//   res.render("pages/admin/users");
// });

// app.get("/admin/users/edit/:id", authRole, async (req, res) => {
//   console.log("/admin/users/edit/:id");
//   console.log("req.body: ", req.body);

//   const userDb = await usersController.createUser(req.body);
//   res.render("pages/admin/users");
// });

app.get(`/logout`, (req, res) => {
  req.logout(function (err) {
    console.log("User logged out!");

    if (err) return next(err);

    res.redirect(`/`);
  });
});

app.post(`/logout`, (req, res) => {
  req.logout(function (err) {
    console.log("User logged out!");

    if (err) return next(err);

    res.redirect(`/`);
  });
});

app.get(`/`, (req, res) => {

  res.send("Witaj na serwerze APP-TENANT !");
});

app.listen(PORT);
