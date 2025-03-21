import express from 'express';
import { trpcRouter } from './router/index';
import cors from 'cors';
import { applyTrpcToExpressApp } from './lib/trpc';
import { applyPassportToExpressApp } from './lib/passport';
import { AppContext, createAppContext } from './lib/ctx';
import { env } from './lib/env';
import { presetDb } from './scripts/presetDb';
import { logger } from './lib/logger';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    await presetDb(ctx);
    const expressApp = express();
    expressApp.use(cors());
    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });
    applyPassportToExpressApp(expressApp, ctx);
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);
    expressApp.use(
      (
        error: unknown,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        logger.error('express', error);
        if (res.headersSent) {
          next(error);
          return;
        }
        res.status(500).send('Internal server error');
      }
    );
    expressApp.listen(env.PORT, () => {
      logger.info('express', `Listening at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    logger.error('app', error);
    await ctx?.stop();
  }
})();
