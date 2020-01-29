import ROUTES from './routes';
import fetch from 'node-fetch';

const BASE_URL = 'https://myride.ometro.com/Home';

const Endpoints = {
  NearbyRoutes: '/GetNearbyRoutes',
  RouteData: '/RefreshRouteData',
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const post = (endpoint, body) =>
  fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { ...DEFAULT_HEADERS },
    body: JSON.stringify(body),
  }).then(resp => resp.json());

export const getRouteData = route => post(Endpoints.RouteData, route);
