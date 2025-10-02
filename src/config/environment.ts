export const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  console.warn('REACT_APP_YOUTUBE_API_KEY is not defined. Please set it in your .env.local file.');
}
