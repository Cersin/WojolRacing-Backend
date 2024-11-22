import express from 'express';

const router = express.Router();
import leMansSignUp from "../controllers/leMansSignUpController.js";

router
    .route('/')
    .post(leMansSignUp.createSignUp);

router
    .route('/:id')
    .get(leMansSignUp.getSignUp);

export default router
