import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/sprint-backlog_/$sprintID/task/$taskID')(
  {
    component: SprintBacklogForm,
    loader: ({ params }) => fetchTask(params.sprintID, params.taskID),
  }
);

async function fetchTask(sprintID: string, taskID: string) {
  const res = await fetch(
    `http://localhost:3000/api/sprint-backlog/${sprintID}/task/${taskID}`
  );
  if (!res.ok)
    throw new Error(
      `Failed to fetch Task #${taskID} from Sprint Backlog #${sprintID}`
    );
  return res.json();
}

function SprintBacklogForm() {
  const task = Route.useLoaderData();
  const { sprintID } = Route.useParams();

  const navigate = useNavigate({
    from: '/sprint-backlog/$sprintID/task/$taskID',
  });
  function navigateTo() {
    navigate({ to: `/sprint-backlog/$sprintID`, params: { sprintID } });
  }

  const priorityRatingOptions = ['Low', 'Mediumn', 'Important', 'Urgent'];
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

  async function editTask() {
    navigateTo();
  }

  async function deleteTask() {
    return;
  }

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
            Log Time Spent
          </label>
          <input
            className="editor__input blue-container editor__input--column25"
            type="number"
            id="logTimeSpent"
            name="logTimeSpent"
            min="0"
            defaultValue={0}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label">Total Log Time</label>
          <p className="editor__input blue-container editor__input--column25">
            {task.totalLogTime}
          </p>
        </div>

        <div className="editor__row text-center">
          <label className="editor__label">Accumulation of Effort</label>
          <button
            type="button"
            className="editor__button editor__button--green"
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
    </section>
  );
}
