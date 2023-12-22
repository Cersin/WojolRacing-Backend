import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
    season: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'Proszę wprowadź numer sezonu!'],
        unique: [true, 'Taki sezon już istnieje!'],
    },
}, {

});

seasonSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
seasonSchema.set('toJSON', {
    virtuals: true
});

const Season = mongoose.model('Season', seasonSchema);

export default Season

