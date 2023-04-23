# @mild-ts/azure-rest-client

Opinionated TypeScript Utility Libraries [@mild-ts](https://github.com/mildronize/mild-ts)

[![CI](https://github.com/mild-ts/azure-rest-client/actions/workflows/main.yml/badge.svg)](https://github.com/mild-ts/azure-rest-client/actions/workflows/main.yml) [![](https://img.shields.io/npm/v/@mild-ts/azure-rest-client)](https://www.npmjs.com/package/@mild-ts/azure-rest-client)

## Installation
```
npm i @mild-ts/azure-rest-client
```

### Examples
```ts
import { AzureRestClient } from '@mild-ts/azure-rest-client';

async function main() {
  const client = new AzureRestClient();
  /**
   * https://learn.microsoft.com/en-us/rest/api/appservice/web-apps/get
   */
  const res = await client.request(
    'GET https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}?api-version=2022-03-01',
    {
      params: {
        subscriptionId: '29523625-6fa5-4d9a-86bc-da000544be7d',
        resourceGroupName: 'rg-thadaw-demo-multi-app',
        name: 'thadaw-demo-multi-app-ant',
      },
    }
  );
  console.log(res.status);
  console.log(res.data);
}

main();
```
