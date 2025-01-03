import { createFileRoute } from '@tanstack/react-router'
import '../..//ProductBacklog.css'
import TaskCard from '../../TaskCard.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowsUpDownLeftRight} from '@fortawesome/free-solid-svg-icons'
import { Link } from '@tanstack/react-router'
import { Task } from '../../lib/types.ts'

export const Route = createFileRoute('/product-backlog/')({
  component: ProductBacklog,
  loader: () => fetchTasks()
})

const fetchTasks = async () => {
  const res = await fetch("http://localhost:3000/api/product-backlog/")

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()
}

function ProductBacklog() {
  const tasks: Task[] = Route.useLoaderData()

  return (
      <section className="main__section">
          <h2>Product Backlog</h2>

          <div className="main__section__list">
              {
                  tasks.map(task => <TaskCard task={task} key={task.taskID} />)
              }
          </div>

          <div className="main__section__buttons product-backlog__buttons">
              <Link className="main__section__button" to="/product-backlog/task/new">
                  <FontAwesomeIcon icon={faPlus} />
                  <p>Add</p>
              </Link>
              <Link className="main__section__button">
                  <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
                  <p>Move</p>
              </Link>
          </div>
      </section>
  )
}
