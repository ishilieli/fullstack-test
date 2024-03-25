import { IMiddleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					console.log('пользователь не авторизован');
					res.status(401).send({error: 'пользователь не авторизованы'});
					next();
				} else if (payload) {
					req.body = payload;
					console.log(`пользователь ${req.body.login} авторизован`);
					next();
				}
			});
		} else {
			next();
		}
	}
}
