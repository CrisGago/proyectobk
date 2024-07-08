// config/passport.js
import passport from "passport";
import jwt, { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
//import GitHubStrategy from "pass"
import userModel from "../models/userModel.js";
import config from "../config/config.js";

// Función para extraer el token JWT de las cookies
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.auth ?? null;
    }
    return token;
};

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_secret,//'your_jwt_secret' usa la clave secreta desde el archivo de configuración
    passReqToCallback: true
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userModel.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;
