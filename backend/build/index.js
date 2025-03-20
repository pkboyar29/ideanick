"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./router/index");
const cors_1 = __importDefault(require("cors"));
const trpc_1 = require("./lib/trpc");
const passport_1 = require("./lib/passport");
const ctx_1 = require("./lib/ctx");
const env_1 = require("./lib/env");
const presetDb_1 = require("./scripts/presetDb");
void (() => __awaiter(void 0, void 0, void 0, function* () {
    let ctx = null;
    try {
        ctx = (0, ctx_1.createAppContext)();
        yield (0, presetDb_1.presetDb)(ctx);
        const expressApp = (0, express_1.default)();
        expressApp.use((0, cors_1.default)());
        expressApp.get('/ping', (req, res) => {
            res.send('pong');
        });
        (0, passport_1.applyPassportToExpressApp)(expressApp, ctx);
        yield (0, trpc_1.applyTrpcToExpressApp)(expressApp, ctx, index_1.trpcRouter);
        expressApp.listen(env_1.env.PORT, () => {
            console.info(`Listening at http://localhost:${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error(error);
        yield (ctx === null || ctx === void 0 ? void 0 : ctx.stop());
    }
}))();
//# sourceMappingURL=index.js.map