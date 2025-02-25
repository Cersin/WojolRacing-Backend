import {promisify} from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import 'dotenv/config'

const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createTokenCookie = (token, res) => {
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: true, // true to https // TODO
        httpOnly: true,
        sameSite: 'none',
    });
}

const deleteTokenCookie = (res) => {
    res.clearCookie('jwt');
}

export const protect = (async (req, res, next) => {
    try {
        // get token and check if its there
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            throw new Error('Nie jesteś zalogowany. Zaloguj się!');
        }

        // validate the token
        // jwt.verify(token, process.env.JWT_SECRET); // not returning a promise
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // then it will return a promise

        // if user still exist
        const freshUser = await User.findById(decoded.id);
        // console.log(user);
        if (!freshUser) {
            throw new Error('Nie ma takiego użytkownika. Zaloguj się ponownie!');
        }

        req.user = freshUser;
        next();
    } catch (e) {
        deleteTokenCookie(res);
        res.status(400).json({
            status: 'failed',
            message: e.message
        });
    }
});

export const verify = catchAsync(async (req, res) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
        throw new Error('Nie ma takiego użytkownika. Zaloguj się ponownie!');
    }
    res.status(200).json({
        status: 'success',
        logged: true,
        role: freshUser.role
    })
});

export const logIn = catchAsync(async (req, res, next) => {
    const {name, password} = req.body;

    // if name nad password exist
    if (!name || !password) {
        return next(new AppError('Musisz podać login i hasło', 403));
    }

    // check if user exist and password is correct
    const user = await User.findOne({name}).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        deleteTokenCookie(res);
        return next(new AppError('Złe hasło', 403));
    }

    // if everything ok, send token to client
    const token = await signToken(user._id);

    createTokenCookie(token, res);

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        token,
        role: user.role
    });
});

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Brak uprawnień', 401));
        }
        next();
    }
};
