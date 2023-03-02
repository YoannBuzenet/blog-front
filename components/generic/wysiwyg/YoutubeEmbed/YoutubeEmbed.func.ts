export const parseYoutubeUrl = (url: string) => {
  let finalUrl = url;

  const shouldURLBuShortened = url.includes("https://www.youtube.com/watch?v=");

  if (shouldURLBuShortened) {
    finalUrl = url.split("https://www.youtube.com/watch?v=")[1];
  }

  return finalUrl;
};
