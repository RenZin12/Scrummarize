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
  let status = "Not Started";

  const now = new Date();
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);

  if (now >= startDate) {
    status = "Active";
  }
  if (now >= endDate) {
    status = "Completed";
  }

  return status;
}
