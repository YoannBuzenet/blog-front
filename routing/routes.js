export const buildCompleteURL = (url) => {
  return process.env.NEXT_PUBLIC_API_URL + url;
};

export const routes = {
  api: {
    entities: {
      page: {
        put: {
          build: (idPage) => `TODO`,
        },
        post: {
          build: () => `TODO`,
        },
      },
    },
    auth: {
      login: {
        // Not implemented yet in back-end
        build: buildCompleteURL(`/api/auth`),
      },
    },
  },
};
