import { getTaskTags } from './database/indexDB.mjs';
import { getSprintBurndownInfo } from './database/sprintBoardDB.mjs';

export function formatPBTask(task) {
  const {
    task_id,
    name,
    description,
    story_point,
    priority_rating,
    assignee,
    status,
    stage,
  } = task;

  return {
    taskID: task_id,
    name,
    description,
    storyPoint: story_point,
    priorityRating: priority_rating,
    assignee,
    status,
    stage,
  };
}

export function formatPutSBTask(task) {
  const {
    task_id,
    name,
    description,
    story_point,
    priority_rating,
    assignee,
    stage,
    sprint_id,
  } = task;

  return {
    taskID: task_id,
    name,
    description,
    storyPoint: story_point,
    priorityRating: priority_rating,
    assignee,
    stage,
    sprintID: sprint_id,
  };
}

export function formatSBTask(task) {
  const {
    task_id,
    name,
    description,
    story_point,
    priority_rating,
    assignee,
    status,
    stage,
    sprint_id,
  } = task;

  return {
    taskID: task_id,
    name,
    description,
    storyPoint: story_point,
    priorityRating: priority_rating,
    assignee,
    status,
    stage,
    sprintID: sprint_id,
  };
}

export function formatSprint(sprint) {
  const { sprint_id, name, start_date, end_date } = sprint;

  return {
    sprintID: sprint_id,
    name,
    startDate: start_date,
    endDate: end_date,
    status: getSprintStatus(start_date, end_date),
  };
}

export function getSprintStatus(startDateISO, endDateISO) {
  let status = 'Not Started';

  const now = new Date();
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);

  if (now >= startDate) {
    status = 'Active';
  }
  if (now >= endDate) {
    status = 'Completed';
  }

  return status;
}

export async function getTasksWithTags(tasks) {
  const promiseTasks = tasks.map(async (task) => {
    const tags = await getTaskTags(task.taskID);

    return {
      ...task,
      tags,
    };
  });

  return Promise.all(promiseTasks);
}

export function formatTimeSpentLog(timeSpentLog) {
  const { task_id, time_spent, time_spent_at } = timeSpentLog;

  return {
    taskID: task_id,
    timeSpent: time_spent,
    timeSpentAt: time_spent_at,
  };
}

export function getAccumulationOfEffortData(timeSpentLog, startDate) {
  let totalHours = 0;
  const data = timeSpentLog.map((row) => {
    totalHours += row.timeSpent;

    return {
      totalHours,
      date: row.timeSpentAt,
    };
  });

  return [{ totalHours: 0, date: startDate }, ...data];
}

export async function getSprintBurndownData(
  sprintID,
  startDate,
  totalStoryPoints
) {
  const info = await getSprintBurndownInfo(sprintID);
  let remainingStoryPoints = totalStoryPoints;

  const data = info.map((task) => {
    const day =
      Math.floor(
        (task.completeAt.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    remainingStoryPoints -= task.storyPoint;

    return {
      day,
      storyPoint: remainingStoryPoints,
    };
  });

  return [{ day: 1, storyPoint: totalStoryPoints }, ...data];
}

export function formatSprintBurndownInfo(task) {
  const { task_id, story_point, complete_at } = task;

  return {
    taskID: task_id,
    storyPoint: story_point,
    completeAt: complete_at,
  };
}

export async function getISO8601(date) {
  return date.toISOString().split('T')[0];
}
