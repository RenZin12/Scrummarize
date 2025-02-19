import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../../lib/context';
import { User } from '../../../lib/types';

export const Route = createFileRoute('/_auth/team/member')({
  component: Member,
  loader: fetchUsernames,
});

async function fetchUsernames(): Promise<User[]> {
  const res = await fetch('http://localhost:3000/api/users', {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

function Member() {
  const auth = useAuth();
  const usernames = Route.useLoaderData();

  return (
    <section className="main__section main__section--gray">
      <h2>Welcome, {auth.user?.username}!</h2>
      <table className="table table--blue">
        <caption className="table__caption">Member Table</caption>

        <thead>
          <tr>
            <th className="table__header">Username</th>
          </tr>
        </thead>

        <tbody>
          {usernames.map((username) => (
            <tr key={username.userID} className="table__row--blue">
              <td data-cell={'Username'} className="table__data">
                {username.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
