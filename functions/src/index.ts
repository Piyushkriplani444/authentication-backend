import dotenv from 'dotenv';
dotenv.config();

import * as functions from 'firebase-functions/v1';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerComponents } from './components';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();

const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

app.use(cors());
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

registerComponents(app);

errorHandler(app);

app.listen(8080, () => {
  console.log('App running');
});
module.exports.api = functions.region('asia-northeast1').https.onRequest(app);
