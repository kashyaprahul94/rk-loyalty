import { IRoute } from "express";

import { APIRouter } from "./router";

export type RouteType = string | RegExp;

export interface APIRoute {
  path: RouteType;
  mount(): APIRouter;
}

export interface APIResource extends IRoute {}
