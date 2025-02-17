import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ChangeEvent, useState } from 'react';
import TotalHours from '../../../TotalHours';
import { TimeSpentData, TimeSpentDataset, User } from '../../../lib/types';
import { useAuth } from '../../../lib/context';
import '../../../team.css';
import { localeDateStringToDate } from '../../../lib/utils';

export const Route = createFileRoute('/_auth/team/admin')({
  component: Admin,
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

function Admin() {
  const usernames = Route.useLoaderData();
  const [timeSpentData, setTimeSpentData] = useState<TimeSpentData[] | null>(
    null
  );
  const auth = useAuth();
  const [dataset, setDataset] = useState<TimeSpentDataset[] | null>(null);

  const [date, setDate] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  async function getTimeSpent(formData: FormData) {
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;

    const params = new URLSearchParams({
      startDateISO: localeDateStringToDate(startDate).toISOString(),
      endDateISO: localeDateStringToDate(endDate).toISOString(),
      timeZoneOffset: String(new Date().getTimezoneOffset()),
    });

    const res = await fetch(
      `http://localhost:3000/api/admin/users/time-spent?${params.toString()}`,
      {
        credentials: 'include',
      }
    );
    if (!res.ok) {
      throw new Error('Failed to get time spent data');
    }
    const result = await res.json();

    setTimeSpentData(result);
  }

  function getAvgTimeSpent(timeSpentData: TimeSpentData[], userID: string) {
    const data = timeSpentData.find((data) => data.userID === userID);
    if (data) {
      return data.avgTimeSpent;
    }
  }

  function getDataset(timeSpentData: TimeSpentData[], userID: string) {
    const data = timeSpentData.find((data) => data.userID === userID);
    if (data) {
      return data.timeSpentDataset;
    }
    return null;
  }

  const router = useRouter();

  async function addUser(formData: FormData) {
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const res = await fetch('http://localhost:3000/api/admin/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to add user');
    }
    router.invalidate();
  }

  return (
    <section className="main__section main__section--gray">
      <h2>Welcome, Admin {auth.user?.username}!</h2>
      <form className="admin__form" action={getTimeSpent}>
        <div className="admin__form__field">
          <label className="admin__form__label" htmlFor="startDate">
            Start:
          </label>
          <input
            type="date"
            className="admin__form__input"
            value={date.startDate}
            onChange={handleChange}
            name="startDate"
            required
            max={date.endDate}
          />
        </div>

        <div className="admin__form__field">
          <label className="admin__form__label" htmlFor="endDate">
            End:
          </label>
          <input
            type="date"
            className="admin__form__input"
            value={date.endDate}
            onChange={handleChange}
            name="endDate"
            required
            min={date.startDate}
          />
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
          {usernames.map((username) => (
            <tr key={username.userID} className="table__row--blue">
              <td data-cell={'Username'} className="table__data">
                {username.username}
              </td>
              <td data-cell={'Avg Time Spent Per Day'} className="table__data">
                {timeSpentData &&
                  getAvgTimeSpent(timeSpentData, username.userID)}
              </td>
              <td data-cell={'Total Hours'} className="table__data">
                <button
                  className="table__button"
                  onClick={() =>
                    setDataset(
                      timeSpentData &&
                        getDataset(timeSpentData, username.userID)
                    )
                  }
                >
                  View Graph
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TotalHours dataset={dataset} setDataset={setDataset} />

      <form className="user__form" action={addUser}>
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
