export class Logger {
  static debug(...args: any) {
    console.debug(...args);
  }

  static log(...args: any) {
    console.log(...args);
  }

  static info(...args: any) {
    console.info(...args);
  }

  static warn(...args: any) {
    console.warn(...args);
  }

  static error(...args: any) {
    console.error(...args);
  }
}
