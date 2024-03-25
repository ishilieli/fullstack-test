import { BaseController } from '../common/base.controller.js';
import fs from "fs";
import * as dotenv from 'dotenv';
dotenv.config();
export class AuthController extends BaseController {
    constructor() {
        super();
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.registerCheck },
            { path: '/register', method: 'get', func: this.register },
            { path: '/login', method: 'post', func: this.loginCheck },
            { path: '/login', method: 'get', func: this.login },
        ]);
    }
    login(req, res, next) {
        fs.readFile("./dist/views/auth/auth.html", "utf8", function (error, data) {
            let h1 = "Авторизуйтесь";
            data = data.replace("{h1}", h1);
            res.end(data);
        });
        console.log('middleware user');
        //next(new HTTPError(401, 'ошибка авторизации', 'login'));
    }
    loginCheck(req, res, next) {
    }
    register(req, res, next) {
        fs.readFile("./dist/views/auth/auth.html", "utf8", function (error, data) {
            let h1 = "Зарегистрируйтесь";
            data = data.replace("{h1}", h1);
            res.end(data);
        });
    }
    registerCheck(req, res, next) {
        return this.ok(res, 'register');
    }
}
