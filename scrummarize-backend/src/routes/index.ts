import { Router } from 'express';
import productBacklogRouter from './product-backlog-routes';

const router = Router();

router.use('/product-backlog', productBacklogRouter);

export default router;
