"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPassportToExpressApp = void 0;
const passport_1 = require("passport");
const passport_jwt_1 = require("passport-jwt");
const env_1 = require("./env");
const applyPassportToExpressApp = (expressApp, ctx) => {
    const passport = new passport_1.Passport();
    passport.use(new passport_jwt_1.Strategy({
        secretOrKey: env_1.env.JWT_SECRET,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    }, (jwtPayload, done) => {
        ctx.prisma.user
            .findUnique({
            where: { id: jwtPayload },
        })
            .then((user) => {
            if (!user) {
                done(null, false);
                return;
            }
            done(null, user);
        })
            .catch((error) => {
            done(error, false);
        });
    }));
    expressApp.use((req, res, next) => {
        if (!req.headers.authorization) {
            next();
            return;
        }
        passport.authenticate('jwt', { session: false }, (...args) => {
            req.user = args[1] || undefined;
            next();
        })(req, res, next);
    });
};
exports.applyPassportToExpressApp = applyPassportToExpressApp;
//# sourceMappingURL=passport.js.map