interface Environment {
  apiEndpoint: string;
  websocketEndpoint: string;
  hideLogBox: boolean
}

const devEnvironment: Environment = {
  apiEndpoint: 'https://dev.api.hanged-man.potb.dev',
  hideLogBox: false,
  websocketEndpoint: 'wss://dev.ws.hanged-man.potb.dev',
};

const prodEnvironment: Environment = {
  apiEndpoint: 'https://api.hanged-man.potb.dev',
  hideLogBox: false,
  websocketEndpoint: 'wss://ws.hanged-man.potb.dev',
};

const getEnvironment = (): Environment => (__DEV__ ? devEnvironment : prodEnvironment);

export default getEnvironment;
