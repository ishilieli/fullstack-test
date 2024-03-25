import { NextFunction, Request, Response, Router } from 'express';
import {IMiddleware} from "./middleware.interface.js";

export interface IBaseRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: 'get' | 'post' | 'delete' | 'patch' | 'put';
	middlewares?: IMiddleware[];
}