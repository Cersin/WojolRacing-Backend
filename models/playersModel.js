import mongoose from "mongoose";

const playersModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    team: {
        type: String,
        default: null,
    },
    split: {
        type: Number,
        default: null,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    photo: {
        type: String,
        default: null
    }
});

const Players = mongoose.model('Players', playersModel);

export default Players

