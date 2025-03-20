"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIdeaLikeTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const input_1 = require("./input");
exports.setIdeaLikeTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zSetIdeaLikeIdeaTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    const { ideaId, isLikedByMe } = input;
    if (!ctx.me) {
        throw new Error('UNAUTHORIZED');
    }
    const idea = yield ctx.prisma.idea.findUnique({
        where: {
            id: ideaId,
        },
    });
    if (!idea) {
        throw new Error('NOT_FOUND');
    }
    if (isLikedByMe) {
        yield ctx.prisma.ideaLike.upsert({
            where: {
                ideaId_userId: {
                    ideaId,
                    userId: ctx.me.id,
                },
            },
            create: {
                userId: ctx.me.id,
                ideaId,
            },
            update: {},
        });
    }
    else {
        yield ctx.prisma.ideaLike.delete({
            where: {
                ideaId_userId: {
                    ideaId,
                    userId: ctx.me.id,
                },
            },
        });
    }
    const likesCount = yield ctx.prisma.ideaLike.count({
        where: {
            ideaId,
        },
    });
    return {
        idea: {
            id: idea.id,
            likesCount,
            isLikedByMe,
        },
    };
}));
//# sourceMappingURL=index.js.map