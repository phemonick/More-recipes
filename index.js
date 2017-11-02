import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
import route from './server/routes';
import expressJwt from 'express-jwt';

dotenv.config();
// db connect string
const connectDbnpm = process.env.db;
const app = express();
const recipeRoute = route.recipeRouter;
const userRoute = route.userRouter;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(recipeRoute);
app.use(userRoute);

export default app;
