import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';

//UNCAUGHT EXCEPTION
process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function uniManagement() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connected Successfylly');
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error(`Failled to connect database`, error);
  }

  // UNHANDLED REJECTION
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
uniManagement();

//SIGTERM(SIGNAL TERMINATION)
process.on('SIGTERM', () => {
  logger.info('SIGTERM is recived');
  if (server) {
    server.close();
  }
});
