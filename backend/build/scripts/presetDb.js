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
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetDb = void 0;
const env_1 = require("../lib/env");
const getPasswordHash_1 = require("../utils/getPasswordHash");
const presetDb = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.prisma.user.upsert({
        where: {
            nick: 'admin',
        },
        create: {
            nick: 'admin',
            email: 'admin@example.com',
            password: (0, getPasswordHash_1.getPasswordHash)(env_1.env.INITIAL_ADMIN_PASSWORD),
            permissions: ['ALL'],
        },
        update: {
            permissions: ['ALL'],
        },
    });
});
exports.presetDb = presetDb;
//# sourceMappingURL=presetDb.js.map