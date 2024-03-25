import { BaseController } from '../common/base.controller.js';
import { HTTPError } from "../errors/http-error.class.js";
import fs from "fs";
export class UserController extends BaseController {
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
    }
    loginCheck(req, res, next) {
        if (req.body.name === process.env.login && req.body.password === process.env.password) {
            this.ok(res, 'login');
        }
        else {
            return next(new HTTPError(401, 'ошибка авторизации', 'login'));
        }
    }
    register(req, res, next) {
        fs.readFile("./dist/views/auth/auth.html", "utf8", function (error, data) {
            let h1 = "Зарегистрируйтесь";
            data = data.replace("{h1}", h1);
            res.end(data);
        });
    }
    registerCheck(req, res, next) {
        this.ok(res, 'register');
    }
}
