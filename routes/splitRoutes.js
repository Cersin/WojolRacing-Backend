import express from 'express';

const router = express.Router();
import {restrictTo, protect} from "../controllers/authController.js";
import splitController from "../controllers/splitController.js";

router
    .route('/')
    .get(splitController.getSplits)
    .post(protect, restrictTo('admin'), splitController.createSplit);

router
    .route('/:id')
    .delete(protect, restrictTo('admin'), splitController.deleteSplit);

export default router
