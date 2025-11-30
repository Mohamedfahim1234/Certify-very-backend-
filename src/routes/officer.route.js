import { Router } from "express";
import { signupController } from "../controller/officer/auth/signup.js";
import { loginController } from "../controller/officer/auth/login.js";

const Officerouter = Router();

Officerouter.post('/signup', signupController);
Officerouter.post('/login',loginController);

export default Officerouter;