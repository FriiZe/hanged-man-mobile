/* eslint-disable import/prefer-default-export */
import WrappedFetch from './WrappedFetch';

export const fetcher = (url: string): WrappedFetch => new WrappedFetch(url);
