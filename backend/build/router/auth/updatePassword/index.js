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
exports.updatePasswordTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const getPasswordHash_1 = require("../../../utils/getPasswordHash");
const input_1 = require("./input");
exports.updatePasswordTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zUpdatePasswordTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    if (!ctx.me) {
        throw new Error('UNAUTHORIZED');
    }
    if (ctx.me.password !== (0, getPasswordHash_1.getPasswordHash)(input.oldPassword)) {
        throw new Error('Wrong old password');
    }
    const updatedMe = yield ctx.prisma.user.update({
        where: {
            id: ctx.me.id,
        },
        data: {
            password: (0, getPasswordHash_1.getPasswordHash)(input.newPassword),
        },
    });
    ctx.me = updatedMe;
    return true;
}));
//# sourceMappingURL=index.js.map