import { Router } from 'express';
import productBacklogRouter from './product-backlog.mjs';
import sprintBoardRouter from './sprint-board.mjs';
import sprintBacklogRouter from './sprint-backlog.mjs';

const router = Router();

router.use('/product-backlog', productBacklogRouter);
router.use('/sprint-board', sprintBoardRouter);
router.use('/sprint-backlog', sprintBacklogRouter);

export default router;
