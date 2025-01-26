import { Router } from 'express';
import { getAccumulationOfEffortData, getTasksWithTags } from '../utils.mjs';
import {
  deleteSBTask,
  getSBCompletedTasks,
  getSBInProgressTasks,
  getSBNotStartedTasks,
  getSBTask,
  getSBTasks,
  getTimeSpentLog,
  getTotalTimeSpent,
  logTimeSpent,
  modifySBTask,
  modifySBTaskStatus,
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

    response.send(sprint);
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
    const { tags, timeSpent, status, ...taskInfo } = request.body;

    const modifiedTask = await modifySBTask(taskID, sprintID, taskInfo);
    const modifiedStatus = await modifySBTaskStatus(taskID, sprintID, status);

    await deleteTaskTag(taskID);
    const newTags = await addTaskTags(taskID, tags);

    Number(timeSpent) > 0 && (await logTimeSpent(taskID, timeSpent));
    const totalTimeSpent = await getTotalTimeSpent(taskID);

    response.send({
      ...modifiedTask,
      status: modifiedStatus,
      tags: newTags,
      totalTimeSpent,
    });
  })

  .delete(async (request, response) => {
    const { sprintID, taskID } = request.params;

    await deleteSBTask(taskID, sprintID);

    response.send();
  });

router
  .route('/:sprintID/kanban')

  .get(async (request, response) => {
    const sprintID = request.params.sprintID;
    const notStartedTasks = await getSBNotStartedTasks(sprintID);
    const inProgressTasks = await getSBInProgressTasks(sprintID);
    const completedTasks = await getSBCompletedTasks(sprintID);

    const notStarted = await getTasksWithTags(notStartedTasks);
    const inProgress = await getTasksWithTags(inProgressTasks);
    const completed = await getTasksWithTags(completedTasks);

    response.send({
      notStarted,
      inProgress,
      completed,
    });
  });

router
  .route('/:sprintID/table')

  .get(async (request, response) => {
    const sprintID = request.params.sprintID;

    let tasks = await getSBTasks(sprintID);
    tasks = await getTasksWithTags(tasks);

    response.send(tasks);
  });

export default router;
