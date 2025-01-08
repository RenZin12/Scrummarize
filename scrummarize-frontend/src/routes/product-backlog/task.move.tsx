import { createFileRoute } from '@tanstack/react-router';
import MoveList from '../../MoveList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import '../../ProductBacklogMove.css';
import { Sprint, Task } from '../../lib/types';

export const Route = createFileRoute('/product-backlog/task/move')({
  component: ProductBacklogMove,
  loader: () => fetchData(),
});

const fetchData = async () => {
  const res1 = await fetch('http://localhost:3000/api/product-backlog');
  if (!res1.ok) {
    throw new Error('Failed to fetch tasks for moving');
  }
  const tasks: Task[] = await res1.json();

  const res2 = await fetch('http://localhost:3000/api/sprint-board');
  if (!res2.ok) {
    throw new Error('Failed to fetch sprints for moving');
  }
  const sprints: Sprint[] = await res2.json();

  return { tasks, sprints };
};

function ProductBacklogMove() {
  const { tasks, sprints } = Route.useLoaderData();

  return (
    <section className="move-component">
      <MoveList title={'Product Backlog'} tasks={tasks} />
      <FontAwesomeIcon icon={faArrowDown} className="move-component__arrow" />
      <MoveList sprints={sprints} tasks={[]} />
    </section>
  );
}
