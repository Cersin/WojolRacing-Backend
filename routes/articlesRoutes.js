import express from 'express';

const router = express.Router();
import {restrictTo, protect} from "../controllers/authController.js";
import articleController from "../controllers/articleController.js";

router
    .route('/')
    .get(articleController.getArticles)
    .post(protect, restrictTo('admin'), articleController.uploadArticlePhoto, articleController.createArticle);

router
    .route('/:id')
    .get(articleController.getArticle)
    .patch(protect, restrictTo('admin'), articleController.uploadArticlePhoto, articleController.editArticle)
    .delete(protect, restrictTo('admin'), articleController.deleteArticle);

export default router
