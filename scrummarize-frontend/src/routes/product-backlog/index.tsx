import { createFileRoute } from '@tanstack/react-router'
import ProductBacklog from '../../ProductBacklog'

const fetchTasks = async () => {
  const res = await fetch("http://localhost:3000/api/product-backlog/")

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()
}

export const Route = createFileRoute('/product-backlog/')({
  component: ProductBacklog,
  loader: () => fetchTasks()
})
