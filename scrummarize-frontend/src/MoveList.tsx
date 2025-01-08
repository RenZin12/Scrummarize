import { Sprint, Task } from './lib/types';
import './MoveList.css';

type MoveListProps = {
  title?: string;
  sprints?: Sprint[];
  tasks: Task[];
};

function MoveList(props: MoveListProps) {
  return (
    <section className="main__section main__section--gray">
      {props.title && <h2 className="move-list__title">{props.title}</h2>}
      {props.sprints && (
        <select className="move-list__title">
          {props.sprints.map((sprint) => (
            <option key={sprint.sprintID}>{sprint.name}</option>
          ))}
        </select>
      )}

      <div className="main__section__list">
        {props.tasks.map((task) => (
          <SmallTaskCard key={task.taskID} task={task} />
        ))}
      </div>
    </section>
  );
}

type SmallTaskCardProps = {
  task: Task;
};

function SmallTaskCard(props: SmallTaskCardProps) {
  return (
    <div className="card blue-container">
      <h3>{props.task.name}</h3>
    </div>
  );
}

export default MoveList;
