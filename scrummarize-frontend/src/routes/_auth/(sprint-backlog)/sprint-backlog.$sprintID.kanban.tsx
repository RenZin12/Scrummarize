import { createFileRoute, useNavigate } from '@tanstack/react-router';
import SprintTaskList from '../../../SprintTaskList';

export const Route = createFileRoute(
  '/_auth/(sprint-backlog)/sprint-backlog/$sprintID/kanban'
)({
  component: Kanban,
  loader: ({ params }) => fetchTasks(params.sprintID),
});

async function fetchTasks(sprintID: string) {
  const res = await fetch(
    `http://localhost:3000/api/sprint-backlog/${sprintID}/kanban`
  );
  if (!res.ok)
    throw new Error(`Failed to fetch tasks from Sprint Backlog for kanban`);
  return res.json();
}

function Kanban() {
  const tasks = Route.useLoaderData();
  const { sprintID } = Route.useParams();

  const navigate = useNavigate({ from: '/sprint-backlog/$sprintID/kanban' });
  function viewTask(taskID: string) {
    navigate({
      to: '/sprint-backlog/$sprintID/task/$taskID',
      params: { sprintID, taskID },
    });
  }

  return (
    <section className="sprint-backlog__section sprint-backlog__section--tasks">
      <SprintTaskList
        title={'Not Started'}
        tasks={tasks.notStarted}
        viewTask={viewTask}
      />
      <SprintTaskList
        title={'In Progress'}
        tasks={tasks.inProgress}
        viewTask={viewTask}
      />
      <SprintTaskList
        title={'Completed'}
        tasks={tasks.completed}
        viewTask={viewTask}
      />
    </section>
  );
}
