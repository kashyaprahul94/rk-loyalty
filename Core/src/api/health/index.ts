import { APIRoute } from "../types";

import { API } from "../api";

import { HealthRoute } from "./route";

export class HealthAPI extends API {
  private static MountPoint: string = "/";

  public constructor() {
    super(HealthAPI.MountPoint, {
      mergeParams: true,
    });
  }

  public routes(): APIRoute[] {
    const user: HealthRoute = new HealthRoute(this.router);

    return super.decorateRoutes([user]);
  }
}
