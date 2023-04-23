# @mild-ts/azure-rest-client

Azure Rest Client Helper for TypeScript extended from [@mild-ts/rest-client](https://github.com/mild-ts/rest-client), support [Azure Credential](#authentication) by default.

[![CI](https://github.com/mild-ts/azure-rest-client/actions/workflows/main.yml/badge.svg)](https://github.com/mild-ts/azure-rest-client/actions/workflows/main.yml) [![](https://img.shields.io/npm/v/@mild-ts/azure-rest-client)](https://www.npmjs.com/package/@mild-ts/azure-rest-client)

## Installation
```
npm i @mild-ts/azure-rest-client
```

## Examples
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

# Documentation

## Authentication

This package use `DefaultAzureCredential` from `@azure/identity`. The following credential types will be tried, in order:

1. Environment Credential: This method uses environment variables to authenticate. You would need to set the `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, and `AZURE_CLIENT_SECRET` environment variables with your Azure tenant ID, client ID, and client secret, respectively.

2. Managed Identity Credential: This method uses a managed identity to authenticate. If you're running your code in Azure, you can enable managed identity for your app and use it to authenticate.

3. Azure CLI Credential: This method uses the Azure CLI to authenticate. You would need to install the Azure CLI on your machine and run az login to authenticate.

4. Azure PowerShell Credential: This method uses Azure PowerShell to authenticate. You would need to install Azure PowerShell on your machine and run Connect-AzAccount to authenticate.

You can read more [Azure Identity client library for JavaScript](https://learn.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest).

Every request sent by `AzureRestClient` will be added `Authentication` header getting from the `DefaultAzureCredential`.

### Environment Credential

1. Open the Azure CLI and log in to your Azure account using the az login command.
2. Run the following command to create a new service principal and assign it a role:

    ```bash
    az ad sp create-for-rbac --name <SERVICE_PRINCIPAL_NAME> --role <ROLE_NAME>
    ```

    Replace `<SERVICE_PRINCIPAL_NAME>` with a name for your service principal and `<ROLE_NAME>` with the name of the Azure role you want to assign to the service principal. For example, if you want to assign the "Contributor" ro  le, you can use `--role Contributor`.

3. The command will output the following information:

    ```json
    {
      "appId": "<CLIENT_ID>",
      "displayName": "<SERVICE_PRINCIPAL_NAME>",
      "name": "<SERVICE_PRINCIPAL_NAME>",
      "password": "<CLIENT_SECRET>",
      "tenant": "<TENANT_ID>"
    }
    ```

    Note down the values of <CLIENT_ID>, <CLIENT_SECRET>, and <TENANT_ID> - you will need these for authentication later.

You can now use the client ID, client secret, and tenant ID to authenticate with Azure. For example, you can use them to create a `DefaultAzureCredential` object in your code.