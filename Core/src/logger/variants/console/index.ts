import { LogLevel } from "../../enums";
import { ILogger, LoggerOptions } from "../../types";

import { BaseLogger } from "../base";

export class ConsoleLogger extends BaseLogger implements ILogger {
  public constructor(options?: LoggerOptions) {
    super(options);
  }

  private log(type: LogLevel, ...args: any[]): void {
    args = super.decorate(args);
    switch (type) {
      case LogLevel.Info: {
        console.info(...args);
        break;
      }
      case LogLevel.Error: {
        console.error(...args);
        break;
      }
      default: {
        return;
      }
    }
  }

  public info(...args: any[]): void {
    this.log(LogLevel.Info, ...args);
  }

  public error(...args: any[]): void {
    this.log(LogLevel.Error, ...args);
  }
}
