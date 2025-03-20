"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpcRouter = void 0;
const trpc_1 = require("../lib/trpc");
const getIdea_1 = require("./ideas/getIdea");
const getIdeas_1 = require("./ideas/getIdeas");
const createIdea_1 = require("./ideas/createIdea");
const signUp_1 = require("./auth/signUp");
const signIn_1 = require("./auth/signIn");
const getMe_1 = require("./auth/getMe");
const updateIdea_1 = require("./ideas/updateIdea");
const updateProfile_1 = require("./auth/updateProfile");
const updatePassword_1 = require("./auth/updatePassword");
const setIdeaLike_1 = require("./ideas/setIdeaLike");
const blockIdea_1 = require("./ideas/blockIdea");
exports.trpcRouter = trpc_1.trpc.router({
    getIdea: getIdea_1.getIdeaTrpcRoute,
    getIdeas: getIdeas_1.getIdeasTrpcRoute,
    createIdea: createIdea_1.createIdeaTrpcRoute,
    updateIdea: updateIdea_1.updateIdeaTrpcRoute,
    signUp: signUp_1.signUpTrpcRoute,
    signIn: signIn_1.signInTrpcRoute,
    getMe: getMe_1.getMeTrpcRoute,
    updateProfile: updateProfile_1.updateProfileTrpcRoute,
    updatePassword: updatePassword_1.updatePasswordTrpcRoute,
    setIdeaLike: setIdeaLike_1.setIdeaLikeTrpcRoute,
    blockIdea: blockIdea_1.blockIdeaTrpcRoute,
});
//# sourceMappingURL=index.js.map