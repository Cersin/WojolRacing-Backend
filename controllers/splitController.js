import Split from '../models/splitModel.js';
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";


export const createSplit = catchAsync(async (req, res, next) => {
    const split = await Split.create({
        split: req.body.split,
    });

    res.status(201).json({
        status: 'success',
        data: split
    });
});


    const getSplits = catchAsync(async (req, res, next) => {
        const features = new APIFeatures(Split.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const splits = await features.query;

        if (!splits) return next(new AppError('Brak splitów', 404))
        res.status(201).json({
            status: 'success',
            data: [...splits]
        })
    })


    const deleteSplit = catchAsync(async (req, res) => {
        const season = await Split.findByIdAndDelete(req.params.id, {
            active: false
        });
        if (!season) throw new Error('Nie ma sezonu o takim id');

        res.status(204).json({
            status: 'deleted'
        });
    });

    export default {
        createSplit,
        getSplits,
        deleteSplit,
    }

