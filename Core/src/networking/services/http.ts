import Axios, { AxiosInstance } from "axios";

import { Request, Response } from "../helpers";

export class HttpClient {
  private _client: AxiosInstance;

  public constructor() {
    this._client = Axios.create();
  }

  public async request(request: Request): Promise<Response<any>> {
    return this._client.request(request.build()).then(Response.Create);
  }

  public async get(request: Request): Promise<Response<any>> {
    return this._client
      .get(request.getURL(), request.build())
      .then(Response.Create);
  }

  public async post(request: Request): Promise<Response<any>> {
    return this._client
      .post(request.getURL(), request.getData(), request.build())
      .then(Response.Create);
  }

  public async put(request: Request): Promise<Response<any>> {
    return this._client
      .put(request.getURL(), request.getData(), request.build())
      .then(Response.Create);
  }

  public async patch(request: Request): Promise<Response<any>> {
    return this._client
      .patch(request.getURL(), request.getData(), request.build())
      .then(Response.Create);
  }

  public async delete(request: Request): Promise<Response<any>> {
    return this._client
      .delete(request.getURL(), request.build())
      .then(Response.Create);
  }
}
