import express from 'express';
import mongoose from "mongoose";
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import AppError from "~/server/utils/appError";
import {globalErrorHandler} from "~/server/controllers/errorController";
import { config } from "~/server/config-server";
import userRoutes from "~/server/routes/userRoutes";
import playersRoutes from "~/server/routes/playersRoutes";
import racesRoutes from "~/server/routes/racesRoutes";
import assettoRacesRoutes from "~/server/routes/assettoRacesRoutes";
import assettoPlayersRoutes from "~/server/routes/assettoPlayersRoutes";
import calendarRoutes from "~/server/routes/calendarRoutes";
import seasonRoutes from "~/server/routes/seasonRoutes";
import splitRoutes from "~/server/routes/splitRoutes";

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION. SHUTTING DOWN');
    process.exit(1);
})

const app = express();
app.enable("trust proxy");

// const db = config.DATABASE_LOCAL;
const db = config.DATABASE_GLOBAL;

mongoose.connect(db).then(() => {
    console.log('Połączono z bazą danych');
});

app.use(helmet());
app.use(express.json()); // middleware for sending request
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/players', playersRoutes);
app.use('/race', racesRoutes);
app.use('/assetto-players', assettoPlayersRoutes);
app.use('/assetto-race', assettoRacesRoutes);
app.use('/calendar', calendarRoutes);
app.use('/seasons', seasonRoutes);
app.use('/splits', splitRoutes);

app.all('*', (req,res,next) => {
    next(new AppError(`Nie mogę znaleźć ${req.originalUrl} na tym serwerze!`, 404));
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION. SHUTTING DOWN');
    process.exit(1);
})

app.use(globalErrorHandler);

export default app
