import express from 'express';



const router = express.Router();
import {restrictTo, protect} from "~/server/controllers/authController";
import seasonController from "~/server/controllers/seasonController";

router
    .route('/')
    .get(seasonController.getSeasons)
    .post(protect, restrictTo('admin'), seasonController.createSeason);

router
    .route('/:id')
    .delete(protect, restrictTo('admin'), seasonController.deleteSeason);

export default router
