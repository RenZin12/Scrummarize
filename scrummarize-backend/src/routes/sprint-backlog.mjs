import { Router } from 'express';
import { getTasksWithTags } from '../utils.mjs';
import {
  getSBCompletedTasks,
  getSBInProgressTasks,
  getSBNotStartedTasks,
} from '../database/sprintBacklogDB.mjs';
import { getSprint } from '../database/sprintBoardDB.mjs';

const router = Router();

router
  .route('/:sprintID')

  .get(async (request, response) => {
    const sprintID = request.params.sprintID;

    const sprint = await getSprint(sprintID);

    const notStartedTasks = await getSBNotStartedTasks(sprintID);
    const inProgressTasks = await getSBInProgressTasks(sprintID);
    const completedTasks = await getSBCompletedTasks(sprintID);

    const notStarted = await getTasksWithTags(notStartedTasks);
    const inProgress = await getTasksWithTags(inProgressTasks);
    const completed = await getTasksWithTags(completedTasks);

    response.send({
      sprint,
      notStarted,
      inProgress,
      completed,
    });
  });

export default router;
