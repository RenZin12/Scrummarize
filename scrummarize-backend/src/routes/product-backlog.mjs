import { Router } from "express";
import {
  getPBTasks,
  addPBTask,
  getPBTask,
  modifyPBTask,
  deletePBTask,
  movePBTasks,
} from "../database/productBacklogDB.mjs";
import {
  addTaskTags,
  getTaskTags,
  deleteTaskTag,
} from "../database/indexDB.mjs";

const router = Router();

router
  .route("/")

  .get(async (request, response) => {
    const tasks = await getPBTasks();

    const promiseTasks = tasks.map(async (task) => {
      const tags = await getTaskTags(task.taskID);

      return {
        ...task,
        tags,
      };
    });

    const retrievedTasks = await Promise.all(promiseTasks);

    response.send(retrievedTasks);
  })

  .post(async (request, response) => {
    const { tags, ...taskInfo } = request.body;

    const newTask = await addPBTask(taskInfo);
    const addedTags = await addTaskTags(newTask.taskID, tags);

    response.send({
      ...newTask,
      tags: addedTags,
    });
  });

router
  .route("/task/:taskID")

  .get(async (request, response) => {
    const taskID = request.params.taskID;

    const task = await getPBTask(taskID);
    const tags = await getTaskTags(taskID);

    response.send({
      ...task,
      tags,
    });
  })

  .put(async (request, response) => {
    const taskID = request.params.taskID;
    const { tags, ...taskInfo } = request.body;

    const modifiedTask = await modifyPBTask(taskID, taskInfo);
    await deleteTaskTag(taskID);
    const newTags = await addTaskTags(taskID, tags);

    response.send({
      ...modifiedTask,
      tags: newTags,
    });
  })

  .delete(async (request, response) => {
    const taskID = request.params.taskID;

    await deletePBTask(taskID);

    response.send();
  });

router
  .route("/task/move")

  .patch(async (request, response) => {
    const { sprintID, taskIDs } = request.body;

    await movePBTasks(sprintID, taskIDs);

    response.send();
  });

export default router;
