import { Router } from 'express';
import {
  fetchProductBacklogTasksFromDB,
  insertProductBacklogTaskToDB,
} from '../models/product-backlog-model';
import { InsertTask } from '../lib/types';

const productBacklogRouter = Router();

productBacklogRouter
  .route('/tasks')

  .get(async (req, res, next) => {
    const tasks = await fetchProductBacklogTasksFromDB();

    res.send(tasks);
  });

productBacklogRouter
  .route('/task')

  .post(async (req, res) => {
    const task: InsertTask = req.body;

    await insertProductBacklogTaskToDB(task);

    res.sendStatus(201);
  });

export default productBacklogRouter;
