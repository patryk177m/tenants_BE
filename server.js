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

const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname);
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;

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

  res.redirect("/");
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }

  next();
};

const viewsPath = path.join(__dirname, "components");
// console.log(viewsPath);
app.set("views", viewsPath);
// app.set("view engine", "js");
app.set('view engine', 'pug')
app.use(express.static("./public"));

app.get("/register", checkLoggedIn, (req, res) => {
  console.log("/register");
  // res.render("pages/register.ejs", {
  //   user: req.user,
  // });

  res.render(`${process.env.CLIENT_URL}/register.tsx`, {
    user: req.user,
  });
});

app.post(
  "/register",
  passport.authenticate("local-signup", {
    successRedirect: "/login?reg=success",
    failureRedirect: "/register?reg=failure",
  })
);

app.get("/login", checkLoggedIn, (req, res) => {
  console.log("/login");

  // res.render("pages/login.ejs", {
  //   user: req.user,
  // });
  res.render(`${process.env.CLIENT_URL}/login.tsx`, {
    user: req.user,
  });
});

app.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/dashboard",
    failureRedirect: "/login?log=failure",
  })
);

app.get("/dashboard", checkAuthenticated, (req, res) => {
  console.log("/dashboard");
  //   res.render("pages/dashboard.ejs",
  //   { user: req.user }
  // );

  res.render(`${process.env.CLIENT_URL}/dashboard.tsx`, {
    user: req.user,
  });
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

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    console.log("User logged out!");

    if (err) return next(err);

    res.redirect("/");
  });
});

app.post("/logout", (req, res) => {
  req.logout(function (err) {
    console.log("User logged out!");

    if (err) return next(err);

    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  // res.render("pages/index", {
  //   user: req.user
  // });

  res.render(`${process.env.CLIENT_URL}/../App.tsx`)
});

app.listen(PORT);
