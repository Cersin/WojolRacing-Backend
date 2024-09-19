import catchAsync from "../utils/catchAsync.js";
import Article from "../models/articleModel.js"
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import multer from "multer";

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/public/articles`)
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `article-${uniqueSuffix}.${ext}`);
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

const uploadArticlePhoto = upload.single('mainPhoto');


const getArticles = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(Article.find(), req.query).filter().sort().limitFields().paginate();
    const articles = await features.query;
    const count = await Article.countDocuments();
    let pagination = {};
    if (req.query.limit && req.query.page) {
        pagination.page = +req.query.page;
        pagination.pages = Math.ceil(count / +req.query.limit)
    };

    if(!articles) return next(new AppError('Brak artykułów', 404))

    res.status(201).json({
        status: 'success',
        pagination: {...pagination},
        size: count,
        data: articles,
    })
})

const getArticle = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(Article.findById(req.params.id), req.query);
    const article = await features.query;

    if(!article) return next(new AppError('Brak artykułu', 404))

    res.status(201).json({
        status: 'success',
        data: article,
    })
})

const createArticle = catchAsync(async (req,res) => {
    const body = {...req.body};
    if (req.file) body.mainPhoto = req.file.filename;

    const newArticle = await Article.create(body);

    res.status(201).json({
        status: 'success',
        data: newArticle,
    })
})

const editArticle = catchAsync(async (req,res, next) => {
    const body = {...req.body};
    if (req.file) body.mainPhoto = req.file.filename;

    const article = await Article.findByIdAndUpdate(req.params.id, body, {
        new: true,
        runValidators: true,
    })

    if(!article) return next(new AppError('Nie ma artykułu o takim id', 404));

    res.status(200).json({
        status: 'success',
        data: article
    })
})

const deleteArticle = catchAsync(async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) throw new Error('Nie ma artykułu o takim id');

    res.status(204).json({
        status: 'deleted'
    });
});

export default {
    getArticles,
    getArticle,
    createArticle,
    editArticle,
    deleteArticle,
    uploadArticlePhoto,
}