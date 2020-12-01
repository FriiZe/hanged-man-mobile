import io from 'socket.io-client';

let clientByNamespace: Record<string, SocketIOClient.Socket> = {};

const useClient = (token: string | null, namespace: string): [SocketIOClient.Socket | null] => {
  if (!clientByNamespace[namespace] && token !== null) {
    const client = io(`wss://dev.ws.hanged-man.potb.dev/${namespace}`, {
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
    clientByNamespace[namespace] = client;
  }

  if (token === null && clientByNamespace !== {}) {
    Object.keys(clientByNamespace).forEach((key) => {
      clientByNamespace[key].disconnect();
    });
    clientByNamespace = {};
  }

  return [clientByNamespace[namespace]];
};

export default useClient;
