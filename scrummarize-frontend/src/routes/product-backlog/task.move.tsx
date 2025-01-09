import { createFileRoute, useNavigate } from '@tanstack/react-router';
import MoveList from '../../MoveList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import '../../ProductBacklogMove.css';
import { Sprint, Task } from '../../lib/types';
import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

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

  const [pbTasks, setPBTasks] = useState(tasks);
  const [sbTasks, setSBTasks] = useState<Task[]>([]);

  const navigate = useNavigate({ from: '/product-backlog/task/move' });

  async function moveTasks(formData: FormData) {
    const sprintID = formData.get('sprint');
    const taskIDs = sbTasks.map((task) => task.taskID);

    const res = await fetch(
      'http://localhost:3000/api/product-backlog/task/move',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sprintID,
          taskIDs,
        }),
      }
    );
    if (!res.ok) throw new Error('Failed to move tasks');

    navigate({ to: `/sprint-backlog/${sprintID}` });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskID = active.id as string;
    const newList = over.id as string;

    if (newList == 'sprintBacklog') {
      const task = pbTasks.find((task) => task.taskID == taskID);

      if (task) {
        setPBTasks((prevPBTasks) =>
          prevPBTasks.filter((task) => task.taskID != taskID)
        );
        setSBTasks((prevSBTasks) => [...prevSBTasks, task]);
      }
    } else if (newList == 'productBacklog') {
      const task = sbTasks.find((task) => task.taskID == taskID);

      if (task) {
        setSBTasks((prevSBTasks) =>
          prevSBTasks.filter((task) => task.taskID != taskID)
        );
        setPBTasks((prevPBTasks) => [...prevPBTasks, task]);
      }
    }
  }

  return (
    <section>
      <form action={moveTasks} className="move-component">
        <DndContext onDragEnd={handleDragEnd}>
          <MoveList
            id={'productBacklog'}
            title={'Product Backlog'}
            tasks={pbTasks}
          />
          <FontAwesomeIcon
            icon={faArrowDown}
            className="move-component__arrow"
          />
          <MoveList id={'sprintBacklog'} sprints={sprints} tasks={sbTasks} />
        </DndContext>

        <div className="editor__buttons">
          <button className="editor__button editor__button--blue editor__button--standard">
            Save
          </button>
          <button
            className="editor__button editor__button--blue editor__button--standard"
            type="button"
            onClick={() => navigate({ to: '/product-backlog' })}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
