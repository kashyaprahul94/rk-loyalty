import { Handler, ErrorRequestHandler } from "express";

export interface APIMiddleware {
  middleware: Handler | ErrorRequestHandler;
  mount?: string;
}
