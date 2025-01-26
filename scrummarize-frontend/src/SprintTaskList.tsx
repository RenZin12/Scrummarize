import { Task } from './lib/types';
import TaskCard from './TaskCard';

type SprintTaskListProps = {
  title: string;
  tasks: Task[];
  viewTask: (taskID: string) => void;
};

function SprintTaskList(props: SprintTaskListProps) {
  return (
    <section className="main__section main__section--gray">
      <h3>{props.title}</h3>

      <div className="main__section__list">
        {props.tasks.map((task) => (
          <TaskCard
            key={task.taskID}
            task={task}
            viewTask={() => props.viewTask(task.taskID)}
          />
        ))}
      </div>
    </section>
  );
}

export default SprintTaskList;
