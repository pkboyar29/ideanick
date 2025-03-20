"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zBlockIdeaTrpcInput = void 0;
const zod_1 = require("zod");
exports.zBlockIdeaTrpcInput = zod_1.z.object({
    ideaId: zod_1.z.string().min(1),
});
//# sourceMappingURL=input.js.map