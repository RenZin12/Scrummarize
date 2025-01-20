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

export type SBTask = {
  taskID: string;
  name: string;
  description: string;
  storyPoint: number;
  priorityRating: string;
  assignee: string;
  status: string;
  stage: string;
  tags: string[];
  sprintID: string;
};

export type Sprint = {
  sprintID: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  completedStoryPoints: number;
  totalStoryPoints: number;
};

export type TaskName = {
  taskID: string;
  name: string;
};

export type SprintName = {
  sprintID: string;
  name: string;
};

export type AccumulationOfEffortData = {
  totalHours: number;
  date: Date;
};
