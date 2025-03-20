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
exports.blockIdeaTrpcRoute = void 0;
const emails_1 = require("../../../lib/emails");
const trpc_1 = require("../../../lib/trpc");
const can_1 = require("../../../utils/can");
const input_1 = require("./input");
exports.blockIdeaTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zBlockIdeaTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    const { ideaId } = input;
    if (!(0, can_1.canBlockIdeas)(ctx.me)) {
        throw new Error('PERMISSION_DENIED');
    }
    const idea = yield ctx.prisma.idea.findUnique({
        where: {
            id: ideaId,
        },
        include: {
            author: true,
        },
    });
    if (!idea) {
        throw new Error('NOT_FOUND');
    }
    yield ctx.prisma.idea.update({
        where: {
            id: ideaId,
        },
        data: {
            blockedAt: new Date(),
        },
    });
    (0, emails_1.sendIdeaBlockedEmail)({ user: idea.author, idea });
    return true;
}));
//# sourceMappingURL=index.js.map