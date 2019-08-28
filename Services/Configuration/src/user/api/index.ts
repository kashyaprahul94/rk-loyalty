import { APIRoute, API } from "@rk-loyalty/core";

import { UserRoute } from "./routes";

export class UserAPI extends API {
  private static MountPoint: string = "/user";

  public constructor() {
    super(UserAPI.MountPoint, {
      mergeParams: true,
    });
  }

  public routes(): APIRoute[] {
    const user: UserRoute = new UserRoute(this.router);

    return super.decorateRoutes([user]);
  }
}
