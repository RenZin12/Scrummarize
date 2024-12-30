import { createFileRoute } from '@tanstack/react-router'
import TaskEditor from '../../TaskEditor'

export const Route = createFileRoute('/product-backlog/task-editor')({
  component: TaskEditor,
})
