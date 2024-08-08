import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import ApiFeatures from "../utils/apiFeatures.js";
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
    const features = new ApiFeatures(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const users = await features.query;
    const count = await User.countDocuments();
    let pagination = {};
    if (req.query.limit && req.query.page) {
        pagination.page = +req.query.page;
        pagination.pages = Math.ceil(count / +req.query.limit)
    };
    if (!users) return next(new AppError('Brak użytkowników', 404))
    res.status(200).json({
            status: 'success',
            pagination: {...pagination},
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
