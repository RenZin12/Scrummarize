import { getTaskTags } from './database/indexDB.mjs';
import { getSprintBurndownInfo } from './database/sprintBoardDB.mjs';
import bcrypt from 'bcrypt';

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

const dayInMilli = 1000 * 60 * 60 * 24;

export function getDays(startDate, endDate) {
  return Math.floor((endDate.getTime() - startDate.getTime()) / dayInMilli) + 1;
}

export function getLocaleDays(startDate, endDate, timeZoneOffset) {
  const localeStartDate = new Date(
    startDate.getTime() - timeZoneOffset * 60 * 1000
  );
  const localeEndDate = new Date(
    endDate.getTime() - timeZoneOffset * 60 * 1000
  );

  localeStartDate.setUTCHours(0, 0, 0, 0);
  localeEndDate.setUTCHours(0, 0, 0, 0);

  return (localeEndDate.getTime() - localeStartDate.getTime()) / dayInMilli + 1;
}

export async function getSprintBurndownData(
  sprintID,
  startDate,
  totalStoryPoints
) {
  const info = await getSprintBurndownInfo(sprintID);
  let remainingStoryPoints = totalStoryPoints;

  const data = info.map((task) => {
    const day = getDays(startDate, task.completeAt);
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

const saltRounds = 10;

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

export function formatUser(user) {
  const { user_id } = user;
  return {
    userID: user_id,
    ...user,
  };
}

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({ message: 'Unauthorized access' });
}

export function checkNotAuthenticated(req, res, next) {
  if (req.isUnauthenticated()) {
    return next();
  }

  return res.send({
    isAuthenticated: true,
    user: req.user,
    message: 'Already logged in',
  });
}

export function checkAdmin(req, res, next) {
  if (req.user.role === 'Admin') {
    return next();
  }

  return res.status(401).send({ message: 'Unauthorized access' });
}
