import mongoose from "mongoose";

const playersModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
        trim: true
    },
    team: {
        type: String,
        default: null,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Players = mongoose.model('AssettoPlayers', playersModel);
export default Players

