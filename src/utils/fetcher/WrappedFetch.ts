/* eslint-disable no-underscore-dangle */
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

  public async get<T>(route: string): Promise<T> {
    const response = await fetch(route, { method: 'get' });

    await this.handleError(response);

    return WrappedFetch.unwrapResponse(response);
  }

  public async post<T = void, B = Record<string, unknown>>(route: string, body?: B): Promise<T> {
    const response = await fetch(route, { body: JSON.stringify(body), method: 'post' });

    await this.handleError(response);

    return WrappedFetch.unwrapResponse(response);
  }

  public async patch<T = void, B = Record<string, unknown>>(route: string, body: B): Promise<T> {
    const response = await fetch(route, { body: JSON.stringify(body), method: 'patch' });

    await this.handleError(response);

    return WrappedFetch.unwrapResponse(response);
  }

  public async delete(route: string): Promise<void> {
    const response = await fetch(route, { method: 'delete' });

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

  private static async unwrapResponse<T = void>(response: Response): Promise<T> {
    try {
      return await response.json() as unknown as T;
    } catch (err) {
      return Promise.resolve() as unknown as T;
    }
  }
}

export default WrappedFetch;
