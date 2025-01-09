import { Router } from 'express';
import productBacklogRouter from './product-backlog.mjs';
import sprintBoardRouter from './sprint-board.mjs';

const router = Router();

router.use('/product-backlog', productBacklogRouter);
router.use('/sprint-board', sprintBoardRouter);

export default router;
