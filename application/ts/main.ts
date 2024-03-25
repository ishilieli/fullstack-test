import { App } from './app.js';
import { UserController } from './users/user.controller.js';
import { ExceptionFilter } from "./errors/exception.filter.js";

async function testInit() {
	const app = new App(new UserController(), new ExceptionFilter('no errors in app at init'));
	await app.initApp();
}

testInit();