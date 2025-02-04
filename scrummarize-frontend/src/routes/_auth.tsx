import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import Header from '../Header';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: fetchSprintNames,
  component: AuthLayout,
});

async function fetchSprintNames() {
  const res = await fetch('http://localhost:3000/api/sprint-board/names', {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch sprint names for Header');
  }
  return res.json();
}

function AuthLayout() {
  const sprintNames = Route.useLoaderData();

  return (
    <>
      <Header sprints={sprintNames} />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
