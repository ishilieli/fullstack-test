import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface.js';
import { HTTPError } from './http-error.class.js';

export class ExceptionFilter implements IExceptionFilter {
	logger: string;
	constructor(logger: string) {
		this.logger = logger;
	}
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger = `[${err.context}] Ошибка ${err.statusCode}: ${err.message}`;
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger = `${err.message}`;
			res.status(500).send({ err: err.message });
		}
		console.log('middleware exc ' + this.logger);
	}
}