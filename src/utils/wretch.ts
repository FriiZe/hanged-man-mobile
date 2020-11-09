import wretch from 'wretch';

const myWretch = wretch('api.hanged.man')
  .headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

export default myWretch;
