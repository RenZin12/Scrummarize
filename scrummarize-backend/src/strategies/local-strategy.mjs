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
    if (!user) throw new Error('User Not Found');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);
      if (!user) throw new Error('User not found');
      if (!bcrypt.compareSync(password, user.password))
        throw new Error('Invalid Password');
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);
