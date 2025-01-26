import { Sprint } from './types';

export function getTimezoneOffsetMilli(date: Date) {
  return date.getTimezoneOffset() * 60 * 1000;
}

export function localeDateStringToDate(dateString: string) {
  let date = new Date(dateString);
  date = new Date(date.getTime() + getTimezoneOffsetMilli(date));
  return date;
}

export const formatISOToDateString = (iso: string) => {
  let date = new Date(iso);
  date = new Date(date.getTime() - getTimezoneOffsetMilli(date));
  return date.toISOString().split('T')[0];
};

export const formatLoaderSprint = (sprint: Sprint) => ({
  ...sprint,
  startDate: formatISOToDateString(sprint.startDate),
  endDate: formatISOToDateString(sprint.endDate),
});
