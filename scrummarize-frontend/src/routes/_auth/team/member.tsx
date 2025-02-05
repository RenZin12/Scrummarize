import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/team/member')({
  component: Member,
});

const mockMembers = [
  { userID: '1', username: 'Mr Bob' },
  { userID: '2', username: 'Mr Cat' },
  { userID: '3', username: 'Mr gat' },
  { userID: '4', username: 'admin' },
];

function Member() {
  return (
    <section className="main__section main__section--gray">
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
