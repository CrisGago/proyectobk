//middleware/verifyToken.js
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// export const verifyToken = (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user, info) =>{
//         if (err) {
//             return res.status(500).send({ origin: config.SERVER, payload: 'Error interno del servidor'});
//         }
//         if (!user) {
//             return res.status(401).send({ origin: config.SERVER, payload: 'Token no válido o no autorizado'});
//         }
//         req.user = user;
//         next();
//     })(req, res, next);
// };


export const verifyToken = (req, res, next) => {
    const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1]: undefined;
    const cookieToken = req.cookies && req.cookies[`${config.APP_NAME}_cookie`] ? req.cookies[`${config.APP_NAME}_cookie`]: undefined;
    const queryToken = req.query.access_token ? req.query.access_token: undefined;
    const receivedToken = headerToken || cookieToken || queryToken;

    if (!receivedToken) return res.status(401).send({ origin: config.SERVER, payload: 'Se requiere token' });

    jwt.verify(receivedToken, config.SECRET, (err, payload) => {
        if (err) return res.status(403).send({ origin: config.SERVER, payload: 'Token no válido' });
        req.user = payload;
        next();
    });
}