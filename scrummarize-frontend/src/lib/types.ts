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
  [key: string]: string | number | string[];
};

export type Sprint = {
  sprintID: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  completedStoryPoints: number;
  totalStoryPoints: number;
  sprintBurndownData: SprintBurndownData[];
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

export type SprintBurndownData = {
  day: number;
  storyPoint: number;
};

export type User = {
  userID: string;
  username: string;
};

export type TimeSpentDataset = {
  day: string;
  hours: number;
};

export type TimeSpentData = {
  userID: string;
  avgTimeSpent: number;
  timeSpentDataset: TimeSpentDataset[];
};
