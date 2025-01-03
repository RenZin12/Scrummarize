import { Router } from "express"
import { getPBTasks, addPBTask, addPBTaskTags, getPBTaskTags, getPBTask, modifyPBTask, deletePBTaskTag, deletePBTask } from "../database/productBacklogDB.mjs"

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

router
    .route("/task/:taskID")

    .get(async (request, response) => {
        const taskID = request.params.taskID

        const task = await getPBTask(taskID)
        const tags = await getPBTaskTags(taskID)

        response.send({
            ...task,
            tags
        })
    })

    .put(async (request, response) => {
        const taskID = request.params.taskID
        const { tags, ...taskInfo } = request.body

        const modifiedTask = await modifyPBTask(taskID, taskInfo)
        await deletePBTaskTag(taskID)
        const newTags = await addPBTaskTags(taskID, tags)

        response.send({
            ...modifiedTask,
            tags: newTags
        })
    })

    .delete(async (request, response) => {
        const taskID = request.params.taskID

        await deletePBTask(taskID)

        response.send()
    })

export default router
