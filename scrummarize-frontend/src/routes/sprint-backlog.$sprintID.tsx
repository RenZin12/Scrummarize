import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import '../SprintBacklog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import SprintTaskList from '../SprintTaskList';
import { useEffect, useState } from 'react';
import { SBTask } from '../lib/types';
import { formatLoaderSprint } from '../lib/utils';

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
  const { sprintID } = Route.useParams();

  const [notStarted, setNotStarted] = useState<SBTask[]>(data.notStarted);
  const [inProgress, setInProgress] = useState<SBTask[]>(data.inProgress);
  const [completed, setCompleted] = useState<SBTask[]>(data.completed);

  const navigate = useNavigate({ from: '/sprint-backlog/$sprintID' });
  function viewTask(taskID: string) {
    navigate({
      to: '/sprint-backlog/$sprintID/task/$taskID',
      params: { sprintID, taskID },
    });
  }

  useEffect(() => {
    setNotStarted(data.notStarted);
    setInProgress(data.inProgress);
    setCompleted(data.completed);
  }, [data]);

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
        <SprintTaskList
          title={'Not Started'}
          tasks={notStarted}
          viewTask={viewTask}
        />
        <SprintTaskList
          title={'In Progress'}
          tasks={inProgress}
          viewTask={viewTask}
        />
        <SprintTaskList
          title={'Completed'}
          tasks={completed}
          viewTask={viewTask}
        />
      </section>
    </section>
  );
}
