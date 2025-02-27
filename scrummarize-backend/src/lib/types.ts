type BaseTask = {
  name: string;
  priorityRating: number;
  storyPoints: number;
  tags: string[];
};

export type InsertTask = BaseTask & {
  description: string;
  assignee: string | null;
};

export type ProductBacklogTask = BaseTask & {
  id: string;
};

export type DBProductBacklogTask = {
  id: string;
  name: string;
  priority_rating: number;
  story_points: number;
  tags: string[];
};
