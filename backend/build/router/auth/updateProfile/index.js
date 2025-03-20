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
exports.updateProfileTrpcRoute = void 0;
const models_1 = require("../../../lib/models");
const trpc_1 = require("../../../lib/trpc");
const input_1 = require("./input");
exports.updateProfileTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zUpdateProfileTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    if (!ctx.me) {
        throw new Error('UNAUTHORIZED');
    }
    if (ctx.me.nick !== input.nick) {
        const exUser = yield ctx.prisma.user.findUnique({
            where: {
                nick: input.nick,
            },
        });
        if (exUser) {
            throw new Error('User with this nick already exists');
        }
    }
    const updatedMe = yield ctx.prisma.user.update({
        where: {
            id: ctx.me.id,
        },
        data: input,
    });
    ctx.me = updatedMe;
    return (0, models_1.toClientMe)(updatedMe);
}));
//# sourceMappingURL=index.js.map