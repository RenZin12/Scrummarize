import { createLazyFileRoute } from '@tanstack/react-router'
import TaskEditor from '../../TaskEditor'

export const Route = createLazyFileRoute('/product-backlog/task-editor')({
  component: TaskEditor,
})
