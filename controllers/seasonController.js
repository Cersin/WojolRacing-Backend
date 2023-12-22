import Season from '../models/seasonModel.js';
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";


export const createSeason = catchAsync(async (req, res, next) => {
    const season = await Season.create({
        season: req.body.season,
    });

    res.status(201).json({
        status: 'success',
        data: season
    });
});


    const getSeasons = catchAsync(async (req, res, next) => {
        const features = new APIFeatures(Season.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const seasons = await features.query;

        if (!seasons) return next(new AppError('Brak sezonów', 404))
        res.status(201).json({
            status: 'success',
            data: [...seasons]
        })
    })


    const deleteSeason = catchAsync(async (req, res) => {
        const season = await Season.findByIdAndDelete(req.params.id, {
            active: false
        });
        if (!season) throw new Error('Nie ma sezonu o takim id');

        res.status(204).json({
            status: 'deleted'
        });
    });

    export default {
        createSeason,
        getSeasons,
        deleteSeason,
    }

