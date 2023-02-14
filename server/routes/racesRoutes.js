import express from 'express';

const router = express.Router();
import {protect, restrictTo} from "~/server/controllers/authController";
import racesController from "~/server/controllers/racesController";

router
    .route('/')
    .get(racesController.findRaces)
    .post(protect, restrictTo('admin'), racesController.createRace);

router
    .route('/playerPoints')
    .get(racesController.userPoints);

// router
//     .route('/formatData')
//     .get(racesController.formatData);

router
    .route('/constructorPoints')
    .get(racesController.constructorsPoints);

router
    .route('/playerStatistics')
    .get(racesController.playerStatistics)

router
    .route('/:id')
    .get(racesController.getRace)
    .patch(protect, restrictTo('admin'), racesController.editRace)
    .delete(protect, restrictTo('admin'), racesController.deleteRace)

export default router
