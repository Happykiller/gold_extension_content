import config from '../../common/config';
import LoggerService from '../logger/logger.service';

export default class LoggerServiceReal implements LoggerService {
  log(...args : any[]): void {
    console.log(args);
  }

  debug(...args : any[]): void {
    if (config.app_debug) {
      console.debug(args);
    }
  }

  error(...args : any[]): void {
    console.error(args);
  }
} 