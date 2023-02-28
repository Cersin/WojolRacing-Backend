import Players from '../models/assettoPlayersModel';
import catchAsync from "~/server/utils/catchAsync";
import APIFeatures from "~/server/utils/apiFeatures";
import AppError from "~/server/utils/appError";

const createPlayer = catchAsync(async (req, res) => {
    const newPlayer = await Players.create(req.body);
    res.status(201).json({
        status: 'success',
        player: newPlayer
    })
});

const getPlayers = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Players.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const players = await features.query;
    console.log(players);
    const count = await Players.countDocuments();
    let pagination = {};
    if (req.query.limit && req.query.page) {
        pagination.page = +req.query.page;
        pagination.pages = Math.ceil(count / +req.query.limit)
    };
    if (!players) return next(new AppError('Brak zawodników', 404))
    res.status(201).json({
        status: 'success',
        pagination: {...pagination},
        data: {
            players
        }
    })
})

const getPlayer = catchAsync(async (req, res) => {
    const player = await Players.findOne({name: req.params.name});
    if (!player) throw new Error('Nie ma zawodnika o takiej nazwie');

    res.status(201).json({
        status: 'success',
        data: {
            player
        }
    });
});

const editPlayer = catchAsync(async (req, res) => {
    const player = await Players.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!player) throw new Error('Nie ma zawodnika o takim id');

    res.status(200).json({
        status: 'success',
        data: {
            player
        }
    })
});

const deletePlayer = catchAsync(async (req, res) => {
    const player = await Players.findByIdAndUpdate(req.params.id, {
        active: false
    });
    if (!player) throw new Error('Nie ma zawodnika o takim id');

    res.status(204).json({
        status: 'deleted'
    });
});

export default {
    createPlayer,
    getPlayers,
    getPlayer,
    editPlayer,
    deletePlayer
}
