import express from 'express';



const router = express.Router();
import {restrictTo, protect} from "../controllers/authController.js";
import playersController from "../controllers/playersController.js";

router
    .route('/')
    .get(playersController.getPlayers)
    .post(protect, restrictTo('admin'), playersController.uploadPlayerPhoto, playersController.createPlayer);

router
    .route('/:name')
    .get(playersController.getPlayer);

router
    .route('/:id')
    .patch(protect, restrictTo('admin'), playersController.uploadPlayerPhoto, playersController.editPlayer)
    .delete(protect, restrictTo('admin'), playersController.deletePlayer);

export default router
