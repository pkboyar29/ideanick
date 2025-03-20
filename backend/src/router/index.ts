import { trpc } from '../lib/trpc';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { getIdeaTrpcRoute } from './ideas/getIdea';
import { getIdeasTrpcRoute } from './ideas/getIdeas';
import { createIdeaTrpcRoute } from './ideas/createIdea';
import { signUpTrpcRoute } from './auth/signUp';
import { signInTrpcRoute } from './auth/signIn';
import { getMeTrpcRoute } from './auth/getMe';
import { updateIdeaTrpcRoute } from './ideas/updateIdea';
import { updateProfileTrpcRoute } from './auth/updateProfile';
import { updatePasswordTrpcRoute } from './auth/updatePassword';
import { setIdeaLikeTrpcRoute } from './ideas/setIdeaLike';
import { blockIdeaTrpcRoute } from './ideas/blockIdea';

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
  blockIdea: blockIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
