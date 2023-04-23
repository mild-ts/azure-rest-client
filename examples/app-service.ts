import axios from 'axios';
import { AzureRestClient } from '../src/main';

async function main() {
  const client = new AzureRestClient();
  try {
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
  } catch(e){
    console.log(`Error:`);
    if(axios.isAxiosError(e)){
      console.error(e.response?.status, e.response?.data);
    } else if(e instanceof Error)
      console.error(e.message);
    else {
      console.error(e);
    }
  }
  
}

main();
