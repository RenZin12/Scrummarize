import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import TotalHours from '../../../TotalHours';
import { TotalHoursData } from '../../../lib/types';
import { useAuth } from '../../../lib/context';
import '../../../team.css';

export const Route = createFileRoute('/_auth/team/admin')({
  component: Admin,
});

function Admin() {
  const [dataset, setDataset] = useState<TotalHoursData[] | null>(null);
  const auth = useAuth();

  const mockMembers = [
    { userID: '1', username: 'Mr Bob' },
    { userID: '2', username: 'Mr Cat' },
    { userID: '3', username: 'Mr gat' },
  ];

  const mockData = [
    {
      userID: '1',
      avgTimeSpent: 1,
      totalHoursDataSet: [
        { day: '1', hoursSpent: 2 },
        { day: '2', hoursSpent: 5 },
        { day: '3', hoursSpent: 1 },
      ],
    },
    {
      userID: '2',
      avgTimeSpent: 2,
      totalHoursDataSet: [
        { day: '1', hoursSpent: 1 },
        { day: '2', hoursSpent: 2 },
        { day: '3', hoursSpent: 3 },
      ],
    },
    {
      userID: '3',
      avgTimeSpent: 3,
      totalHoursDataSet: [
        { day: '1', hoursSpent: 3 },
        { day: '2', hoursSpent: 2 },
        { day: '3', hoursSpent: 1 },
      ],
    },
  ];

  return (
    <section className="main__section main__section--gray">
      <h2>Welcome, Admin {auth.user?.username}!</h2>
      <form className="admin__form">
        <div className="admin__form__field">
          <label className="admin__form__label">Start:</label>
          <input type="date" className="admin__form__input" />
        </div>

        <div className="admin__form__field">
          <label className="admin__form__label">End:</label>
          <input type="date" className="admin__form__input" />
        </div>

        <button className="admin__form__button">Save</button>
      </form>
      <table className="table table--blue">
        <caption className="table__caption">Admin Table</caption>

        <thead>
          <tr>
            <th className="table__header">Username</th>
            <th className="table__header">Avg Time Spent Per Day</th>
            <th className="table__header">Total Hours</th>
          </tr>
        </thead>

        <tbody>
          {mockMembers.map((member, i) => (
            <tr key={member.userID} className="table__row--blue">
              <td data-cell={'Username'} className="table__data">
                {member.username}
              </td>
              <td data-cell={'Avg Time Spent Per Day'} className="table__data">
                {mockData[i].avgTimeSpent}
              </td>
              <td data-cell={'Total Hours'} className="table__data">
                <button
                  className="table__button"
                  onClick={() => setDataset(mockData[i].totalHoursDataSet)}
                >
                  View Graph
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TotalHours dataset={dataset} setDataset={setDataset} />

      <form className="user__form">
        <div className="user__field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" className="user__input" />
        </div>
        <div className="user__field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="user__input"
          />
        </div>
        <button className="user__button">Add new user</button>
      </form>
    </section>
  );
}
