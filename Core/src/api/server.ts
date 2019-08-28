import * as Express from "express";
import * as BodyParser from "body-parser";
import * as Compression from "compression";
import * as CORS from "cors";
import * as Helmet from "helmet";

import { IServerOptions, DefaultServerOptions, APIRoute } from "./types";
import { LoggerFactory, ILogger, LoggerVariant } from "../logger";

import { HealthAPI } from "./health/";

export class APIServer {
  private port: number;
  private hostname: string;
  private prefix: string;
  private isHTTPs: boolean;

  private readonly instance: Express.Application;
  private readonly router: Express.Router;

  private routes: APIRoute[];

  private readonly logger: ILogger;

  constructor(input: IServerOptions = DefaultServerOptions) {
    const { port, hostname, prefix, isHTTPs } = input;

    this.port = port;
    this.hostname = hostname;
    this.prefix = prefix;
    this.isHTTPs = isHTTPs;

    this.instance = Express();
    this.router = Express.Router();

    this.routes = [];

    this.logger = LoggerFactory.Instance({
      options: {
        decorator: "HTTP Server",
        shouldLogTime: true,
      },
      type: LoggerVariant.Console,
    });

    this.init();
  }

  public withPort(port: number): APIServer {
    this.port = port;
    return this;
  }
  public asHostname(hostname: string): APIServer {
    this.hostname = hostname;
    return this;
  }
  public withPrefix(prefix: string): APIServer {
    this.prefix = prefix;
    return this;
  }

  public getPort(): number {
    return this.port;
  }
  public getHost(): string {
    return this.hostname;
  }

  public attach = (
    middleware: Express.Handler | Express.ErrorRequestHandler,
    mount?: string,
  ): APIServer => {
    mount
      ? this.instance.use(mount, middleware)
      : this.instance.use(middleware);
    return this;
  };
  public addRoute = (route: APIRoute | APIRoute[]): APIServer => {
    this.routes = this.routes.concat(route);
    return this;
  };

  private attachRoute = (route: APIRoute): APIServer => {
    if (route.mount) {
      this.router.use(route.path, route.mount());
    }
    return this;
  };
  private attachRoutes(): APIServer {
    this.addRoute(new HealthAPI().routes());
    this.routes.forEach(this.attachRoute);
    return this;
  }
  private attachErrorHandlers(): APIServer {
    return this;
  }

  private mountRoutes(): APIServer {
    this.instance.use(this.prefix, this.router);
    return this;
  }
  private mountMiddlewares(): APIServer {
    return this.attachErrorHandlers();
  }

  private init(): APIServer {
    return this.attach(BodyParser.json())
      .attach(
        BodyParser.urlencoded({
          extended: true,
        }),
      )
      .attach(CORS())
      .attach(Helmet())
      .attach(Compression());
  }

  private onServerStarted = (): void => {
    this.logger.info(
      `Server is listening at ${this.isHTTPs ? "https" : "http"}://%s:%d`,
      this.hostname,
      this.port,
    );
  };

  private async ignite(): Promise<APIServer> {
    return new Promise<APIServer>(resolve => {
      this.instance.listen(this.port, this.hostname, () => {
        this.onServerStarted();
        return resolve(this);
      });
    });
  }

  public boot = async (): Promise<APIServer> => {
    return this.attachRoutes()
      .mountRoutes()
      .mountMiddlewares()
      .ignite();
  };
}
