import express from 'express';

const router = express.Router();
import {restrictTo, protect} from "~/server/controllers/authController";
import playersController from "~/server/controllers/playersController";

router
    .route('/')
    .get(playersController.getPlayers)
    .post(protect, restrictTo('admin'), playersController.createPlayer);

router
    .route('/:name')
    .get(playersController.getPlayer);

router
    .route('/:id')
    .patch(protect, restrictTo('admin'), playersController.editPlayer)
    .delete(protect, restrictTo('admin'), playersController.deletePlayer);

export default router
