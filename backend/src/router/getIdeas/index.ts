import { z } from 'zod';
import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';
import { pick } from 'lodash';

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return {
    ideas: ideas.map((idea) => pick(idea, ['nick', 'name', 'description'])),
  };
});
