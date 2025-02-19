import { createFileRoute, useNavigate } from '@tanstack/react-router';
import TaskEditor from '../../../TaskEditor';

export const Route = createFileRoute(
  '/_auth/product-backlog/task/edit/$taskID'
)({
  component: EditTask,
  loader: ({ params }) => {
    return fetchTask(params.taskID);
  },
});

const fetchTask = async (taskID: string) => {
  const res = await fetch(
    `http://localhost:3000/api/product-backlog/task/${taskID}`,
    {
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch task #${taskID}`);
  }

  return res.json();
};

function EditTask() {
  const task = Route.useLoaderData();
  const { taskID } = Route.useParams();

  const navigate = useNavigate({ from: '/product-backlog/task/edit/$taskID' });
  const navigateTo = () => {
    navigate({ to: '/product-backlog' });
  };

  const editTask = async (formData: FormData) => {
    const data = {
      ...Object.fromEntries(formData),
      tags: formData.getAll('tags'),
    };

    const res = await fetch(
      `http://localhost:3000/api/product-backlog/task/${taskID}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to edit task #${taskID}`);
    }

    navigateTo();
  };

  const deleteTask = async () => {
    const res = await fetch(
      `http://localhost:3000/api/product-backlog/task/${taskID}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to delete task #${taskID}`);
    }

    navigateTo();
  };

  return (
    <TaskEditor
      task={task}
      action={editTask}
      navigateTo={navigateTo}
      deleteTask={deleteTask}
    />
  );
}
