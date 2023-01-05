import * as jwt from "jsonwebtoken";
import {allowedEndpoints} from "../config/origins";

require('dotenv').config()

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(allowedEndpoints.some(uri => uri.path.match(req.path) && uri.method.match(req.method))) {
        next();
    } else {
        if (!authHeader?.startsWith('Bearer ')){
            return res.status(401).json({ 'message': 'Unauthorized'});
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403).json({ 'message': 'Unauthorized'})
                req.user = decoded.UserInfo.email;
                next();
            });
    }
}