import type { Routes } from './routes';

type Endpoint = keyof Routes;

type Filter<T, V = never> = {
  [K in keyof T as (T[K] extends V ? never & string : K)]: T[K]
};

type GroupedEndpoints = {
  [E in Endpoint as keyof Filter<Routes[E]>]: E
};

export type Method = keyof GroupedEndpoints;

export type EndpointsByMethod<M extends keyof GroupedEndpoints> = GroupedEndpoints[M];

export type PostEndpoints = Filter<EndpointsByMethod<'post'>>;

export type ResponseType<E extends Endpoint, M extends Method> = Routes[E][M]['response'];

export type ParametersType<E extends Endpoint, M extends Method> = Routes[E][M]['parameters'];
