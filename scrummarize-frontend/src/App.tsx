import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AuthProvider } from './auth';
import { routeTree } from './routeTree.gen';
import { useAuth } from './lib/context';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
