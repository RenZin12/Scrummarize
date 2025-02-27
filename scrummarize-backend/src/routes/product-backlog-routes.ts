import { Router } from 'express';

const productBacklogRouter = Router();

productBacklogRouter
  .route('/')

  .get((req, res) => {
    res.send('hi');
  });

export default productBacklogRouter;
