export type Task = {
  taskID: string;
  name: string;
  description: string;
  storyPoint: number;
  priorityRating: string;
  assignee: string;
  status: string;
  stage: string;
  tags: string[];
};

export type Sprint = {
  sprintID: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
};
