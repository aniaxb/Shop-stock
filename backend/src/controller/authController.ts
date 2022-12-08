import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken";
import {User} from "../model/user"
import {Controller} from "./controller";
import {validateUser} from "../middleware/validate";

const bcrypt = require('bcrypt');

export class AuthController extends Controller {

    constructor() {
        super(User);
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;
        this.repository.findOne({
            where: {
                email: email,
            }
        }).then(user => {
            if (!email || !password) {
                throw new Error('Username and password are required.');
            }
            if (!user){
                return response.sendStatus(401);
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
        const { email, password } = request.body;
        this.repository.findOne({
            where: {
                email: email,
            }
        }).then(result => {
            if (result){
                throw new Error('there is already a registered account on the e-mail address provided');
            }
            if (!email || !password){
                throw new Error('Username and password are required.');
            }
            if (!validateUser(email, password)){
                throw new Error('incorrect password or email format');
            }
            bcrypt.hash(password, 10).then(hashed => {
                const user = new User(email, hashed)
                this.repository.save(user).then(() => {
                    return response.sendStatus(201);
                })
            })
        }).catch(e => {
            return response.status(400).json({ 'message': e.message });
        })
    }

}