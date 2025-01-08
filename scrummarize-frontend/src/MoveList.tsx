import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Sprint, Task } from './lib/types';
import './MoveList.css';

type MoveListProps = {
  id: string;
  title?: string;
  sprints?: Sprint[];
  tasks: Task[];
};

function MoveList(props: MoveListProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <section className="main__section main__section--gray">
      {props.title && <h2 className="move-list__title">{props.title}</h2>}
      {props.sprints && (
        <select className="move-list__title">
          {props.sprints.map((sprint) => (
            <option key={sprint.sprintID}>{sprint.name}</option>
          ))}
        </select>
      )}

      <div className="main__section__list" ref={setNodeRef}>
        {props.tasks.map((task) => (
          <SmallTaskCard key={task.taskID} task={task} />
        ))}
        <div className="card move-list__invisible">
          <h3>Invisible</h3>
        </div>
      </div>
    </section>
  );
}

type SmallTaskCardProps = {
  task: Task;
};

function SmallTaskCard(props: SmallTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.task.taskID,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="card blue-container move-list__card"
      style={style}
    >
      <h3>{props.task.name}</h3>
    </div>
  );
}

export default MoveList;
