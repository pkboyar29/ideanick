"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zSignUpTrpcInput = void 0;
const zod_1 = require("zod");
exports.zSignUpTrpcInput = zod_1.z.object({
    nick: zod_1.z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
    email: zod_1.z.string().min(1).email(),
    password: zod_1.z.string().min(1),
});
//# sourceMappingURL=input.js.map