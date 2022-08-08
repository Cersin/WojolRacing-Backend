import express from 'express';
const router = express.Router();
import calendarController from "~/server/controllers/calendarController";
import {protect, restrictTo} from "~/server/controllers/authController";

router
    .route('/')
    .get(calendarController.getCalendar)
    .post(protect, restrictTo('admin'), calendarController.createCalendar);

router
    .route('/:id')
    .patch(protect, restrictTo('admin'), calendarController.editCalendar)
    .delete(protect, restrictTo('admin'), calendarController.deleteCalendar);

export default router
