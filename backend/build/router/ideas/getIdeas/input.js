"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zGetIdeasTrpcInput = void 0;
const zod_1 = require("zod");
exports.zGetIdeasTrpcInput = zod_1.z.object({
    cursor: zod_1.z.coerce.number().optional(),
    limit: zod_1.z.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=input.js.map