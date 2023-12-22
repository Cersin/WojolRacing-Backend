import express from 'express';
import {deleteUser, getUser, getUsers, signUp} from "../controllers/userController.js";
import {logIn, verify} from "../controllers/authController.js";

const router = express.Router();

router
    .get('/', getUsers)
    .get('/verify', verify)
    .get('/:id', getUser)
    .post('/signup', signUp)
    .post('/login', logIn)
    .delete('/:id', deleteUser);

export default router
