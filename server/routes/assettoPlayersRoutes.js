import express from 'express';

const router = express.Router();
import {restrictTo, protect} from "~/server/controllers/authController";
import playersController from "~/server/controllers/assettoPlayersController";

router
    .route('/')
    .get(playersController.getPlayers)
    .post(protect, restrictTo('admin-assetto'), playersController.createPlayer);

router
    .route('/:name')
    .get(playersController.getPlayer);

router
    .route('/:id')
    .patch(protect, restrictTo('admin-assetto'), playersController.editPlayer)
    .delete(protect, restrictTo('admin-assetto'), playersController.deletePlayer);

export default router
