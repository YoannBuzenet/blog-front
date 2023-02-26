export const buildCompleteURL = (url) => {
  return process.env.NEXT_PUBLIC_API_URL + url;
};

export const routes = {
  api: {
    entities: {
      post: {
        put: {
          build: (idPost) => buildCompleteURL(`/api/entities/posts/${idPost}`),
        },
        post: {
          build: () => buildCompleteURL(`/api/entities/posts`),
        },
      },
      answer: {
        put: {
          build: (idAnswer) =>
            buildCompleteURL(`/api/entities/answers/${idAnswer}`),
        },
        post: {
          build: () => buildCompleteURL(`/api/entities/answers`),
        },
      },
      tag: {
        put: {
          build: (igTag) =>
            buildCompleteURL(`/api/entities/tags/${igTag}`),
        },
        post: {
          build: () => buildCompleteURL(`/api/entities/tags`),
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
