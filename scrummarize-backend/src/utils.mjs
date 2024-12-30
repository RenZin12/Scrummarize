export function formatTask(task) {
    const { task_id, name, description, story_point, priority_rating, assignee, status, stage} = task

    return {
        taskID: task_id,
        name,
        description,
        storyPoint: story_point,
        priorityRating: priority_rating,
        assignee,
        status,
        stage
    }
}
