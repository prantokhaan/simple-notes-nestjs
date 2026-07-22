import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RequestMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const id = randomUUID();
        req.requestId = id;

        next();
    }
}