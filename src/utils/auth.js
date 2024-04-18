import passport from "passport";
import LocalStrategy from "passport-local";

import { usersController } from "../controllers/UsersController.js";

passport.serializeUser((user, done) => {
  console.log("serializedUser(), user.id: ", user.id);

  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  try {
    const userDb = await usersController.getUserById(id);
    console.log("deserializeUser(), userDb: ", userDb);

    done(null, userDb);
  } catch (err) {
    done(err);
  }
});

//rejestracja użytkowniaka
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userExists = await usersController.getUserByEmail(email);
        if (userExists) {
          return done(null, false);
        }

        const { name, surname, phone, postalcode, city, address } = req.body;

        const userDb = await usersController.createUser({
          name,
          surname, 
          email, 
          password,
          phone,
          postalcode,
          city,
          address,
        });

        return done(null, userDb);
      } catch (err) {
        done(err);
      }
    }
  )
);

const authUser = async (req, email, password, done) => {
  try {
    const authenticatedUser = await usersController.getUserByEmail(email);
    if (!authenticatedUser) {
      return done(null, false);
    }

    if (!usersController.validPassword(password, authenticatedUser)) {
      return done(null, false);
    }

    return done(null, authenticatedUser);
  } catch (err) {
    return done(err);
  }
}

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
authUser
))

export {
  passport,
}