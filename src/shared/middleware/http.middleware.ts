import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class HttpMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            console.log(`HTTP Version: ${req.httpVersion}`);
        });
        next();
    }
}