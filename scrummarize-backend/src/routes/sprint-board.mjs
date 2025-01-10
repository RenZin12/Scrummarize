import { Router } from 'express';
import {
  addSprint,
  deleteSprint,
  getSprint,
  getSprintNames,
  getSprints,
  modifySprint,
} from '../database/sprintBoardDB.mjs';

const router = Router();

router
  .route('/')

  .get(async (request, response) => {
    const sprints = await getSprints();

    response.send(sprints);
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
