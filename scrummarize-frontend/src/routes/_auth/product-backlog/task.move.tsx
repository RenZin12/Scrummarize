import { createFileRoute, useNavigate } from '@tanstack/react-router';
import MoveList from '../../../MoveList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import '../../../ProductBacklogMove.css';
import { TaskName, SprintName } from '../../../lib/types';
import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

export const Route = createFileRoute('/_auth/product-backlog/task/move')({
  component: ProductBacklogMove,
  loader: fetchData,
});

async function fetchData() {
  const res = await fetch('http://localhost:3000/api/product-backlog/move');
  if (!res.ok)
    throw new Error('Failed to fetch task names and sprint names for moving');
  return res.json();
}

function ProductBacklogMove() {
  const loaderData: { taskNames: TaskName[]; sprintNames: SprintName[] } =
    Route.useLoaderData();

  const [pbTasks, setPBTasks] = useState(loaderData.taskNames);
  const [sbTasks, setSBTasks] = useState<TaskName[]>([]);

  useEffect(() => {
    setPBTasks(loaderData.taskNames);
  }, [loaderData]);

  const navigate = useNavigate({ from: '/product-backlog/task/move' });

  async function moveTasks(formData: FormData) {
    const sprintID = formData.get('sprint');
    const taskIDs = sbTasks.map((task) => task.taskID);

    const res = await fetch('http://localhost:3000/api/product-backlog/move', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sprintID,
        taskIDs,
      }),
    });
    if (!res.ok) throw new Error('Failed to move tasks');

    navigate({ to: `/sprint-backlog/${sprintID}/kanban` });
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
          <MoveList
            id={'sprintBacklog'}
            sprints={loaderData.sprintNames}
            tasks={sbTasks}
          />
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
