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
exports.getIdeasTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const input_1 = require("./input");
const lodash_1 = __importDefault(require("lodash"));
exports.getIdeasTrpcRoute = trpc_1.trpc.procedure
    .input(input_1.zGetIdeasTrpcInput)
    .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
    const normalizedSearch = input.search
        ? input.search.trim().replace(/[\s\n\t]/g, ' & ')
        : undefined;
    const rawIdeas = yield ctx.prisma.idea.findMany({
        select: {
            id: true,
            nick: true,
            name: true,
            description: true,
            serialNumber: true,
            _count: {
                select: {
                    ideasLikes: true,
                },
            },
        },
        where: Object.assign({ blockedAt: null }, (!normalizedSearch
            ? {}
            : {
                OR: [
                    {
                        name: {
                            search: normalizedSearch,
                        },
                    },
                    {
                        description: {
                            search: normalizedSearch,
                        },
                    },
                    {
                        text: {
                            search: normalizedSearch,
                        },
                    },
                ],
            })),
        orderBy: [
            {
                createdAt: 'desc',
            },
            {
                serialNumber: 'desc',
            },
        ],
        cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
        take: input.limit + 1,
    });
    const nextIdea = rawIdeas.at(input.limit);
    const nextCursor = nextIdea === null || nextIdea === void 0 ? void 0 : nextIdea.serialNumber;
    const rawIdeasExceptNext = rawIdeas.slice(0, input.limit);
    const ideasExceptNext = rawIdeasExceptNext.map((idea) => (Object.assign(Object.assign({}, lodash_1.default.omit(idea, ['_count'])), { likesCount: idea._count.ideasLikes })));
    return { ideas: ideasExceptNext, nextCursor };
}));
//# sourceMappingURL=index.js.map