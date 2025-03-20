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
exports.sendIdeaBlockedEmail = exports.sendWelcomeEmail = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const lodash_1 = __importDefault(require("lodash"));
const env_1 = require("./env");
const getHtmlTemplates = lodash_1.default.memoize(() => __awaiter(void 0, void 0, void 0, function* () {
    // const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html');
    // const htmlPaths = fg.sync(htmlPathsPattern);
    const htmlPaths = fast_glob_1.default.sync('src/emails/dist/**/*.html');
    const htmlTemplates = {};
    for (const htmlPath of htmlPaths) {
        const templateName = path_1.default.basename(htmlPath, '.html');
        htmlTemplates[templateName] = yield fs_1.promises.readFile(htmlPath, 'utf8');
    }
    return htmlTemplates;
}));
const getHtmlTemplate = (templateName) => __awaiter(void 0, void 0, void 0, function* () {
    const htmlTemplates = yield getHtmlTemplates();
    return htmlTemplates[templateName];
});
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, templateName, templateVariables = {}, }) {
    try {
        const htmlTemplate = yield getHtmlTemplate(templateName);
        const fullTemplateVaraibles = Object.assign(Object.assign({}, templateVariables), { homeUrl: env_1.env.WEBAPP_URL });
        console.info('sendEmail', {
            to,
            subject,
            templateName,
            fullTemplateVaraibles,
            htmlTemplate,
        });
        return { ok: true };
    }
    catch (error) {
        console.error(error);
        return { ok: false };
    }
});
const sendWelcomeEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, }) {
    return yield sendEmail({
        to: user.email,
        subject: 'Thanks For Registration!',
        templateName: 'welcome',
        templateVariables: {
            userNick: user.nick,
            addIdeaUrl: `${env_1.env.WEBAPP_URL}/ideas/new`,
        },
    });
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendIdeaBlockedEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, idea, }) {
    return yield sendEmail({
        to: user.email,
        subject: 'Your Idea Blocked!',
        templateName: 'ideaBlocked',
        templateVariables: {
            ideaNick: idea.nick,
        },
    });
});
exports.sendIdeaBlockedEmail = sendIdeaBlockedEmail;
//# sourceMappingURL=emails.js.map