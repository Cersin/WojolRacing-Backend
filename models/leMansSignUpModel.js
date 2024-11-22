import mongoose from "mongoose";

const drivers = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Driver full name required'],
    },
    steamId: {
        type: String,
        required: [true, 'Driver steam64id  required'],
    },
    discordTag: {
        type: String,
        required: [true, 'Driver discordTag required'],
    },
})

const leMansSignUpModel = new mongoose.Schema({
    status: {
        type: String,
        default: 'pending',
    },
    team: {
        type: String,
        required: [true, 'Team name required'],
        trim: true
    },
    drivers: [drivers],
    carType: {
        type: String,
        required: [true, 'Team car type required'],
    },
    carGTE: {
        type: String,
        required: false,
    },
    ceo: {
        type: String,
        required: [true, 'Team ceo full name  required'],
    },
    ceoDiscordTag: {
        type: String,
        required: [true, 'Team ceo discord tag required'],
    },
    teamNumber1: {
        type: Number,
        required: [true, 'Team number 1 required'],
    },
    teamNumber2: {
        type: Number,
        required: [true, 'Team number 2 required'],
    },
    teamNumber3: {
        type: Number,
        required: [true, 'Team number 3 required'],
    },
}, {
    timestamps: {createdAt: 'createdAt'}
})

const SignUpModel = mongoose.model('Lemans', leMansSignUpModel);

export default SignUpModel