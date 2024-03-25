import * as dotenv from 'dotenv';
import express, {Express, NextFunction, Request, Response} from 'express';
import {Server} from 'http';
import {UserController} from './users/user.controller.js';
import {ExceptionFilter} from './errors/exception.filter.js';
import bodyParser from 'body-parser';
import {AuthMiddleware} from "./common/auth.middleware.js";
dotenv.config();
export class App {
    app: Express;
    server: Server;
    port: string | undefined;
    userController: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = process.env.port;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    useAssets() {
        this.app.use(express.static('dist'));
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    useMiddleware() {
        this.app.use(bodyParser.json());
        const authMiddleware = new AuthMiddleware(String(process.env.secret));
        this.app.use(authMiddleware.execute.bind(authMiddleware));
    }
    useRoutes() {
        this.app.use('/user', this.userController.router);
    }

    public async initApp() {
        this.useAssets();
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        console.log(`Сервер запущен на http://localhost:${this.port}/user/login`);
    }
}