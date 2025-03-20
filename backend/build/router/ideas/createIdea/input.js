"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zCreateIdeaTrpcInput = void 0;
const zod_1 = require("zod");
exports.zCreateIdeaTrpcInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    nick: zod_1.z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
    description: zod_1.z.string().min(1),
    text: zod_1.z.string().min(100),
});
//# sourceMappingURL=input.js.map