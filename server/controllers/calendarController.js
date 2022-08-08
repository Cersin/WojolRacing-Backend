import Calendar from "~/server/models/calendarModel";
import catchAsync from "~/server/utils/catchAsync";
import AppError from "~/server/utils/appError";

const createCalendar = async (req, res) => {
    try {
        const newCalendar = await Calendar.create(req.body);

        res.status(201).json({
            status: 'success',
            calendar: newCalendar
        })
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e.message
        })
    }
}

const getCalendar = catchAsync(async (req, res) => {
        const calendar = await Calendar.find()
            .where('split').equals(req.query.split)
            .sort([['date', 1]])

        res.status(201).json({
            status: 'success',
            calendar: calendar
        })
});

const editCalendar = catchAsync(async (req, res, next) => {
        const calendar = await Calendar.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        console.log(calendar);

        if (!calendar) return next(new AppError('Brak kalendarza o takim id', 404))

        res.status(200).json({
            status: 'success',
            data: {
                calendar
            }
        })
});

const deleteCalendar = catchAsync(async (req, res, next) => {
        const calendar = await Calendar.findByIdAndDelete(req.params.id);
        if (!calendar) return next(new AppError('Brak kalendarza o takim id', 404))

        res.status(200).json({
            status: 'deleted'
        });
});

export default {
    createCalendar, getCalendar, editCalendar, deleteCalendar
}

