"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zUpdateProfileTrpcInput = void 0;
const zod_1 = require("zod");
exports.zUpdateProfileTrpcInput = zod_1.z.object({
    nick: zod_1.z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
    name: zod_1.z.string().max(50).default(''),
});
//# sourceMappingURL=input.js.map