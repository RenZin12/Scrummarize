import { Router } from 'express';
import { getUsernames } from '../database/usersDB.mjs';

const generalRouter = Router();

generalRouter
  .route('/users')

  .get(async (req, res) => {
    const usernames = await getUsernames();
    res.send(usernames);
  });

export default generalRouter;
