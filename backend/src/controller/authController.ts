import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken";
import {User} from "../model/user"
import {UserService} from "../service/userService";

const bcrypt = require('bcrypt');

export class AuthController {

    private userService: UserService = new UserService();


    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;

        this.userService.getUserByEmail(email).then(user => {
            if (!email || !password) {
                throw new Error('Username and password are required.');
            }
            if (!user){
                return response.status(401).json({
                    'message': "The given login or password is incorrect"
                });
            } else {
                bcrypt.compare(password, user.password).then(result => {
                    if (result) {
                        const accessToken = jwt.sign(
                            {
                                'UserInfo': {
                                    'email': user.email,
                                }},
                            process.env.ACCESS_TOKEN_SECRET
                        );
                        response.json({ 'token': accessToken });
                    } else {
                        response.sendStatus(401);
                    }
                })
            }
        }).catch(e => {
            return response.status(400).json({ 'message': e.message });
        })
    }

    async register(request: Request, response: Response, next: NextFunction) {
        this.userService.getUserByEmail(request.body.email).then(user => {
            if (user) {
                throw new Error('The given email already exists in the database');
            }
            bcrypt.hash(request.body.password, 10).then(hashed => {
                const user = new User()
                user.email = request.body.email;
                user.password = hashed;
                this.userService.addUser(user).then(() => {
                    return response.sendStatus(201);
                })
            })
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

}