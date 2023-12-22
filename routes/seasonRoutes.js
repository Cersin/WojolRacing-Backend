import express from 'express';
const router = express.Router();
import {restrictTo, protect} from "../controllers/authController.js";
import seasonController from "../controllers/seasonController.js";

router
    .route('/')
    .get(seasonController.getSeasons)
    .post(protect, restrictTo('admin'), seasonController.createSeason);

router
    .route('/:id')
    .delete(protect, restrictTo('admin'), seasonController.deleteSeason);

export default router
