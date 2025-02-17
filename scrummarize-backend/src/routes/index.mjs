import { Router } from 'express';
import productBacklogRouter from './product-backlog.mjs';
import sprintBoardRouter from './sprint-board.mjs';
import sprintBacklogRouter from './sprint-backlog.mjs';
import authRouter from './auth.mjs';
import generalRouter from './general.mjs';
import adminRouter from './admin.mjs';
import { checkAuthenticated } from '../utils.mjs';

const router = Router();

router.use('/product-backlog', checkAuthenticated, productBacklogRouter);
router.use('/sprint-board', checkAuthenticated, sprintBoardRouter);
router.use('/sprint-backlog', checkAuthenticated, sprintBacklogRouter);
router.use('/auth', authRouter);
router.use('/admin', checkAuthenticated, adminRouter);
router.use(checkAuthenticated, generalRouter);

export default router;
