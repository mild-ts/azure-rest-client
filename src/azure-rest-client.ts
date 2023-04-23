import { RestClient, RestClientRequestConfig, replaceParams } from '@mild-ts/rest-client';
import type { Method, AxiosRequestConfig } from 'axios';
import { DefaultAzureCredential } from '@azure/identity';
import { AzureRestClientOptions } from './types';

/**
 * Azure REST API client
 *
 * @see https://docs.microsoft.com/en-us/rest/api/azure/
 * @note May duplicate with
 *  - https://www.npmjs.com/package/@azure-rest/core-client,
 *  - https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-client-rest
 *
 * @ref Inspired API design by GitHub REST API client
 */

export class AzureRestClient extends RestClient {
  private _credential: DefaultAzureCredential;
  private _scopes: string[];
  private _safeResponse: boolean;

  constructor(private _option?: AzureRestClientOptions) {
    super({
      ..._option,
    });
    this._credential = _option?.credential ?? new DefaultAzureCredential();
    this._scopes = _option?.scopes ?? ['https://management.azure.com/.default'];
    this._safeResponse = _option?.safeResponse ?? false;
  }

  private async _getToken() {
    const accessToken = await this._credential.getToken(this._scopes, this._option?.getTokenOptions);
    if (!accessToken) throw new Error('Cannot get token');
    return accessToken.token;
  }

  protected override async _parseRequest(
    method: Method,
    url: string,
    requestConfig: RestClientRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    const urlWithParams = replaceParams(url, requestConfig.params);
    if (this._safeResponse) {
      axiosConfig = {
        ...axiosConfig,
         /**
         * https://github.com/axios/axios/issues/41
         * Make non-200 HTTP Status not throw error
         */
      validateStatus: (status) => true,
      };
    }
    return await this._send(urlWithParams, method, {
      ...axiosConfig,
      headers: {
        Authorization: `Bearer ${await this._getToken()}`,
        ...axiosConfig?.headers,
      },
    });
  }

}
