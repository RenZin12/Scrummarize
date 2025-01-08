import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '../Header';
import '../App.css';

export const Route = createRootRoute({
  component: App,
});

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
}
