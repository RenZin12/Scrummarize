import { SBTask } from './lib/types';
import './SprintBacklogTable.css';

type SprintBacklogTableProps = {
  tasks: SBTask[];
};

const headerCells = [
  'name',
  'description',
  'story point',
  'priority rating',
  'tags',
  'status',
];
const dataCells = [
  'name',
  'description',
  'storyPoint',
  'priorityRating',
  'tags',
  'status',
];

function SprintBacklogTable(props: SprintBacklogTableProps) {
  return (
    <table>
      <caption>Sprint Backlog Tasks Table</caption>
      <tr>
        {headerCells.map((headerCell) => (
          <th key={headerCell}>{headerCell}</th>
        ))}
      </tr>
      {props.tasks.map((task, i) => (
        <tr>
          {dataCells.map((dataCell) => (
            <td data-cell={headerCells[i]} key={dataCell}>
              {task[dataCell]}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default SprintBacklogTable;
