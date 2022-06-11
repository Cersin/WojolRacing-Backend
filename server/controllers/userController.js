import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { config } from "~/server/config-server";
import catchAsync from "~/server/utils/catchAsync";
import AppError from "~/server/utils/appError";

const signToken = id => {
    return jwt.sign({id: id}, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
}

const createTokenCookie = (token, res) => {
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: false, // true to https // TODO
        httpOnly: true
    });
}

const deleteTokenCookie = (res) => {
    res.clearCookie('jwt');
}

export const signUp = catchAsync(async (req, res, next) => {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        newUser.password = undefined;

        const token = await signToken(newUser._id);

        createTokenCookie(token, res);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
});

export const getUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    if (!users) return next(new AppError('Brak użytkowników', 404))
    res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });
});

export const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError('Brak użytkowników', 404))

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

export const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError('Brak użytkownika o tym ID', 404))

    res.status(204).json({
        status: 'success',
        data: null
    });
})
