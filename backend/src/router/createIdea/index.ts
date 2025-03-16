import { trpc } from '../../lib/trpc';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const existsIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (existsIdea) {
      throw Error('Idea with this nick already exists!');
    }

    await ctx.prisma.idea.create({
      data: input,
    });

    return true;
  });
