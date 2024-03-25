import { HTTPError } from './http-error.class.js';
export class ExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(err, req, res, next) {
        if (err instanceof HTTPError) {
            this.logger = `[${err.context}] Ошибка ${err.statusCode}: ${err.message}`;
            res.status(err.statusCode).send({ err: err.message });
        }
        else {
            this.logger = `${err.message}`;
            res.status(500).send({ err: err.message });
        }
        console.log('middleware exc ' + this.logger);
    }
}
