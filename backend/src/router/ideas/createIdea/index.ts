import { trpc } from '../../../lib/trpc';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }

    const existsIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (existsIdea) {
      throw Error('Idea with this nick already exists!');
    }

    await ctx.prisma.idea.create({
      data: { ...input, authorId: ctx.me.id },
    });

    return true;
  });
