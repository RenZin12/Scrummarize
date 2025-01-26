import { createFileRoute, useNavigate } from '@tanstack/react-router';
import SprintEditor from '../../SprintEditor';
import { localeDateStringToDate } from '../../lib/utils';

export const Route = createFileRoute('/sprint-board/sprint/new')({
  component: NewSprint,
});

function NewSprint() {
  const navigate = useNavigate({ from: '/sprint-board/sprint/new' });
  const navigateTo = () => {
    navigate({ to: '/sprint-board' });
  };

  const formatDateToISO = (dateString: string) => {
    const date = localeDateStringToDate(dateString);
    return date.toISOString();
  };

  const addSprint = async (formData: FormData) => {
    const data = {
      ...Object.fromEntries(formData),
      startDate: formatDateToISO(formData.get('startDate') as string),
      endDate: formatDateToISO(formData.get('endDate') as string),
    };

    const res = await fetch('http://localhost:3000/api/sprint-board', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to add task');
    }

    navigateTo();
  };

  return <SprintEditor action={addSprint} navigateTo={navigateTo} />;
}
