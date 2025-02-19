import { createFileRoute, useNavigate } from '@tanstack/react-router';
import '../../../ProductBacklog.css';
import TaskCard from '../../../TaskCard.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowsUpDownLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@tanstack/react-router';
import { Task } from '../../../lib/types.ts';

export const Route = createFileRoute('/_auth/product-backlog/')({
  component: ProductBacklog,
  loader: fetchTasks,
});

async function fetchTasks() {
  const res = await fetch('http://localhost:3000/api/product-backlog/', {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tasks for Product Backlog');
  }
  return res.json();
}

function ProductBacklog() {
  const tasks: Task[] = Route.useLoaderData();

  const navigate = useNavigate({ from: '/product-backlog' });
  function viewTask(taskID: string) {
    navigate({
      to: '/product-backlog/task/edit/$taskID',
      params: { taskID },
    });
  }

  return (
    <section className="main__section main__section--gray">
      <h2>Product Backlog</h2>

      <div className="main__section__buttons product-backlog__buttons">
        <Link className="main__section__button" to="/product-backlog/task/new">
          <FontAwesomeIcon icon={faPlus} />
          <p>Add</p>
        </Link>
        <Link className="main__section__button" to="/product-backlog/task/move">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
          <p>Move</p>
        </Link>
      </div>

      <div className="main__section__list">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.taskID} viewTask={viewTask} />
        ))}
      </div>
    </section>
  );
}
