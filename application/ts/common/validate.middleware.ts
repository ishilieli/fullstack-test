import {NextFunction, Request, Response} from "express";
import {IMiddleware} from "./middleware.interface.js";

export class ValidateMiddleware implements IMiddleware {
    constructor() {
    }

    execute(req: Request, res: Response, next: NextFunction): void {

    }
}