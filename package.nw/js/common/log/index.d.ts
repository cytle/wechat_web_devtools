declare enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}
interface LogOptions {
  directory: string
  filename?: (counter: number) => string
  logLevel: LogLevel
  transportToConsole?: boolean
}
declare class Log {
  readonly options: LogOptions
  caller?: string
  private stream
  private fileCounter
  constructor(options: LogOptions)
  debug: (...messages: any[]) => void
  formattedDebug: (format?: string, ...messages: any[]) => void
  info: (...messages: any[]) => void
  formattedInfo: (format?: string, ...messages: any[]) => void
  warn: (...messages: any[]) => void
  formattedWarn: (format?: string, ...messages: any[]) => void
  error: (...messages: any[]) => void
  formattedError: (format?: string, ...messages: any[]) => void
  clean: (removeAll?: boolean) => void
  getLogFiles: () => string[]
  private init
  private formatMessages
  private transportToConsoleIfNeeded
  private write
  private rotateIfNeeded
}
declare const _default: {
  LogLevel: typeof LogLevel
  DEFAULT_FORMAT: string
  MAX_FILE_COUNT: number
  MAX_FILE_SIZE: number
  Log: typeof Log
  info: () => void
  warn: () => void
  error: () => void
}
export = _default
