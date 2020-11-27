import io from 'socket.io-client';

let client: SocketIOClient.Socket | null = null;
let tkn: string | null = null;

const useClient = (token: string): [SocketIOClient.Socket | null] => {
  if (tkn !== token && token !== null && client === null) {
    tkn = token;
    client = io('wss://dev.ws.hanged-man.potb.dev/rooms', {
      secure: true,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
        websocket: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    });
  }

  if (token === null && client !== null) {
    client.disconnect();
    client = null;
    tkn = null;
  }

  return [client];
};

export default useClient;
