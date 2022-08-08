import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Proszę wprowadź nazwę użytkownika!'],
        unique: [true, 'Ta nazwa jest zajęta'],
        trim: true,
        lowercase: true,
        minlength: [4, 'Wprowadź przynajmniej 4 litery'],
        maxlength: [15, 'Nazwa może mieć maksymalnie 15 liter']
    },
    password: {
        type: String,
        required: [true, 'Nie wpisałeś hasła'],
        validate: [validator.isStrongPassword, 'Twoje hasło powinno mieć: 8 liter, 1 z małej, 1 z dużej, 1 liczbę, 1 symbol'],
        select: false // never show up in any output
    },
    role: {
        type: String,
        enum: ['user'],
        default: 'user'
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Prosze potwierdź hasło'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Twoje hasła nie są takie same'
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function (hashedPassword, userPassword) {
    return await bcrypt.compare(hashedPassword, userPassword);
}

// userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         console.log(this.passwordChangeAt, JWTTimestamp);
//     }
//
//     return false;
// }

const User = mongoose.model('User', userSchema);

export default User

