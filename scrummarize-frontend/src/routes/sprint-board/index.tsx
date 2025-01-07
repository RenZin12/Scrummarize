import { createFileRoute, Link } from '@tanstack/react-router'
import '../../SprintBoard.css'
import SprintCard from '../../SprintCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Sprint } from '../../lib/types'
import { formatLoaderSprint } from '../../lib/utils'

export const Route = createFileRoute('/sprint-board/')({
  component: SprintBoard,
  loader: () => fetchSprints()
})

const fetchSprints = async () => {
  const res = await fetch("http://localhost:3000/api/sprint-board/")
  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }
  const sprints: Sprint[] = await res.json()

  return sprints.map(formatLoaderSprint)
}

function SprintBoard() {
  const sprints: Sprint[] = Route.useLoaderData()

  return (
    <section className="main__section main__section--gray">
      <h2>Sprint Board</h2>

      <div className="main__section__buttons sprint-board__buttons">
        <Link className="main__section__button" to="/sprint-board/sprint/new">
          <FontAwesomeIcon icon={faPlus} />
          <p>Add</p>
        </Link>
      </div>

      <div className="main__section__list">
        {sprints.map((sprint) => (
          <SprintCard key={sprint.sprintID} sprint={sprint} />
        ))}
      </div>
    </section>
  )
}
