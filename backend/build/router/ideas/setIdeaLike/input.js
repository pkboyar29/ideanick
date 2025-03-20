"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zSetIdeaLikeIdeaTrpcInput = void 0;
const zod_1 = require("zod");
exports.zSetIdeaLikeIdeaTrpcInput = zod_1.z.object({
    ideaId: zod_1.z.string().min(1),
    isLikedByMe: zod_1.z.boolean(),
});
//# sourceMappingURL=input.js.map