export type AuthEndpoint = '/auth';

export type AuthRoutes = {
  '/login': {
    'get': never,
    'post': {
      response: {
        token: string,
      },
      parameters: {
        body: {
          username: string,
          password: string,
        },
      }
    },
    'patch': never,
    'delete': never,
  }
  '/:id': {
    'get': {
      response: { name: string },
      parameters: never,
    },
    'post': never,
    'patch': never,
    'delete': never
  },
  '/register': {
    'get': never,
    'post': {
      response: void,
      parameters: {
        body: {
          username: string,
          password: string,
        },
      }
    },
    'patch': never,
    'delete': never,

  }
};
