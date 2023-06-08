import express, { Application,NextFunction } from "express"
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import configKeys from "../../config";
import mongoSanitize from 'express-mongo-sanitize'
import helmet from "helmet";

const expressConfig = (app: Application) => {

    // Development logging
    if (configKeys.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.use(cors({ origin: configKeys.ORIGIN_PORT }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(helmet())
    app.use(mongoSanitize())
}

export default expressConfig