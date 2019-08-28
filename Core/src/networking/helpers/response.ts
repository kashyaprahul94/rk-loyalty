import { AxiosRequestConfig, AxiosResponse } from "axios";

import { IHeader, IHeaderValue } from "../types";

export class Response<T> {
  private readonly _request: any;
  private readonly _conifg: AxiosRequestConfig;
  private readonly _status: number;
  private readonly _statusText: string;
  private readonly _headers: IHeader;
  private readonly _data: T;

  public constructor(response: AxiosResponse) {
    this._request = response.request;
    this._conifg = response.config;
    this._status = response.status;
    this._statusText = response.statusText;
    this._headers = response.headers;
    this._data = response.data;
  }

  public static Create = (response: AxiosResponse) => {
    return new Response(response);
  };

  public request(): any {
    return this._request;
  }
  public config(): any {
    return this._conifg;
  }

  public status(): number {
    return this._status;
  }
  public statusText(): string {
    return this._statusText;
  }

  public headers(): IHeader {
    return this._headers;
  }
  public header(key: string): IHeaderValue {
    if (this._headers) {
      return this._headers[key];
    }
    return "";
  }

  public data(): T {
    return this._data;
  }
}
