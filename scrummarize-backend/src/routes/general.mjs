import { Router } from 'express';
import { getUsers } from '../database/usersDB.mjs';

const generalRouter = Router();

generalRouter
  .route('/users')

  .get(async (req, res) => {
    const users = await getUsers();
    res.send(users);
  });

export default generalRouter;
