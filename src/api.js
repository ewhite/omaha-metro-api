import fetch from 'node-fetch';
import logger from './logging/logger';

const BASE_URL = 'https://myride.ometro.com/Home';

const Endpoints = {
  NearbyRoutes: '/GetNearbyRoutes',
  RouteData: '/RefreshRouteData',
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const call = (url, options) => {
  const method = options.method || 'GET';
  logger.info(`${method} ${url} with options: ${JSON.stringify(options)}`);
  return fetch(url, options);
};

const post = (endpoint, body) =>
  call(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { ...DEFAULT_HEADERS },
    body: JSON.stringify(body),
  }).then(resp => resp.json());

export const getRouteData = route => post(Endpoints.RouteData, route);
