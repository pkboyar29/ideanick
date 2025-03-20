"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.applyTrpcToExpressApp = exports.trpc = void 0;
const server_1 = require("@trpc/server");
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const superjson_1 = __importDefault(require("superjson"));
const express_1 = require("trpc-playground/handlers/express");
const getCreateTrpcContext = (appContext) => ({ req }) => (Object.assign(Object.assign({}, appContext), { me: req.user || null }));
exports.trpc = server_1.initTRPC.context().create({
    transformer: superjson_1.default,
});
const applyTrpcToExpressApp = (expressApp, appContext, trpcRouter) => __awaiter(void 0, void 0, void 0, function* () {
    expressApp.use('/trpc', trpcExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext: getCreateTrpcContext(appContext),
    }));
    expressApp.use('/trpc-playground', yield (0, express_1.expressHandler)({
        trpcApiEndpoint: '/trpc',
        playgroundEndpoint: '/trpc-playground',
        router: trpcRouter,
        request: {
            superjson: true,
        },
    }));
});
exports.applyTrpcToExpressApp = applyTrpcToExpressApp;
//# sourceMappingURL=trpc.js.map