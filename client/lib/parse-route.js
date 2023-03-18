/**
 * This parse-route function takes the hash route as a parameter. Taking the route
 * after what exists hash, the function uses URLSearchParams to determine the route
 * from queryStrings, and the path and params, is returned from the function.
 */

export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, queryString] = hashRoute.split('?');
  const params = new URLSearchParams(queryString);
  return { path, params };
}
