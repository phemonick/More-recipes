import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import route from './server/routes';

const app = express();
const recipeRoute = route.recipe;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(recipeRoute);

export default app;