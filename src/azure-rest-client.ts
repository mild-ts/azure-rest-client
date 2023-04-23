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
  private credential: DefaultAzureCredential;
  private scopes: string[];
  private safeResponse: boolean;

  constructor(private option?: AzureRestClientOptions) {
    super({
      ...option,
    });
    this.credential = option?.credential ?? new DefaultAzureCredential();
    this.scopes = option?.scopes ?? ['https://management.azure.com/.default'];
    this.safeResponse = option?.safeResponse ?? false;
  }

  private async getToken() {
    const accessToken = await this.credential.getToken(this.scopes, this.option?.getTokenOptions);
    if (!accessToken) throw new Error('Cannot get token');
    return accessToken.token;
  }

  protected override async parseRequest(
    method: Method,
    url: string,
    requestConfig: RestClientRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    const urlWithParams = replaceParams(url, requestConfig.params);
    if (this.safeResponse) {
      axiosConfig = {
        ...axiosConfig,
         /**
         * https://github.com/axios/axios/issues/41
         * Make non-200 HTTP Status not throw error
         */
      validateStatus: (status) => true,
      };
    }
    return await this.send(urlWithParams, method, {
      ...axiosConfig,
      headers: {
        Authorization: `Bearer ${await this.getToken()}`,
        ...axiosConfig?.headers,
      },
    });
  }

}
