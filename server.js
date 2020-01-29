import path from 'path';
import express from 'express';
import { createServer } from 'http';
import createSocketIO from 'socket.io';
import ROUTES from './routes';
import { getRouteData } from './api';

const app = express();
const http = createServer(app);
const io = createSocketIO(http);

//curl 'https://myride.ometro.com/Home/RefreshRouteData' -H 'Content-Type: application/json' --data-binary '{"route":{"routeKey":"72e3e4ca-4886-4e17-b4e6-1f689e4f3b80","nearbyStops":[{"stopCode":"1000","directionKey":"448366fe-30ac-4904-a6a3-ad156e7eb9de"},{"stopCode":"1000","directionKey":"0d07f707-4376-48c8-8a5f-d7721396ec6a"}]}}'

const PROJECT_DIRECTORY = path.resolve();
console.log(path.resolve('./index.html'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

io.on('connection', async socket => {
  console.log('a user connected');
  socket.on('disconnect', () => console.log('user disconnected'));

  const route = await getRouteData(ROUTES.NUMBER_2);
  const nextStopTimes = route.nearbyStops
    .map(stop => stop.nextStopTimes)
    .flat()
    .map(stopTime => stopTime.estimatedDepartTime);

  io.emit('time until bus arrives received', nextStopTimes);
});

http.listen(3000, () => console.log('listening on *:3000'));

// app.get('/', (req, res) =>
//     fetch('https://myride.ometro.com/Home/RefreshRouteData', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: '{"route":{"routeKey":"72e3e4ca-4886-4e17-b4e6-1f689e4f3b80","nearbyStops":[{"stopCode":"1000","directionKey":"448366fe-30ac-4904-a6a3-ad156e7eb9de"},{"stopCode":"1000","directionKey":"0d07f707-4376-48c8-8a5f-d7721396ec6a"}]}}'
//     })
//     .then(resp => resp.json())
//     .then(json => res.send(json))
// )
// http.listen(3000, () => console.log('listening on 3000...'))
