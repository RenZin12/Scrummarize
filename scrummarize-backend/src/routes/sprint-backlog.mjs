import { Router } from 'express';
import { getTasksWithTags } from '../utils.mjs';
import {
  getSBCompletedTasks,
  getSBInProgressTasks,
  getSBNotStartedTasks,
  getSBTask,
} from '../database/sprintBacklogDB.mjs';
import { getSprint } from '../database/sprintBoardDB.mjs';
import { getTaskTags } from '../database/indexDB.mjs';

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

router
  .route('/:sprintID/task/:taskID')

  .get(async (request, response) => {
    const { sprintID, taskID } = request.params;

    const task = await getSBTask(taskID, sprintID);
    const tags = await getTaskTags(taskID);
    const totalLogTime = 0;

    response.send({
      ...task,
      tags,
      totalLogTime,
    });
  });

export default router;
