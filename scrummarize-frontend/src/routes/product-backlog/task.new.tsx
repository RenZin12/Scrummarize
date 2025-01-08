import { createFileRoute, useNavigate } from '@tanstack/react-router';
import TaskEditor from '../../TaskEditor';

export const Route = createFileRoute('/product-backlog/task/new')({
  component: NewTask,
});

function NewTask() {
  const navigate = useNavigate({ from: '/product-backlog/task/new' });
  const navigateTo = () => {
    navigate({ to: '/product-backlog' });
  };

  const addTask = async (formData: FormData) => {
    const data = {
      ...Object.fromEntries(formData),
      tags: formData.getAll('tags'),
    };

    const res = await fetch('http://localhost:3000/api/product-backlog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to add task');
    }

    navigateTo();
  };

  return <TaskEditor action={addTask} navigateTo={navigateTo} />;
}
