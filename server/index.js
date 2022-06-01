import express from 'express';
import mongoose from "mongoose";
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

import { config } from "./config-server";

const app = express();

const db = config.DATABASE_LOCAL;

mongoose.connect(db).then(() => {
    console.log('Połączono z bazą danych');
});

app.use(helmet());
app.use(express.json()); // middleware for sending request
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cookieParser());

export default app
