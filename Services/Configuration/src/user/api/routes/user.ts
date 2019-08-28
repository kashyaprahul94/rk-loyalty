import {
  StatusCode,
  APIHandler,
  APIRequest,
  APIResponse,
  APIBypass,
  APIRouter,
  APIRoute,
  BaseAPIRoute,
} from "@rk-loyalty/core";

import { UserRequest, IUser } from "../../types";

import { UserService } from "../../services";

export class UserRoute extends BaseAPIRoute implements APIRoute {
  public path: string;
  private delegate: UserService;

  public constructor(router: APIRouter) {
    super(router);
    this.path = "/";

    this.delegate = new UserService();
  }

  public mount(): APIRouter {
    super.configure();

    this.resource("/").get(this.getUsers);

    return this.router;
  }

  private getUsers: APIHandler<UserRequest> = async (
    _: APIRequest<UserRequest>,
    res: APIResponse,
    next: APIBypass,
  ) => {
    try {
      const users: IUser[] = await this.delegate.getAll();
      res.status(StatusCode.Okay).json(users);
    } catch (e) {
      next(e);
    }
  };
}
