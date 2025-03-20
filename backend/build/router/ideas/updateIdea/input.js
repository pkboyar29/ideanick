"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zUpdateIdeaTrpcInput = void 0;
const zod_1 = require("zod");
const input_1 = require("../createIdea/input");
exports.zUpdateIdeaTrpcInput = input_1.zCreateIdeaTrpcInput.extend({
    ideaId: zod_1.z.string().min(1),
});
//# sourceMappingURL=input.js.map