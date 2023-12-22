import mongoose from "mongoose";

const racesSchema = new mongoose.Schema({
    season: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    results: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        grid: {
            type: Number,
            required: true
        },
        position: {
            type: Number,
            required: true
        },
        dnf: {
            type: Boolean,
            required: false,
            default: false
        },
        gap: {
            type: String,
            required: false
        },
        fastestLap: {
            type: Boolean,
            required: false,
            default: false
        },
        bestLap: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        }
    }]
});

const Races = mongoose.model('AssettoRaces', racesSchema);

export default Races

