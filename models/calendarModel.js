import mongoose from 'mongoose';

const calendarSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    split: {
        type: Number,
        required: true,
        trim: true,
    }
})

const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar
