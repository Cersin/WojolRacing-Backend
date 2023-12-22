import mongoose from "mongoose";

const splitSchema = new mongoose.Schema({
    split: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'Proszę wprowadź numer sezonu!'],
        unique: [true, 'Taki sezon już istnieje!'],
    },
}, {

});

splitSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
splitSchema.set('toJSON', {
    virtuals: true
});

const Split = mongoose.model('Split', splitSchema);

export default Split

