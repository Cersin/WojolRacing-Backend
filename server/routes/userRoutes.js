import express from 'express';
import {deleteUser, getUser, getUsers, signUp} from "../controllers/userController";
import {logIn} from "~/server/controllers/authController";

const router = express.Router();

router
    .get('/', getUsers)
    .get('/:id', getUser)
    .post('/signup', signUp)
    .post('/login', logIn)
    .delete('/:id', deleteUser);

export default router
