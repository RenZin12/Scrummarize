import { createFileRoute, useNavigate } from '@tanstack/react-router'
import SprintEditor from '../../SprintEditor'
import { formatLoaderSprint } from '../../lib/utils'
import { Sprint } from '../../lib/types'

export const Route = createFileRoute('/sprint-board/sprint/view/$sprintID')({
  component: ViewSprint,
  loader: ({ params }) => fetchSprint(params.sprintID)
})

const fetchSprint = async (sprintID: string) => {
  const res = await fetch(`http://localhost:3000/api/sprint-board/sprint/${sprintID}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch sprint #${sprintID}`)
  }
  const sprint: Sprint = await res.json()

  return formatLoaderSprint(sprint)
}

function ViewSprint() {
  const sprint = Route.useLoaderData()
  const { sprintID } = Route.useParams()

  const navigate = useNavigate({ from: `/sprint-board/sprint/view/$sprintID` })
  const navigateTo = () => navigate({ to: "/sprint-board" })

  const editSprint = async (formData: FormData) => {
    const data = {
      ...Object.fromEntries(formData)
    }

    const res = await fetch(`http://localhost:3000/api/sprint-board/sprint/${sprintID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      throw new Error(`Failed to edit sprint #${sprintID}`)
    }

    navigateTo()
  }

  const deleteSprint = async () => {
    const res = await fetch(`http://localhost:3000/api/sprint-board/sprint/${sprintID}`, {
      method: "DELETE"
    })
    if (!res.ok) {
      throw new Error(`Failed to delete sprint #${sprintID}`)
    }

    navigateTo()
  }

  return <SprintEditor sprint={sprint} action={editSprint} navigateTo={navigateTo} deleteSprint={deleteSprint} />
}
