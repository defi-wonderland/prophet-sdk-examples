import { address } from '../constants';
import { ProphetSDK } from '@defi-wonderland/prophet-sdk/dist/src';
import { ContractRunner } from 'ethers-v6';
import { getSigner } from '../helpers';

/**
 * Finalize Request script
 *
 * The goal of this script is to finalize te last request.
 *
 * Requirements:
 *  1. Run the Create Request and the propose Response scripts, setthe FINALIZE_SOON constant to true, so it can be finalized once the dispute period is over
 */

(async () => {
  const signer = (await getSigner()) as unknown as ContractRunner;

  // Instantiate the sdk with the oracle address
  const sdk = new ProphetSDK(signer, address.deployed.ORACLE, {});

  // Get the last request
  const requestCount = Number(await sdk.helpers.totalRequestCount());
  const requestId = (await sdk.helpers.listRequestIds(requestCount - 1, 1))[0];
  const responseId = (await sdk.helpers.getResponseIds(requestId))[0];

  const requestWithId = await sdk.helpers.getRequest(requestId);
  const responseWithId = await sdk.helpers.getResponse(responseId);

  // Finalize the request using the sdk
  const result = await sdk.helpers.finalize(requestWithId.request, responseWithId.response);

  console.log(result);
})();
