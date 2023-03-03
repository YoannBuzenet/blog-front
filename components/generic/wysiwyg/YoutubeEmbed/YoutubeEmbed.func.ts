/**
 * Makes sure youtube Iframe receives the right part of the url
 * @param url
 * @returns url at Youtube Iframe Format
 */
export const parseYoutubeUrl = (url: string) => {
  let finalUrl = url;

  const shouldURLBuShortened = url.includes("https://www.youtube.com/watch?v=");

  if (shouldURLBuShortened) {
    finalUrl = url.split("https://www.youtube.com/watch?v=")[1];
  }

  return finalUrl;
};
