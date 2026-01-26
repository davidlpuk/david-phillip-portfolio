/**
 * Logger Utility for Chrome Extension
 * Provides structured logging with levels and context
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  level: LogLevel;
  timestamp: number;
  context: string;
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;
  private currentLevel: LogLevel = LogLevel.INFO;
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.currentLevel;
  }

  private addLog(level: LogLevel, message: string, data?: any): void {
    const entry: LogEntry = {
      level,
      timestamp: Date.now(),
      context: this.context,
      message,
      data,
    };

    this.logs.push(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    this.outputLog(entry);
  }

  private outputLog(entry: LogEntry): void {
    const timestamp = new Date(entry.timestamp).toISOString();
    const levelStr = LogLevel[entry.level];
    const prefix = `[${timestamp}] [${levelStr}] [${entry.context}]`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(prefix, entry.message, entry.data || "");
        break;
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.data || "");
        break;
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.data || "");
        break;
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.data || "");
        break;
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.addLog(LogLevel.DEBUG, message, data);
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.addLog(LogLevel.INFO, message, data);
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.addLog(LogLevel.WARN, message, data);
    }
  }

  error(message: string, error?: Error | any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const data =
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error;
      this.addLog(LogLevel.ERROR, message, data);
    }
  }

  setLevel(level: LogLevel): void {
    this.currentLevel = level;
    this.info(`Log level set to ${LogLevel[level]}`);
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter((log) => log.level >= level);
    }
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
    this.debug("Logs cleared");
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Export factory function
export function createLogger(context: string): Logger {
  return new Logger(context);
}

// Export default instance for convenience
export const logger = new Logger("Extension");
