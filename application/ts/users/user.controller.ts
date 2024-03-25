import {NextFunction, Request, Response} from 'express';
import {BaseController} from '../common/base.controller.js';
import {HTTPError} from "../errors/http-error.class.js";
import fs from "fs";
import {ValidateMiddleware} from "../common/validate.middleware.js";
import jwt, {sign} from 'jsonwebtoken'

export class UserController extends BaseController {
    constructor() {
        super();
        this.bindRoutes([
            {path: '/info', method: 'get', func: this.info},
            {path: '/register', method: 'post', func: this.registerCheck,middlewares: [new ValidateMiddleware()]}, /// сюда не забыть валидацию
            {path: '/register', method: 'get', func: this.register},
            {path: '/login', method: 'post', func: this.loginCheck},
            {path: '/login', method: 'get', func: this.login},
        ])
    }

    async info(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userInfo = await req.body.login;
        this.ok(res, { login: userInfo});
    }

    login(req: Request, res: Response, next: NextFunction) {
        fs.readFile("./dist/views/auth/auth.html", "utf8", function (error: any, data: string) {
            let h1 = "Авторизуйтесь";
            data = data.replace("{h1}", h1);
            res.end(data);
        });
    }

    async loginCheck(req: Request, res: Response, next: NextFunction) {
        const $login : string = await req.body.login,
              $password : string = await req.body.password;
        if ($login !== process.env.login && $password !== process.env.password) {
            return next(new HTTPError(401, 'ошибка авторизации', 'login'));
        }
        const jwt_data = await this.signJWT($login, String(process.env.secret));
        this.ok(res, { jwt_data });
    }

    register(req: Request, res: Response, next: NextFunction) {
        fs.readFile("./dist/views/auth/auth.html", "utf8", function (error: any, data: string) {
            let h1 = "Зарегистрируйтесь";
            data = data.replace("{h1}", h1);
            res.end(data);
        });
    }

    registerCheck(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
    private signJWT(login: string, secret: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jwt.sign({
                login,
                iat: Math.floor(Date.now() / 1000)
            }, secret, {
                algorithm: "HS256"
            }, (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token as string);
            })
        })
    }
}