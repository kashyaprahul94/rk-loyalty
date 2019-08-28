import { RequestHandler } from "express";

import { APIRequest, APIResponse, APIBypass, IBaseAPIRequest } from "../types";

export interface APIHandler<T extends IBaseAPIRequest> extends RequestHandler {
  (req: APIRequest<T>, res: APIResponse, next: APIBypass);
}
