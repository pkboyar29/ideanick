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
exports.signInTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const getPasswordHash_1 = require("../../../utils/getPasswordHash");
const signJWT_1 = require("../../../utils/signJWT");
const input_1 = require("./input");
exports.signInTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zSignInTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    const user = yield ctx.prisma.user.findFirst({
        where: {
            nick: input.nick,
            password: (0, getPasswordHash_1.getPasswordHash)(input.password),
        },
    });
    if (!user) {
        throw new Error('Wrong nick or password');
    }
    const token = (0, signJWT_1.signJWT)(user.id);
    return { token };
}));
//# sourceMappingURL=index.js.map