import { Router } from "express";
import { addSprint, getSprints } from "../database/sprintBoardDB.mjs";

const router = Router()

router
    .route("/")

    .get(async (request, response) => {
        const sprints = await getSprints()
     
        response.send(sprints)
    })

    .post(async (request, response) => {
        const { ...sprintInfo } = request.body

        const newSprint = await addSprint(sprintInfo)

        response.send(newSprint)
    })

export default router
