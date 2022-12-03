import {handleLogin} from "../controller/loginController";
import * as express from "express";

const router = express.Router();

router.post('/', handleLogin);