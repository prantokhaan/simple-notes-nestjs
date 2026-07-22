import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const key = req.get('x-api-key');

    if(!key){
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
    next();
  }
}