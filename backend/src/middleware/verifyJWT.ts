import jwt from 'jsonwebtoken';
import {allowedEndpoints} from "../config/origins";
require('dotenv').config()

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(allowedEndpoints.some(path => path.match(req.path))) {
        next();
    } else {
        if (!authHeader?.startsWith('Bearer ')){
            return res.sendStatus(401);
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                req.user = decoded.UserInfo.username;
                next();
            });
    }
}