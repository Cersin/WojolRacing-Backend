import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
    season: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'Proszę wprowadź numer sezonu!'],
        unique: [true, 'Taki sezon już istnieje!'],
    },
}, {

});

const Season = mongoose.model('Season', seasonSchema);

export default Season

