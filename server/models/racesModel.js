import mongoose from "mongoose";

const racesSchema = new mongoose.Schema({
    season: {
        type: Number,
        required: true,
        trim: true
    },
    split: {
        type: Number,
        required: [true, 'Split wymagany'],
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
            min: [1, 'Pozycja za niska'],
            max: [20, 'Pozycja za wysoka']
        },
        dnf: {
            type: Boolean,
            required: false,
            default: false
        },
        team: {
            type: String,
            required: true
        },
        pitStops: {
            type: Number,
            required: true
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

racesSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
racesSchema.set('toJSON', {
    virtuals: true
});

const Races = mongoose.model('Races', racesSchema);

export default Races

