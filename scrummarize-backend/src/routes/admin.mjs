import { Router } from 'express';
import { getLocaleDays, hashPassword } from '../utils.mjs';
import { addUser, getUserIDs, getUsernames } from '../database/usersDB.mjs';
import {
  getUserTimeSpentData,
  getUserTotalTimeSpent,
} from '../database/timeSpentLog.mjs';

const adminRouter = Router();

adminRouter
  .route('/user')

  .post(async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    const newUser = await addUser(username, hashedPassword);
    res.send(newUser);
  });

adminRouter
  .route('/users/time-spent')

  .get(async (req, res) => {
    const { startDateISO, endDateISO, timeZoneOffset } = req.query;

    const startDate = new Date(startDateISO);
    const endDate = new Date(
      new Date(endDateISO).getTime() + 1000 * 60 * 60 * 24 - 1
    );
    const days = getLocaleDays(startDate, endDate, timeZoneOffset);

    const userIDs = await getUserIDs();
    const promises = userIDs.map(async ({ userID }) => {
      const totalTimeSpent = await getUserTotalTimeSpent(
        userID,
        startDate,
        endDate
      );

      const timeSpentDataset = Array(days)
        .fill(0)
        .map((elem, i) => ({
          day: String(i + 1),
          hours: 0,
        }));

      const userTimeSpentData = await getUserTimeSpentData(
        userID,
        startDate,
        endDate
      );
      for (const data of userTimeSpentData) {
        const day = getLocaleDays(startDate, data.timeSpentAt, timeZoneOffset);
        timeSpentDataset[day - 1].hours += data.timeSpent;
      }

      return {
        userID,
        avgTimeSpent: totalTimeSpent / days,
        timeSpentDataset,
      };
    });

    res.send(await Promise.all(promises));
  });

export default adminRouter;
