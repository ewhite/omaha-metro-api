import path from 'path';
import express from 'express';
import { createServer } from 'http';
import createSocketIO from 'socket.io';
import logger from './logging/logger';
import getNextBusTimesForRoute from './getNextBusTimesForRoute';

const app = express();
const http = createServer(app);
const io = createSocketIO(http);

const PROJECT_DIRECTORY = path.resolve();
logger.info(path.resolve('./src/index.html'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./src/index.html'));
});

io.on('connection', async socket => {
  logger.info('a user connected');

  socket.on('route selected', async routeId => {
    logger.info(`route selected: ${routeId}`);
    const nextStopTimes = await getNextBusTimesForRoute(routeId);
    io.emit('time until bus arrives received', nextStopTimes);
  });

  socket.on('disconnect', () => logger.info('user disconnected'));
});

http.listen(3000, () => logger.info('listening on *:3000'));
