import { Router } from 'express';
import passport from 'passport';
import { hashPassword } from '../utils.mjs';
import { addUser } from '../database/usersDB.mjs';

const router = Router();

router
  .route('/login')

  .post(passport.authenticate('local'), (request, response) => {
    response.send();
  });

router
  .route('/status')

  .get((request, response) => {
    return request.user ? response.send() : response.sendStatus(401);
  });

router
  .route('/logout')

  .post((request, response) => {
    if (!request.user) return response.sendStatus(401);
    request.logout((error) => {
      if (error) return response.sendStatus(400);
      response.send();
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
