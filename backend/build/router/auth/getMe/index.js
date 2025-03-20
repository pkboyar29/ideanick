"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeTrpcRoute = void 0;
const trpc_1 = require("../../../lib/trpc");
const models_1 = require("../../../lib/models");
exports.getMeTrpcRoute = trpc_1.trpc.procedure.query(({ ctx }) => {
    return { me: (0, models_1.toClientMe)(ctx.me) };
});
//# sourceMappingURL=index.js.map