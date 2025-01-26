import { createFileRoute } from '@tanstack/react-router';
import { SBTask } from '../../lib/types';
import '../../SprintBacklogTable.css';

export const Route = createFileRoute(
  '/(sprint-backlog)/sprint-backlog/$sprintID/table'
)({
  component: SprintBacklogTable,
  loader: ({ params }) => fetchTasks(params.sprintID),
});

async function fetchTasks(sprintID: string) {
  const res = await fetch(
    `http://localhost:3000/api/sprint-backlog/${sprintID}/table`
  );
  if (!res.ok)
    throw new Error('Failed to fetch tasks from Sprint Backlog for table');
  return res.json();
}

function SprintBacklogTable() {
  const tasks: SBTask[] = Route.useLoaderData();

  const headerCells = [
    'Name',
    'Description',
    'Story Point',
    'Priority Rating',
    'Tags',
    'Status',
  ];
  const dataCells = [
    'name',
    'description',
    'storyPoint',
    'priorityRating',
    'tags',
    'status',
  ];

  return (
    <table className="table">
      <caption className="table__caption">Sprint Backlog Tasks Table</caption>

      <thead>
        <tr className="table__row">
          {headerCells.map((headerCell) => (
            <th key={headerCell} className="table__header">
              {headerCell}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.taskID}>
            {dataCells.map((dataCell, i) => (
              <td
                data-cell={headerCells[i]}
                key={dataCell}
                className="table__data"
              >
                {task[dataCell]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
