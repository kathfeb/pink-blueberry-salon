/**
 * @description Configuration for the API.
 */

export const baseAPIUrl = import.meta.env.VITE_EXPERIENCE_API;
export const apiKey = import.meta.env.VITE_EXPERIENCE_API_KEY;

export const baseConfig = {
  baseUrl: baseAPIUrl,
  prepareHeaders: (headers: any) => {
    headers.set('X-API-KEY', apiKey);
    return headers;
  }
};
