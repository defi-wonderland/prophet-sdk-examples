import { address } from '../constants';
import { ProphetSDK } from '@defi-wonderland/prophet-sdk/dist';
import { ContractRunner } from 'ethers-v6';
import { getSigner } from '../helpers';
import { getNetworkName } from '../utils';

/**
 * Finalize Requests script
 *
 * The goal of this script is to finalize te last request.
 *
 * Requirements:
 *  1. Run the Create Requests and the propose Responses scripts, setthe FINALIZE_SOON constant to true, so it can be finalized once the dispute period is over
 */

(async () => {
  const signer = (await getSigner()) as unknown as ContractRunner;

  // Instantiate the sdk with the oracle address
  const sdk = new ProphetSDK(signer, address.deployed[getNetworkName()].ORACLE);

  // Get the last request
  const requestCount = Number(await sdk.helpers.totalRequestCount());
  const request = (await sdk.helpers.listRequests(requestCount - 1, 1))[0];

  const responseId = (await sdk.helpers.getResponseIds(request.requestId))[0];

  // Finalize the request using the sdk
  const result = await sdk.helpers.finalize(request.requestId, responseId);

  console.log(result);
})();
