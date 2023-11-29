import { BOND_SIZE, address } from '../constants';
import { ProphetSDK } from '@defi-wonderland/prophet-sdk/dist/src';
import { getAccountingExtension, getERC20Tokens, getSigner } from '../helpers';
import { ContractRunner } from 'ethers-v6';
import { IOracle } from '@defi-wonderland/prophet-sdk/dist/src/types/typechain';

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
  const sdk = new ProphetSDK(runner, address.deployed.ORACLE, {});

  // Get the last request
  const requestCount = Number(await sdk.helpers.totalRequestCount());
  const requestId = (await sdk.helpers.listRequestIds(requestCount - 1, 1))[0];

  const accountingExtension = await getAccountingExtension();

  const responseId = (await sdk.helpers.getResponseIds(requestId))[0];

  const requestWithId = await sdk.helpers.getRequest(requestId);
  const responseWithId = await sdk.helpers.getResponse(responseId);
  const dispute: IOracle.DisputeStruct = {
    disputer: signer.address,
    proposer: signer.address,
    responseId: responseWithId.responseId,
    requestId: requestWithId.requestId,
  };


  const { usdt } = await getERC20Tokens();

  // Approve and deposit the bond
  await usdt.approve(await accountingExtension.getAddress(), BOND_SIZE);
  await accountingExtension.connect(runner)['deposit'](await usdt.getAddress(), BOND_SIZE);

  // Dispute the response using the sdk
  const transaction = await sdk.helpers.disputeResponse(requestWithId.request, responseWithId.response, dispute);
  console.log(transaction);
})();
