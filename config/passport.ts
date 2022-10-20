import { PassportStatic } from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from "../database/users/user.model";
import { IUser } from '../database/users/user.types';

export default (passport: PassportStatic) => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "stringABCC",
    },
        (payload, done) => {
            UserModel.findById(payload.id, (err: Error, user: IUser) => {
                if (err) {
                    return done({ error: err }, false);
                }

                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            });
        }));
};
