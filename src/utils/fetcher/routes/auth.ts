export type AuthEndpoint = '/auth';

export type AuthRoutes = {
  '/login': {
    method: 'post',
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
  '/register': {
    method: 'post',
    parameters: {
      body: {
        username: string,
        password: string,
      },
    }
    response: void
  }
};
