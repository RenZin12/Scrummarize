import { Router } from 'express';
import { getAccumulationOfEffortData, getTasksWithTags } from '../utils.mjs';
import {
  deleteSBTask,
  getSBCompletedTasks,
  getSBInProgressTasks,
  getSBNotStartedTasks,
  getSBTask,
  getTimeSpentLog,
  getTotalTimeSpent,
  logTimeSpent,
  modifySBTask,
} from '../database/sprintBacklogDB.mjs';
import { getSprint } from '../database/sprintBoardDB.mjs';
import {
  addTaskTags,
  deleteTaskTag,
  getTaskTags,
} from '../database/indexDB.mjs';

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
    const totalTimeSpent = await getTotalTimeSpent(taskID);
    const timeSpentLog = await getTimeSpentLog(taskID);
    const sprint = await getSprint(sprintID);

    response.send({
      ...task,
      tags,
      totalTimeSpent,
      accumulationOfEffortData: getAccumulationOfEffortData(
        timeSpentLog,
        sprint.startDate
      ),
    });
  })

  .put(async (request, response) => {
    const { sprintID, taskID } = request.params;
    const { tags, timeSpent, ...taskInfo } = request.body;

    const modifiedTask = await modifySBTask(taskID, sprintID, taskInfo);
    await deleteTaskTag(taskID);
    const newTags = await addTaskTags(taskID, tags);

    Number(timeSpent) > 0 && (await logTimeSpent(taskID, timeSpent));
    const totalTimeSpent = await getTotalTimeSpent(taskID);

    response.send({
      ...modifiedTask,
      tags: newTags,
      totalTimeSpent,
    });
  })

  .delete(async (request, response) => {
    const { sprintID, taskID } = request.params;

    await deleteSBTask(taskID, sprintID);

    response.send();
  });

export default router;
