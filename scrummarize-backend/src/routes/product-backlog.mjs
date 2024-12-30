import { Router } from "express"
import { getPBTasks, addPBTask, addPBTaskTags, getPBTaskTags } from "../database/productBacklogDB.mjs"

const router = Router()

router
    .route("/")

    .get(async (request, response) => {
        const tasks = await getPBTasks()

        const promiseTasks = tasks.map(async task => {
            const tags = await getPBTaskTags(task.taskID)

            return {
                ...task,
                tags
            }
        })

        const retrievedTasks = await Promise.all(promiseTasks)

        response.send(retrievedTasks)
    })
    
    .post(async (request, response) => {
        const { tags, ...taskInfo } = request.body
        
        const newTask = await addPBTask(taskInfo)
        const addedTags = await addPBTaskTags(newTask.taskID, tags)

        response.send({
            ...newTask,
            tags: addedTags
        })
    })

export default router
