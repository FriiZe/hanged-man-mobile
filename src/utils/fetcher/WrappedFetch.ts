/* eslint-disable no-underscore-dangle */
import type { Routes } from './routes';
import type {
  EndpointsByMethod, GroupedEndpoints, PostEndpoints, ResponseType,
} from './types';

class WrappedFetch {
  private _headers: Record<string, string> = {};

  private _catchers: Record<number, () => void> = {};

  private _defaultCatcher: () => void = () => {};

  public constructor(
    private readonly url: string,
  ) {}

  public headers(headers: Record<string, string>): WrappedFetch {
    this._headers = headers;
    return this;
  }

  public catcher(error: number, handler: () => void): WrappedFetch {
    this._catchers[error] = handler;
    return this;
  }

  public defaultCatcher(handler: () => void): WrappedFetch {
    this._defaultCatcher = handler;
    return this;
  }

  public async post<E extends PostEndpoints = PostEndpoints>(
    endpoint: E
  ): Promise<ResponseType<E>>;

  public async post<E extends PostEndpoints = PostEndpoints>(
    endpoint: E,
    options: Routes[E]['parameters'],
  ): Promise<ResponseType<E>>;

  public async post<E extends PostEndpoints = PostEndpoints>(
    endpoint: E,
    options?: Routes[E]['parameters'],
  ): Promise<ResponseType<E>> {
    const body = (options?.body !== undefined) ? JSON.stringify(options.body) : null;
    const response = await fetch(`${this.url}${endpoint}`, { body, headers: this._headers, method: 'post' });

    await this.handleError(response);

    return WrappedFetch.unwrapResponse(response);
  }

  private async handleError(response: Response): Promise<void> {
    if (response.status >= 400) {
      const handler = this._catchers[response.status] ?? this._defaultCatcher;
      handler();
      throw new Error(JSON.stringify(await response.json()));
    }
  }

  private static async unwrapResponse<E extends EndpointsByMethod<keyof GroupedEndpoints>>(
    response: Response,
  ): Promise<ResponseType<E>> {
    try {
      return await response.json() as unknown as ResponseType<E>;
    } catch (err) {
      return Promise.resolve();
    }
  }
}

export default WrappedFetch;
