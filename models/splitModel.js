import mongoose from "mongoose";

const splitSchema = new mongoose.Schema({
    split: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'Proszę wprowadź numer sezonu!'],
        unique: [true, 'Taki sezon już istnieje!'],
    },
}, {

});

const Split = mongoose.model('Split', splitSchema);

export default Split

