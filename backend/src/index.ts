import express from 'express';
import { trpcRouter } from './router/index';
import cors from 'cors';
import { applyTrpcToExpressApp } from './lib/trpc';

const expressApp = express();

expressApp.use(cors());

applyTrpcToExpressApp(expressApp, trpcRouter);

expressApp.listen(3000, () => {
  console.log('Listening at http://localhost:3000');
});
