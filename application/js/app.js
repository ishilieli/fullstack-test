var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
dotenv.config();
export class App {
    constructor(userController, exceptionFilter) {
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
    }
    useRoutes() {
        this.app.use('/user', this.userController.router);
    }
    initApp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useAssets();
            this.useMiddleware();
            this.useRoutes();
            this.useExceptionFilters();
            this.server = this.app.listen(this.port);
            console.log(`Сервер запущен на http://localhost:${this.port}/user/login`);
        });
    }
}
