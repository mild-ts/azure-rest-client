import { DefaultAzureCredential, GetTokenOptions } from '@azure/identity';
import { RestClientAxiosConfigs } from '@mild-ts/rest-client';

export interface AzureRestClientOptions extends RestClientAxiosConfigs {
  /**
   * DefaultAzureCredential instance
   */
  credential?: DefaultAzureCredential;
  /**
   * DefaultAzureCredential.GetToken scopes
   */
  scopes?: string[];
  /**
   * DefaultAzureCredential.getTokenOptions GetTokenOptions
   */
  getTokenOptions?: GetTokenOptions;
  /**
   * Not throw error when response status is not 200, This will automactically set `validateStatus` option in `AxiosRequestConfig` to be `(status) => true`
   *
   * To handle response status code manually, please use `validateStatus` option in `AxiosRequestConfig`
   *
   * @default false
   */
  safeResponse?: boolean;
}
