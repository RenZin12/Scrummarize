import { createFileRoute } from '@tanstack/react-router'
import SprintEditor from '../../SprintEditor'

export const Route = createFileRoute('/sprint-board/sprint/new')({
  component: NewSprint,
})

function NewSprint() {
  return <SprintEditor />
}
