import { Router } from 'express';
export { Router } from 'express';
export class BaseController {
    constructor() {
        this._router = Router();
    }
    get router() {
        return this._router;
    }
    send(res, code, message) {
        res.type('application/json');
        res.status(code).json(message);
    }
    ok(res, message) {
        this.send(res, 200, message);
    }
    unauthorized(res, message) {
        this.send(res, 401, message);
    }
    bindRoutes(routes) {
        for (const route of routes) {
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}
