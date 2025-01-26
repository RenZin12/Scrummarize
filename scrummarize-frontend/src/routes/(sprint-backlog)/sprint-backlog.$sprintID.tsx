import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import '../../SprintBacklog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { formatLoaderSprint } from '../../lib/utils';

export const Route = createFileRoute(
  '/(sprint-backlog)/sprint-backlog/$sprintID'
)({
  component: SprintBacklog,
  loader: ({ params }) => fetchSprint(params.sprintID),
});

async function fetchSprint(sprintID: string) {
  const res = await fetch(
    `http://localhost:3000/api/sprint-backlog/${sprintID}`
  );
  if (!res.ok)
    throw new Error(`Failed to fetch Sprint#${sprintID} from Sprint Backlog'`);
  const sprint = await res.json();
  return formatLoaderSprint(sprint);
}

function SprintBacklog() {
  const sprint = Route.useLoaderData();
  const { sprintID } = Route.useParams();

  return (
    <section className="main__section sprint-backlog">
      <section className="sprint-backlog__section sprint-backlog__section--top">
        <h2 className="sprint-backlog__info__value">{sprint.name}</h2>
        {/* <button className="sprint-backlog__view-button">View</button> */}
        <Link
          to="/sprint-backlog/$sprintID/table"
          params={{ sprintID }}
          className="sprint-backlog__view-button"
        >
          View
        </Link>
      </section>

      <section className="sprint-backlog__section sprint-backlog__section--info ">
        <div className="sprint-backlog__dates">
          <p>
            <span className="sprint-backlog__info__label">Start:</span>
            <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
              {sprint.startDate}
            </span>
          </p>
          <p>
            <span className="sprint-backlog__info__label">End:</span>
            <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
              {sprint.endDate}
            </span>
          </p>
        </div>
        <p>
          <span className="sprint-backlog__info__label">Status:</span>
          <span className="sprint-backlog__info__value sprint-backlog__info__value--margin-left">
            {sprint.status}
          </span>
        </p>
      </section>

      <section className="sprint-backlog__section sprint-backlog__section--link">
        <Link className="main__section__button">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
          <p>Move</p>
        </Link>
      </section>

      <Outlet />
    </section>
  );
}
