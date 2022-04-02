export const buildCompleteURL = (url) => {
  return process.env.NEXT_PUBLIC_API_URL + url;
};

export const routes = {
  api: {
    entities: {},
    auth: {
      login: {
        // Not implemented yet in back-end
        build: buildCompleteURL(`/api/auth`),
      },
    },
  },
};
