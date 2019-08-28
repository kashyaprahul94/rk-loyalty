import { AxiosRequestConfig } from "axios";

import { Method } from "../enums";

import { IData, IHeader, IParam } from "../types";

export class Request {
  private method: Method;
  private url: string;
  private params?: IParam;
  private headers?: IHeader;
  private data?: IData;

  constructor(
    method: Method = Method.GET,
    url: string = "",
    params: IParam = null,
    headers: IHeader = null,
    data: IData = null,
  ) {
    this.method = method;
    this.url = url;
    this.params = params;
    this.headers = headers;
    this.data = data;
  }

  public getMethod(): Method {
    return this.method;
  }
  public withMethod(method: Method): Request {
    this.method = method;
    return this;
  }

  public getURL(): string {
    return this.url;
  }
  public withURL(url: string): Request {
    this.url = url;
    return this;
  }

  public getParams(): IParam | undefined {
    return this.params;
  }
  public withParams(params: IParam): Request {
    this.params = params;
    return this;
  }

  public getHeaders(): IHeader | undefined {
    return this.headers;
  }
  public withHeaders(headers: IHeader): Request {
    this.headers = headers;
    return this;
  }

  public getData(): IData {
    return this.data;
  }
  public withData(data: IData): Request {
    this.data = data;
    return this;
  }

  public withParam(param: IParam): Request {
    this.params = {
      ...this.params,
      ...param,
    };
    return this;
  }
  public withHeader(header: IHeader): Request {
    this.headers = {
      ...this.headers,
      ...header,
    };
    return this;
  }

  public build(): AxiosRequestConfig {
    return {
      data: this.getData(),
      headers: this.getHeaders(),
      method: this.method,
      params: this.getParams(),
      url: this.getURL(),
    };
  }
}
