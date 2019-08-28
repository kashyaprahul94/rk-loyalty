import { LoggerVariant } from "../enums";
import { ILogger, ILoggerFactoryOptions } from "../types";

import { ConsoleLogger } from "../variants";

export class LoggerFactory {
  private delegate: ILogger;

  private constructor(delegate: ILogger) {
    this.delegate = delegate;
  }

  public static Attach(logger: ILogger): ILogger {
    return new LoggerFactory(logger).delegate;
  }

  public static Instance({
    type = LoggerVariant.Console,
    options,
  }: ILoggerFactoryOptions = {}): ILogger {
    if (type === LoggerVariant.Console) {
      return new LoggerFactory(new ConsoleLogger(options)).delegate;
    } else {
      return new LoggerFactory(new ConsoleLogger(options)).delegate;
    }
  }
}
