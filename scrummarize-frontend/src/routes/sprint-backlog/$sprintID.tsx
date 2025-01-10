import { createFileRoute, Link } from '@tanstack/react-router';
import '../../SprintBacklog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import SprintTaskList from '../../SprintTaskList';
import { useState } from 'react';
import { SBTask } from '../../lib/types';
import { formatLoaderSprint } from '../../lib/utils';

export const Route = createFileRoute('/sprint-backlog/$sprintID')({
  component: SprintBacklog,
  loader: ({ params }) => fetchTasks(params.sprintID),
});

async function fetchTasks(sprintID: string) {
  const res = await fetch(
    `http://localhost:3000/api/sprint-backlog/${sprintID}`
  );
  if (!res.ok) throw new Error('Failed to fetch tasks from Sprint Backlog');
  const data = await res.json();

  return {
    ...data,
    sprint: formatLoaderSprint(data.sprint),
  };
}

function SprintBacklog() {
  const data = Route.useLoaderData();

  const [notStarted] = useState<SBTask[]>(data.notStarted);
  const [inProgress] = useState<SBTask[]>(data.inProgress);
  const [completed] = useState<SBTask[]>(data.completed);

  return (
    <section className="main__section sprint-backlog">
      <section className="sprint-backlog__section sprint-backlog__section--top">
        <h2 className="sprint-backlog__info__value">{data.sprint.name}</h2>
        <button className="sprint-backlog__view-button">View</button>
      </section>

      <section className="sprint-backlog__section sprint-backlog__section--info ">
        <div className="sprint-backlog__dates">
          <p>
            <span className="sprint-backlog__info__label">Start:</span>
            <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
              {data.sprint.startDate}
            </span>
          </p>
          <p>
            <span className="sprint-backlog__info__label">End:</span>
            <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
              {data.sprint.endDate}
            </span>
          </p>
        </div>
        <p>
          <span className="sprint-backlog__info__label">Status:</span>
          <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
            {data.sprint.status}
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
        <SprintTaskList title={'Not Started'} tasks={notStarted} />
        <SprintTaskList title={'In Progress'} tasks={inProgress} />
        <SprintTaskList title={'Completed'} tasks={completed} />
      </section>
    </section>
  );
}
