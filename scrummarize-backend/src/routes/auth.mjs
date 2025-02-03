import { Router } from 'express';
import passport from 'passport';
import {
  checkAuthenticated,
  checkNotAuthenticated,
  hashPassword,
} from '../utils.mjs';
import { addUser } from '../database/usersDB.mjs';

const router = Router();

router
  .route('/login')

  .post(checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({
          isAuthenticated: false,
          user: null,
          message: info.message,
        });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.send({
          isAuthenticated: true,
          user: req.user,
          message: 'Login successful',
        });
      });
    })(req, res, next);
  });

router
  .route('/status')

  .get((req, res) => {
    if (!req.user) {
      return res.send({
        isAuthenticated: false,
        user: null,
        message: 'Not authenticated',
      });
    }

    res.send({
      isAuthenticated: true,
      user: req.user,
      message: 'Authenticated',
    });
  });

router
  .route('/logout')

  .delete(checkAuthenticated, (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.send({
        isAuthenticated: false,
        user: null,
        message: 'Logout successful',
      });
    });
  });

router
  .route('/signup')

  .post(async (request, response) => {
    const { username, password } = request.body;
    const hashedPassword = hashPassword(password);
    const newUser = await addUser(username, hashedPassword);
    response.send(newUser);
  });

export default router;
