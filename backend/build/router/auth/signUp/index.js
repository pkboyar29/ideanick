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
exports.signUpTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const input_1 = require("./input");
const getPasswordHash_1 = require("../../../utils/getPasswordHash");
const signJWT_1 = require("../../../utils/signJWT");
const emails_1 = require("../../../lib/emails");
exports.signUpTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zSignUpTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    const exUserWithNick = yield ctx.prisma.user.findUnique({
        where: {
            nick: input.nick,
        },
    });
    if (exUserWithNick) {
        throw new Error('User with this nick already exists');
    }
    const exUserWithEmail = yield ctx.prisma.user.findUnique({
        where: {
            email: input.email,
        },
    });
    if (exUserWithEmail) {
        throw new Error('User with this email already exists');
    }
    const user = yield ctx.prisma.user.create({
        data: {
            nick: input.nick,
            email: input.email,
            password: (0, getPasswordHash_1.getPasswordHash)(input.password),
        },
    });
    (0, emails_1.sendWelcomeEmail)({ user });
    const token = (0, signJWT_1.signJWT)(user.id);
    return { token };
}));
//# sourceMappingURL=index.js.map