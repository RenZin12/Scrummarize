import './TaskCard.css';
import { Task } from './lib/types';

type TaskCardProps = {
  task: Task;
  viewTask: (taskID: string) => void;
};

function TaskCard(props: TaskCardProps) {
  const getPriorityRatingClass = (priorityRating: string) => {
    const defaultClass = 'task-card__priority-rating';

    let priorityRatingClass = '';
    switch (priorityRating) {
      case 'Low':
        priorityRatingClass = defaultClass + '--low';
        break;
      case 'Medium':
        priorityRatingClass = defaultClass + '--medium';
        break;
      case 'Important':
        priorityRatingClass = defaultClass + '--important';
        break;
      case 'Urgent':
        priorityRatingClass = defaultClass + '--urgent';
        break;
      default:
        priorityRatingClass = '';
    }

    return defaultClass + ' ' + priorityRatingClass;
  };

  const getTagClass = (tag: string) => {
    const defaultClass = 'task-card__tag';

    let tagClass = '';
    switch (tag) {
      case 'Frontend':
        tagClass = defaultClass + '--frontend';
        break;
      case 'Backend':
        tagClass = defaultClass + '--backend';
        break;
      case 'API':
        tagClass = defaultClass + '--api';
        break;
      case 'Database':
        tagClass = defaultClass + '--database';
        break;
      case 'Framework':
        tagClass = defaultClass + '--framework';
        break;
      case 'Testing':
        tagClass = defaultClass + '--testing';
        break;
      case 'UI':
        tagClass = defaultClass + '--ui';
        break;
      case 'UX':
        tagClass = defaultClass + '--ux';
        break;
      default:
        tagClass = '';
    }

    return defaultClass + ' ' + tagClass;
  };

  return (
    <article
      className="card blue-container"
      onClick={() => props.viewTask(props.task.taskID)}
    >
      <h3>{props.task.name}</h3>
      <div className="card__row task-card__row--info">
        <p className="task-card__story-point">{props.task.storyPoint}</p>
        <p className={getPriorityRatingClass(props.task.priorityRating)}>
          {props.task.priorityRating}
        </p>
      </div>
      <div className="card__row task-card__row--tags">
        {props.task.tags.map((tag) => (
          <p className={getTagClass(tag)} key={tag}>
            {tag}
          </p>
        ))}
      </div>
    </article>
  );
}

export default TaskCard;
