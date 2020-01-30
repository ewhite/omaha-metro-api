import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parse from 'date-fns/parse';
import ROUTES from './routes';
import { getRouteData } from './api';

export default async function getNextBusTimesForRoute(routeId) {
  const route = ROUTES[routeId];
  const details = await getRouteData(ROUTES[routeId]);
  return details.nearbyStops
    .map(stop => stop.nextStopTimes)
    .flat()
    .map(stopTime => stopTime.estimatedDepartTime)
    .map(timeString =>
      parse(timeString, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date())
    )
    .map(time => formatDistanceToNow(time));
}
