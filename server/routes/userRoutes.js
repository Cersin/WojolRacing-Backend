import express from 'express';
import {deleteUser, getUser, getUsers, signUp} from "../controllers/userController";

const router = express.Router();

router
    .get('/', getUsers)
    .get('/:id', getUser)
    .post('/signup', signUp)
    .delete('/:id', deleteUser);

export default router
