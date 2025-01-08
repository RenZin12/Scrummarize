import { createFileRoute, Link } from '@tanstack/react-router';
import '../../SprintBacklog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import SprintTaskList from '../../SprintTaskList';

export const Route = createFileRoute('/sprint-backlog/')({
  component: SprintBacklog,
});

function SprintBacklog() {
  return (
    <section className="main__section sprint-backlog">
      <section className="sprint-backlog__section sprint-backlog__section--top">
        <h2 className="sprint-backlog__info__value">Sprint #1</h2>
        <button className="sprint-backlog__view-button">View</button>
      </section>

      <section className="sprint-backlog__section sprint-backlog__section--info ">
        <div className="sprint-backlog__dates">
          <p>
            <span className="sprint-backlog__info__label">Start:</span>
            <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
              2025-01-01
            </span>
          </p>
          <p>
            <span className="sprint-backlog__info__label">End:</span>
            <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
              2025-01-10
            </span>
          </p>
        </div>
        <p>
          <span className="sprint-backlog__info__label">Status:</span>
          <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
            Not Started
          </span>
        </p>
      </section>

      <section className="sprint-backlog__section sprint-backlog__section--link">
        <Link className="main__section__button">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
          <p>Move</p>
        </Link>
      </section>

      <section className="sprint-backlog__section sprint-backlog__section--tasks">
        <SprintTaskList />
        <SprintTaskList />
        <SprintTaskList />
      </section>
    </section>
  );
}
