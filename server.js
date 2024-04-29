import "dotenv/config";
import express from "express";
import { passport } from "./src/utils/auth.js";
import expressSession from "express-session";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { authRole } from "./src/utils/aclauth.js";

import { usersController } from "./src/controllers/UsersController.js";
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
// const __dirname = dirname(fileURLToPath(process.env.PATH_APP));

// const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname);
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

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

  res.redirect(`${CLIENT_URL}/`);
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect(`${CLIENT_URL}/dashboard`);
  }

  next();
};

// const viewsPath = path.join(__dirname, "components");
// app.set("views", viewsPath);
// app.set('view engine', 'pug')
app.use(express.static("./public"));

app.get(`${CLIENT_URL}/register`, checkLoggedIn, (req, res) => {
  console.log("/register");

  res.send(req.user);
});

app.post(
  `${CLIENT_URL}/register`,
  passport.authenticate("local-signup", {
    successRedirect: `${CLIENT_URL}/login?reg=success`,
    failureRedirect: `${CLIENT_URL}/register?reg=failure`,
  })
);

app.get(`${CLIENT_URL}/login`, checkLoggedIn, (req, res) => {
  console.log("/login");

  res.send(req.user);
});

app.post(
  `${CLIENT_URL}/login`,
  passport.authenticate("local-login", {
    successRedirect: `${CLIENT_URL}/dashboard`,
    failureRedirect: `${CLIENT_URL}/login?log=failure`,
  })
);

app.get(`${CLIENT_URL}/dashboard`, checkAuthenticated, (req, res) => {
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

app.get(`${CLIENT_URL}/logout`, (req, res) => {
  req.logout(function (err) {
    console.log("User logged out!");

    if (err) return next(err);

    res.redirect(`${CLIENT_URL}/`);
  });
});

app.post(`${CLIENT_URL}/logout`, (req, res) => {
  req.logout(function (err) {
    console.log("User logged out!");

    if (err) return next(err);

    res.redirect(`${CLIENT_URL}/`);
  });
});

app.get(`${CLIENT_URL}/`, (req, res) => {

  res.send("Witaj na serwerze APP-TENANT !");
});

app.listen(PORT);
