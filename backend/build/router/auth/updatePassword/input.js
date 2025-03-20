"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zUpdatePasswordTrpcInput = void 0;
const zod_1 = require("zod");
exports.zUpdatePasswordTrpcInput = zod_1.z.object({
    oldPassword: zod_1.z.string().min(1),
    newPassword: zod_1.z.string().min(1),
});
//# sourceMappingURL=input.js.map