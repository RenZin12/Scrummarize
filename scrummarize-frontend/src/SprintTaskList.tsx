import './SprintTaskList.css';
import TaskCard from './TaskCard';

function SprintTaskList() {
  return (
    <section className="main__section main__section--gray">
      <h3>Not Started</h3>

      <div className="main__section__list">
        <TaskCard
          task={{
            taskID: '1',
            name: 'Task 1',
            description: '',
            storyPoint: 100,
            priorityRating: 'Urgent',
            assignee: '',
            status: 'Not Started',
            stage: 'Planning',
            tags: ['Frontend', 'Backend'],
          }}
        />
      </div>
    </section>
  );
}

export default SprintTaskList;
