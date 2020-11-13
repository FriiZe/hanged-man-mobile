import type { AuthEndpoint, AuthRoutes } from './auth';

type FullAuthRoutes = {
  [R in keyof AuthRoutes & string as `${AuthEndpoint}${R}`]: AuthRoutes[R];
};

type Routes = FullAuthRoutes;

export type { Routes };
