import type { Routes } from './routes';

type Endpoint = keyof Routes;

export type GroupedEndpoints = {
  [E in Endpoint as Routes[E]['method']]: E
};

export type EndpointsByMethod<M extends keyof GroupedEndpoints> = GroupedEndpoints[M];

export type PostEndpoints = EndpointsByMethod<'post'>;

export type ResponseType<E extends Endpoint> = Routes[E]['response'];
