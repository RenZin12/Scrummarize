import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import AccumulationOfEffort from '../../../AccumulationOfEffort';
import { useAuth } from '../../../lib/context';

export const Route = createFileRoute(
  '/_auth/(sprint-backlog)/sprint-backlog_/$sprintID/task/$taskID'
)({
  component: SprintBacklogForm,
  loader: ({ params }) => fetchTask(params.sprintID, params.taskID),
});

async function fetchTask(sprintID: string, taskID: string) {
  const res = await fetch(
    `http://localhost:3000/api/sprint-backlog/${sprintID}/task/${taskID}`,
    {
      credentials: 'include',
    }
  );
  if (!res.ok)
    throw new Error(
      `Failed to fetch Task #${taskID} from Sprint Backlog #${sprintID}`
    );
  return res.json();
}

function SprintBacklogForm() {
  const task = Route.useLoaderData();
  const { sprintID, taskID } = Route.useParams();
  const auth = useAuth();

  const navigate = useNavigate({
    from: '/sprint-backlog/$sprintID/task/$taskID',
  });
  function navigateTo() {
    navigate({ to: `/sprint-backlog/$sprintID/kanban`, params: { sprintID } });
  }

  const priorityRatingOptions = ['Low', 'Medium', 'Important', 'Urgent'];
  const tagOptions = [
    'Frontend',
    'Backend',
    'API',
    'Database',
    'Framework',
    'Testing',
    'UI',
    'UX',
  ];
  const statusOptions = ['Not Started', 'In Progress', 'Completed'];
  const stageOptions = ['Development', 'Integration', 'Testing'];

  async function editTask(formData: FormData) {
    const data = {
      ...Object.fromEntries(formData),
      tags: formData.getAll('tags'),
      userID: auth.user?.userID,
    };

    const res = await fetch(
      `http://localhost:3000/api/sprint-backlog/${sprintID}/task/${taskID}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (!res.ok)
      throw new Error(
        `Failed to edit Task #${taskID} from Sprint #${sprintID}`
      );

    navigateTo();
  }

  async function deleteTask() {
    const res = await fetch(
      `http://localhost:3000/api/sprint-backlog/${sprintID}/task/${taskID}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (!res.ok)
      throw new Error(
        `Failed to delete Task #${taskID} from Sprint #${sprintID}`
      );

    navigateTo();
  }

  const [displayChart, setDisplayChart] = useState(false);

  return (
    <section className="main__section main__section--gray">
      <form action={editTask}>
        <div className="editor__row">
          <label className="editor__label" htmlFor="name">
            Name
          </label>
          <input
            className="editor__input blue-container editor__input--row"
            id="name"
            name="name"
            required
            minLength={1}
            defaultValue={task.name}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="editor__input blue-container task-editor__input--textarea editor__input--row"
            id="description"
            name="description"
            defaultValue={task.description}
          ></textarea>
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="storyPoint">
            Story Point
          </label>
          <input
            className="editor__input blue-container editor__input--column50"
            type="number"
            id="storyPoint"
            min="0"
            max="100"
            name="storyPoint"
            defaultValue={task.storyPoint}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="priorityRating">
            Priority Rating
          </label>
          <select
            className="editor__input blue-container editor__input--column50"
            id="priorityRating"
            name="priorityRating"
            defaultValue={task.priorityRating}
          >
            {priorityRatingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="editor__row">
          <label className="editor__label">Tags</label>
          <div className="editor__input blue-container">
            {tagOptions.map((option) => (
              <div className="task-editor__checkbox" key={option}>
                <input
                  type="checkbox"
                  className="task-editor__input--checkbox"
                  id={option}
                  name="tags"
                  value={option}
                  defaultChecked={task.tags.includes(option)}
                />
                <label
                  className="task-editor__label--checkbox"
                  htmlFor={option}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="assignee">
            Assignee
          </label>
          <select
            className="editor__input blue-container editor__input--column50"
            id="assignee"
            name="assignee"
          >
            <option value="">None</option>
          </select>
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="status">
            Task Status
          </label>
          <select
            className="editor__input blue-container editor__input--column50"
            id="status"
            name="status"
            defaultValue={task.status}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="stage">
            Task Stage
          </label>
          <select
            className="editor__input blue-container editor__input--column50"
            id="stage"
            name="stage"
            defaultValue={task.stage}
          >
            {stageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="logTimeSpent">
            Time Spent
          </label>
          <input
            className="editor__input blue-container editor__input--column25"
            type="number"
            id="timeSpent"
            name="timeSpent"
            min="0"
            defaultValue={0}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label">Total Log Time</label>
          <p className="editor__input blue-container editor__input--column25">
            {task.totalTimeSpent}
          </p>
        </div>

        <div className="editor__row text-center">
          <label className="editor__label">Accumulation of Effort</label>
          <button
            type="button"
            className="editor__button editor__button--green"
            onClick={() => setDisplayChart(true)}
          >
            View Graph
          </button>
        </div>

        <div className="editor__buttons">
          <button className="editor__button editor__button--blue editor__button--standard">
            Save
          </button>
          <button
            className="editor__button editor__button--blue editor__button--standard"
            type="button"
            onClick={navigateTo}
          >
            Cancel
          </button>
          <button
            className="editor__button editor__button--red editor__button--span2 editor__button--standard"
            type="button"
            onClick={deleteTask}
          >
            Delete
          </button>
        </div>
      </form>
      <AccumulationOfEffort
        displayChart={displayChart}
        setDisplayChart={setDisplayChart}
        dataset={task.accumulationOfEffortData}
      />
    </section>
  );
}
