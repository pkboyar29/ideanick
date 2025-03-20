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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdeaTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const can_1 = require("../../../utils/can");
const input_1 = require("./input");
exports.updateIdeaTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zUpdateIdeaTrpcInput)
    .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    const { ideaId } = input, ideaInput = __rest(input, ["ideaId"]);
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
    if (!(0, can_1.canEditIdea)(ctx.me, idea)) {
        throw new Error('NOT_YOUR_IDEA');
    }
    if (idea.nick !== input.nick) {
        const exIdea = yield ctx.prisma.idea.findUnique({
            where: {
                nick: input.nick,
            },
        });
        if (exIdea) {
            throw new Error('Idea with this nick already exists');
        }
    }
    yield ctx.prisma.idea.update({
        where: {
            id: ideaId,
        },
        data: Object.assign({}, ideaInput),
    });
    return true;
}));
//# sourceMappingURL=index.js.map