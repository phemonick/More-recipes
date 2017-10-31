import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv'
import route from './server/routes';

dotenv.config();
//db connect string
const connectDbnpm = "postgres://edu1:teleios@localhost/recipeBookdb";
const app = express();
// const recipeRoute = route.recipe;
const userRoute = route.user;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(recipeRoute);
app.use(userRoute);

export default app;