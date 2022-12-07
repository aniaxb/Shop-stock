import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken";
import {User} from "../model/user"
import {Controller} from "./controller";

const bcrypt = require('bcrypt');

export class AuthController extends Controller {

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({ 'message': 'Username and password are required.' });
        }

        this.init(User).then(() => {
            this.repository.findOne({
                where: {
                    email: email,
                }
            }).then(user => {
                if (!user){
                    return response.sendStatus(401);
                } else {
                    bcrypt.compare(password, user.password).then(result => {
                        if (result) {
                            const accessToken = jwt.sign(
                                {
                                    'UserInfo': {
                                        'email': user.email,
                                    }
                                },
                                process.env.ACCESS_TOKEN_SECRET
                            );
                            response.json({ 'token': accessToken });
                        } else {
                            response.sendStatus(401);
                        }
                    })
                }
            })
        });
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;
        if (!email || !password){
            return request.status(400).json({ 'message': 'Username and password are required.' });
        }
        this.init(User).then(() => {
            this.repository.findOne({
                where: {
                    email: email,
                }
            }).then(result => {
                if (result){
                    return response.sendStatus(409);
                }
                bcrypt.hash(password, 10).then(hashed => {
                    const user = new User(email, hashed)
                    this.repository.save(user).then(() => {
                        return response.sendStatus(201);
                    })
                })
            })
        });
    }

}