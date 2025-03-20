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
exports.createIdeaTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const input_1 = require("./input");
exports.createIdeaTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zCreateIdeaTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    if (!ctx.me) {
        throw new Error('UNAUTHORIZED');
    }
    const existsIdea = yield ctx.prisma.idea.findUnique({
        where: {
            nick: input.nick,
        },
    });
    if (existsIdea) {
        throw Error('Idea with this nick already exists!');
    }
    yield ctx.prisma.idea.create({
        data: Object.assign(Object.assign({}, input), { authorId: ctx.me.id }),
    });
    return true;
}));
//# sourceMappingURL=index.js.map