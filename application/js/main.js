var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { App } from './app.js';
import { UserController } from './users/user.controller.js';
import { ExceptionFilter } from "./errors/exception.filter.js";
function testInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new App(new UserController(), new ExceptionFilter('no errors in app at init'));
        yield app.initApp();
    });
}
testInit();
