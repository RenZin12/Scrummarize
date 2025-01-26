import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '../Header';
import '../App.css';

export const Route = createRootRoute({
  component: App,
  loader: fetchSprintNames,
});

async function fetchSprintNames() {
  const res = await fetch('http://localhost:3000/api/sprint-board/names');
  if (!res.ok) throw new Error('Failed to fetch sprint names');
  return res.json();
}

function App() {
  const sprintNames = Route.useLoaderData();

  return (
    <>
      <Header sprints={sprintNames} />
      <main className="main">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
}
