import Players from '../models/playersModel';
import catchAsync from "~/server/utils/catchAsync";
import APIFeatures from "~/server/utils/apiFeatures";
import AppError from "~/server/utils/appError";
import multer from 'multer';

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/players')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `player-${uniqueSuffix}.${ext}`);
    }
})

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('To nie obrazek! Przyjmę tylko obrazek', 400), false);
    }
}

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
});

const uploadPlayerPhoto = upload.single('photo');

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
    const body = {...req.body};
    if (req.file) body.photo = req.file.filename;

    const player = await Players.findByIdAndUpdate(req.params.id, body, {
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
    const player = await Players.findByIdAndDelete(req.params.id, {
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
    deletePlayer,
    uploadPlayerPhoto,
}
