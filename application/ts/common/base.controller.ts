import { Response, Router } from 'express';
import {IBaseRoute} from './base.interface.js';

export { Router } from 'express';

export abstract class BaseController {
	private readonly _router: Router;

	constructor() {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T) {
		res.type('application/json')
		res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		this.send<T>(res, 200, message);
	}

	public unauthorized<T>(res: Response, message: T) {
		this.send<T>(res, 401, message);
	}

	protected bindRoutes(routes: IBaseRoute[]) : void {
		for (const route of routes) {
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}