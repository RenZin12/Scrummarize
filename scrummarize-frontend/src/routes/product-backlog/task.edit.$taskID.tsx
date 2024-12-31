import { createFileRoute } from '@tanstack/react-router'
import TaskEditor from '../../TaskEditor'

const fetchTask = async (taskID: string) => {
  const res = await fetch(`http://localhost:3000/api/product-backlog/task/${taskID}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch task #${taskID}`)
  }

  return res.json()
}

export const Route = createFileRoute('/product-backlog/task/edit/$taskID')({
  component: EditTask,
  loader: ({ params }) => {
    return fetchTask(params.taskID)
  }
})

function EditTask() {
  const task = Route.useLoaderData()

  return <TaskEditor task={task} />
}
