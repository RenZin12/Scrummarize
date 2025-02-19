import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../App.css';
import { AuthContextType } from '../lib/context';

type MyRouterContext = {
  auth: AuthContextType;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated, user } = await context.auth.getAuthStatus();
    return {
      auth: {
        ...context.auth,
        isAuthenticated,
        user,
      },
    };
  },
  component: Root,
});

function Root() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
