import express from 'express';

const router = express.Router();
import {restrictTo, protect} from "~/server/controllers/authController";
import splitController from "~/server/controllers/splitController";

router
    .route('/')
    .get(splitController.getSplits)
    .post(protect, restrictTo('admin'), splitController.createSplit);

router
    .route('/:id')
    .delete(protect, restrictTo('admin'), splitController.deleteSplit);

export default router
