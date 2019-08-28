import { LogLevel } from "../enums";

export interface LoggerOptions {
  decorator?: string;
  defaultLevel?: LogLevel;
  shouldLogTime?: boolean;
}

export const DefaultLoggerOptions: LoggerOptions = {
  decorator: "",
  defaultLevel: LogLevel.Default,
  shouldLogTime: false,
};
