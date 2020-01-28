import express from 'express';
import { createServer } from 'http';
import fetch from 'node-fetch';
import ROUTES from './routes.js';

const app = express();
const http = createServer(app);

//curl 'https://myride.ometro.com/Home/RefreshRouteData' -H 'Content-Type: application/json' --data-binary '{"route":{"routeKey":"72e3e4ca-4886-4e17-b4e6-1f689e4f3b80","nearbyStops":[{"stopCode":"1000","directionKey":"448366fe-30ac-4904-a6a3-ad156e7eb9de"},{"stopCode":"1000","directionKey":"0d07f707-4376-48c8-8a5f-d7721396ec6a"}]}}'

fetch('https://myride.ometro.com/Home/RefreshRouteData', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(ROUTES.NUMBER_2),
})
  .then(resp => resp.json())
  .then(console.log);

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
