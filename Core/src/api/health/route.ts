import { env } from "process";

import { StatusCode } from "../../networking/enums";

import { BaseAPIRoute } from "../route";
import { APIRequest, APIResponse, APIRouter, APIRoute } from "../types";

export class HealthRoute extends BaseAPIRoute implements APIRoute {
  public path: string;

  public constructor(router: APIRouter) {
    super(router);
    this.path = "/";
  }

  public mount(): APIRouter {
    super.configure();

    this.resource("/").all(this.getHealth);

    return this.router;
  }

  private getHealth = (_: APIRequest<any>, res: APIResponse): void => {
    res.status(StatusCode.Okay).json({
      status: "UP",
      name: env.npm_package_name,
      version: env.npm_package_version,
    });
  };
}
