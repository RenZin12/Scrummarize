import passport from 'passport';
import { Strategy } from 'passport-local';
import { findUserByUsername, findUserByUserID } from '../database/usersDB.mjs';
import bcrypt from 'bcrypt';

passport.serializeUser((user, done) => {
  done(null, user.userID);
});

passport.deserializeUser(async (userID, done) => {
  try {
    const user = await findUserByUserID(userID);
    if (user) {
      done(null, {
        userID: user.userID,
        username: user.username,
        role: user.role,
      });
    } else {
      done(null, false, { message: 'User not found' });
    }
  } catch (error) {
    done(error);
  }
});

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, {
        userID: user.userID,
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      return done(error);
    }
  })
);
