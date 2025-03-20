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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdeaTrpcRoute = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../../../lib/trpc");
const lodash_1 = __importDefault(require("lodash"));
exports.getIdeaTrpcRoute = trpc_1.trpc.procedure
    .input(zod_1.z.object({
    ideaNick: zod_1.z.string(),
}))
    .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    var _b;
    const rawIdea = yield ctx.prisma.idea.findUnique({
        where: {
            nick: input.ideaNick,
        },
        include: {
            author: {
                select: {
                    id: true,
                    nick: true,
                    name: true,
                },
            },
            ideasLikes: {
                select: {
                    id: true,
                },
                where: {
                    userId: (_b = ctx.me) === null || _b === void 0 ? void 0 : _b.id,
                },
            },
            _count: {
                select: {
                    ideasLikes: true,
                },
            },
        },
    });
    if (rawIdea === null || rawIdea === void 0 ? void 0 : rawIdea.blockedAt) {
        throw new Error('Idea is blocked by administrator');
    }
    const isLikedByMe = !!(rawIdea === null || rawIdea === void 0 ? void 0 : rawIdea.ideasLikes.length);
    const likesCount = (rawIdea === null || rawIdea === void 0 ? void 0 : rawIdea._count.ideasLikes) || 0;
    const idea = rawIdea && Object.assign(Object.assign({}, lodash_1.default.omit(rawIdea, ['ideasLikes', '_count'])), { isLikedByMe,
        likesCount });
    return { idea };
}));
//# sourceMappingURL=index.js.map