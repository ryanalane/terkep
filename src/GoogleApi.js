export const GoogleApi = function(opts) {
  opts = opts || {}

  const apiKey = opts.apiKey;
  const libraries = opts.libraries || [];
  const client = opts.client;
  const URL = 'https://maps.googleapis.com/maps/api/js';

  const url = () => {
    let url = URL;
    let params = {
      key: apiKey,
      libraries: libraries.join(','),
      client: client,
    }

    let paramStr = Object.keys(params)
        .filter(k => !!params[k])
        .map(k => `${k}=${params[k]}`).join('&');

    return `${url}?${paramStr}`;
  }

  return url();
}

export default GoogleApi
