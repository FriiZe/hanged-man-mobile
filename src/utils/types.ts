import type { EventArg } from '@react-navigation/native';

export type BeforeRemoveEvent = EventArg<'beforeRemove', true, {
  action: Readonly<{
    type: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    payload?: object;
    source?: string;
    target?: string;
  }>
}>;
