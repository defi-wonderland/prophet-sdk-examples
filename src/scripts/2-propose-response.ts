import { BOND_SIZE, address } from '../constants';
import { ProphetSDK } from '@defi-wonderland/prophet-sdk/dist';
import { getAccountingExtension, getERC20Tokens, getSigner } from '../helpers';
import { ContractRunner, ethers } from 'ethers-v6';

/**
 * Propose Response script
 *
 * The goal of this script is to propose responses for the last request.
 *
 * Requirements:
 *  1. Fund the proposer wallet
 */

(async () => {
  const signer = await getSigner();
  const runner = signer as unknown as ContractRunner;

  // Instantiate the sdk with the oracle address
  const sdk = new ProphetSDK(runner, address.deployed.ORACLE);

  const requestCount = Number(await sdk.helpers.totalRequestCount());

  // Get the last request
  const request = (await sdk.helpers.listRequests(requestCount - 1, 1))[0];

  const accountingExtension = await getAccountingExtension();
  const { usdt } = await getERC20Tokens();

  // Approve and deposit the bond
  await usdt.approve(await accountingExtension.getAddress(), BOND_SIZE);
  await accountingExtension.connect(runner)['deposit'](await usdt.getAddress(), BOND_SIZE);

  const coder = ethers.AbiCoder.defaultAbiCoder();
  // The response type is string, so we encode the response data as string
  const responseData = coder.encode(['string'], ['test response data']);

  // Propose the response using the sdk
  const result = await sdk.helpers.proposeResponse(request.requestId, responseData);

  console.log(result);
})();
