import { Router } from 'express';
import productBacklogRouter from './product-backlog.mjs';
import sprintBoardRouter from './sprint-board.mjs';
import sprintBacklogRouter from './sprint-backlog.mjs';
import authRouter from './auth.mjs';
import generalRouter from './general.mjs';
import adminRouter from './admin.mjs';

const router = Router();

router.use('/product-backlog', productBacklogRouter);
router.use('/sprint-board', sprintBoardRouter);
router.use('/sprint-backlog', sprintBacklogRouter);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use(generalRouter);

export default router;
