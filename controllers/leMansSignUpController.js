import LeMans from '../models/leMansSignUpModel.js';
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const createSignUp = catchAsync(async (req, res, next) => {
    const season = await LeMans.create(req.body);

    res.status(201).json({
        status: 'success',
        data: season
    });
});

const getSignUp = catchAsync(async (req, res, next) => {
    const signUp = await LeMans.findById(req.params.id);
    if (!signUp) return next(new AppError('Nie znaleziono', 404))
    res.status(200).json({
        status: 'success',
        data: signUp,
    });
})


export default {
    createSignUp,
    getSignUp,
}

