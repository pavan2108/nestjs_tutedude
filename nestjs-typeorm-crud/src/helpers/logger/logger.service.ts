import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  logger: Logger;
  constructor() {
    this.logger = new Logger(LoggerService.name);
  }

  debug(message: unknown) {
    this.logger.debug(message);
  }

  info(message: unknown) {
    this.logger.log(message);
  }

  warn(message: unknown) {
    this.logger.warn(message);
  }

  error(message: unknown) {
    this.logger.error(message);
  }
}
