import { useNavigate } from '@tanstack/react-router';
import { Sprint } from './lib/types';
import './SprintCard.css';

type SprintCardProps = {
  sprint: Sprint;
};

function SprintCard(props: SprintCardProps) {
  const navigate = useNavigate({ from: '/sprint-board' });

  const viewSprint = () => {
    navigate({
      to: '/sprint-board/sprint/view/$sprintID',
      params: { sprintID: props.sprint.sprintID },
    });
  };

  return (
    <article className="card blue-container" onClick={viewSprint}>
      <h3>{props.sprint.name}</h3>

      <div className="sprint-card__info">
        <div className="card__row sprint-card__row--dates">
          <p className="sprint-card__date">{props.sprint.startDate}</p>
          <p>-</p>
          <p className="sprint-card__date">{props.sprint.endDate}</p>
        </div>

        <div className="card__row">
          <p className="sprint-card__status">{props.sprint.status}</p>
        </div>

        <div className="card__row sprint-card__row--story-point">
          <p>Completed: </p>
          <p className="sprint-card__story-point">
            {props.sprint.completedStoryPoints} /{' '}
            {props.sprint.totalStoryPoints}
          </p>
        </div>

        <div className="card__row">
          <button className="sprint-card__button">View Burndown</button>
        </div>
      </div>
    </article>
  );
}

export default SprintCard;
