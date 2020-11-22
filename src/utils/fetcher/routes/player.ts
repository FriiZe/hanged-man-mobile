export type PlayerEndpoint = '/players';

export type PlayerRoutes = {
  '/me': {
    'get' : {
      response: {
        id:string,
        displayName: string,
        isInGame: boolean,
        isInRoom: boolean,
        gamesWon: number,
        userId: string
      },
      parameters: never
    },
    'patch' : {
      response: never
      parameters: {
        body: {
          displayName: string,
        }
      }
    }
  },
};
