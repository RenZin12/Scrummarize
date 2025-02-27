import { DBProductBacklogTask, ProductBacklogTask } from '../lib/types';

export function formatProductBacklogTasksFromDB(
  task: DBProductBacklogTask
): ProductBacklogTask {
  const { id, name, priority_rating, story_points, tags } = task;

  return {
    id,
    name,
    priorityRating: priority_rating,
    storyPoints: story_points,
    tags,
  };
}
