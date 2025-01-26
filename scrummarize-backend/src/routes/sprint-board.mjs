import { Router } from 'express';
import {
  addSprint,
  deleteSprint,
  getCompletedStoryPoints,
  getSprint,
  getSprintNames,
  getSprints,
  getTotalStoryPoints,
  modifySprint,
} from '../database/sprintBoardDB.mjs';
import { getSprintBurndownData } from '../utils.mjs';

const router = Router();

router
  .route('/')

  .get(async (request, response) => {
    const sprints = await getSprints();

    const promiseSprints = sprints.map(async (sprint) => {
      const totalStoryPoints = await getTotalStoryPoints(sprint.sprintID);

      return {
        ...sprint,
        completedStoryPoints: await getCompletedStoryPoints(sprint.sprintID),
        totalStoryPoints,
        sprintBurndownData: await getSprintBurndownData(
          sprint.sprintID,
          sprint.startDate,
          totalStoryPoints
        ),
      };
    });

    response.send(await Promise.all(promiseSprints));
  })

  .post(async (request, response) => {
    const { ...sprintInfo } = request.body;

    const newSprint = await addSprint(sprintInfo);

    response.send(newSprint);
  });

router
  .route('/sprint/:sprintID')

  .get(async (request, response) => {
    const sprintID = request.params.sprintID;

    const sprint = await getSprint(sprintID);

    response.send(sprint);
  })

  .put(async (request, response) => {
    const sprintID = request.params.sprintID;
    const { ...sprintInfo } = request.body;

    const modifiedSprint = await modifySprint(sprintID, sprintInfo);

    response.send(modifiedSprint);
  })

  .delete(async (request, response) => {
    const sprintID = request.params.sprintID;

    await deleteSprint(sprintID);

    response.send();
  });

router
  .route('/names')

  .get(async (request, response) => {
    const sprintNames = await getSprintNames();

    response.send(sprintNames);
  });

export default router;
