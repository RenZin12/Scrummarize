import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../../lib/context';

export const Route = createFileRoute('/_auth/team/member')({
  component: Member,
});

function Member() {
  const auth = useAuth();

  const mockMembers = [
    { userID: '1', username: 'Mr Bob' },
    { userID: '2', username: 'Mr Cat' },
    { userID: '3', username: 'Mr gat' },
    { userID: '4', username: 'admin' },
  ];

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
          {mockMembers.map((member) => (
            <tr key={member.userID} className="table__row--blue">
              <td data-cell={'Username'} className="table__data">
                {member.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
