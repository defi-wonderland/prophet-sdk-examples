import { BOND_SIZE, address } from '../constants';
import { ProphetSDK } from '@defi-wonderland/prophet-sdk/dist';
import { getAccountingExtension, getERC20Tokens, getSigner } from '../helpers';
import { ContractRunner } from 'ethers-v6';

/**
 * Dispute Response script
 *
 * The goal of this script is to raise disputes for the last response.
 *
 * Requirements:
 *  1. Fund the disputer wallet
 */

(async () => {
  const signer = await getSigner();
  const runner = signer as unknown as ContractRunner;

  // Instantiate the sdk with the oracle address
  const sdk = new ProphetSDK(runner, address.deployed.ORACLE);

  // Get the last request
  const requestCount = Number(await sdk.helpers.totalRequestCount());
  const request = (await sdk.helpers.listRequests(requestCount - 1, 1))[0];

  const accountingExtension = await getAccountingExtension();

  const responseId = (await sdk.helpers.getResponseIds(request.requestId))[0];

  const { usdt } = await getERC20Tokens();

  // Approve and deposit the bond
  await usdt.approve(await accountingExtension.getAddress(), BOND_SIZE);
  await accountingExtension.connect(runner)['deposit'](await usdt.getAddress(), BOND_SIZE);

  // Dispute the response using the sdk
  const transaction = await sdk.helpers.disputeResponse(request.requestId, responseId);
  console.log(transaction);
})();
