"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zSignInTrpcInput = void 0;
const zod_1 = require("zod");
exports.zSignInTrpcInput = zod_1.z.object({
    nick: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
});
//# sourceMappingURL=input.js.map