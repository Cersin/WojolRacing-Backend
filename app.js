import express from 'express';
import mongoose from "mongoose";
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes  from "./routes/userRoutes.js";
import playersRoutes from "./routes/playersRoutes.js"
import racesRoutes from "./routes/racesRoutes.js";
import assettoRacesRoutes from "./routes/assettoRacesRoutes.js";
import assettoPlayersRoutes from "./routes/assettoPlayersRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import seasonRoutes from "./routes/seasonRoutes.js";
import splitRoutes from "./routes/splitRoutes.js";
import {globalErrorHandler} from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import articlesRoutes from "./routes/articlesRoutes.js";

const app = express();
app.use(express.urlencoded({extended: true}));

app.enable("trust proxy");

const router = express.Router();

const port  = process.env.PORT || 3000;



// const whitelist = ['*', 'https://wojolracing.pl', 'http://wojolracing.pl']
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     credentials: true,
// }

app.use(helmet());
app.use(express.json()); // middleware for sending request
app.use(cors());
app.use(hpp());
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION. SHUTTING DOWN');
    process.exit(1);
})


// const db =  process.env.DATABASE_LOCAL;
const db = process.env.DATABASE_GLOBAL
mongoose.connect(db).then(() => {
    console.log('Połączono z bazą danych');
});

app.use('/api/users', userRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/race', racesRoutes);
app.use('/api/assetto-players', assettoPlayersRoutes);
app.use('/api/assetto-race', assettoRacesRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/seasons', seasonRoutes);
app.use('/api/splits', splitRoutes);
app.use('/api/articles', articlesRoutes);
app.use(express.static('public'));

app.all('*', (req,res,next) => {
    next(new AppError(`Nie mogę znaleźć ${req.originalUrl} na tym serwerze!`, 404));
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION. SHUTTING DOWN');
    process.exit(1);
})

app.use(globalErrorHandler);

