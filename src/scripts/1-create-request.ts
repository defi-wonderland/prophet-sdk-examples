import { getAccountingExtension, getERC20Tokens, generateDeadline, getSigner } from '../helpers';
import { BOND_SIZE, address } from '../constants';
import { Module, ModulesMap, ProphetSDK } from '@defi-wonderland/prophet-sdk/dist/src';
import IHttpRequestModule from '@defi-wonderland/prophet-modules-abi/abi/IHttpRequestModule.json';
import IArbitratorModule from '@defi-wonderland/prophet-modules-abi/abi/IArbitratorModule.json';
import ICallbackModule from '@defi-wonderland/prophet-modules-abi/abi/ICallbackModule.json';
import IBondedResponseModule from '@defi-wonderland/prophet-modules-abi/abi/IBondedResponseModule.json';
import IBondedDisputeModule from '@defi-wonderland/prophet-modules-abi/abi/IBondedDisputeModule.json';

import { ContractRunner } from 'ethers-v6';
import { getNetworkName } from '../utils';
import { IOracle } from '@defi-wonderland/prophet-sdk/dist/src/types/typechain';

/**
 * Create Request script
 *
 * The goal of this script is to create a request using the sdk
 *
 * Requirements:
 *  1. Deploy the Prophet modules you want to use to your preferred fork
 *  2. Update the addresses of the oracle and the modules in `constants.ts`
 *  3. Fund the requester wallet
 *  4. Approve the modules running the `approve-modules.ts` script (only needed once)
 */
(async () => {
  const signer = await getSigner();
  console.log(`current signer: ${signer.address}`);
  console.log(`current network: ${getNetworkName()}`);

  const runner = signer as unknown as ContractRunner;

  const requestModule = new Module(address.deployed.HTTP_REQUEST_MODULE, IHttpRequestModule.abi, runner);

  const responseModule = new Module(address.deployed.BONDED_RESPONSE_MODULE, IBondedResponseModule.abi, runner);

  const disputeModule = new Module(address.deployed.BONDED_DISPUTE_MODULE, IBondedDisputeModule.abi, runner);

  const resolutionModule = new Module(address.deployed.ARBITRATOR_MODULE, IArbitratorModule.abi, runner);

  const finalityModule = new Module(address.deployed.CALLBACK_MODULE, ICallbackModule.abi, runner);

  const knownModules: ModulesMap = {
    [address.deployed.HTTP_REQUEST_MODULE]: requestModule,
    [address.deployed.BONDED_RESPONSE_MODULE]: responseModule,
    [address.deployed.BONDED_DISPUTE_MODULE]: disputeModule,
    [address.deployed.ARBITRATOR_MODULE]: resolutionModule,
    [address.deployed.CALLBACK_MODULE]: finalityModule,
  };

  // The sdk is initialized with the runner, the oracle address and the known modules
  const sdk = new ProphetSDK(runner, address.deployed.ORACLE, knownModules);

  // usdt is going to be used as the bond token
  const { usdt } = await getERC20Tokens();
  const tokenAddress = await usdt.getAddress();

  const accountingExtension = await getAccountingExtension();
  const accountingExtensionAddress = await accountingExtension.getAddress();
  const deadline = generateDeadline();

  // Set the data for the new request
  const totalRequestCount = Number(await sdk.helpers.totalRequestCount());
  const newRequest: IOracle.RequestStruct = {
    nonce: totalRequestCount,
    requester: signer.address,
    requestModule: requestModule.moduleAddress,
    responseModule: responseModule.moduleAddress,
    disputeModule: disputeModule.moduleAddress,
    resolutionModule: resolutionModule.moduleAddress,
    finalityModule: finalityModule.moduleAddress,
    requestModuleData: await sdk.modules.encodeRequestData(requestModule.moduleAddress, [
      'https://jsonplaceholder.typicode.com/comments',
      'postId=1',
      0, // GET, see HttpRequestModule
      address.deployed.ACCOUNTING_EXTENSION,
      tokenAddress,
      BOND_SIZE,
    ]),
    responseModuleData: await sdk.modules.encodeRequestData(responseModule.moduleAddress, [
      address.deployed.ACCOUNTING_EXTENSION,
      tokenAddress,
      BOND_SIZE,
      deadline,
      5000,
    ]),
    disputeModuleData: await sdk.modules.encodeRequestData(disputeModule.moduleAddress, [
      address.deployed.ACCOUNTING_EXTENSION,
      tokenAddress,
      BOND_SIZE,
    ]),
    resolutionModuleData: await sdk.modules.encodeRequestData(resolutionModule.moduleAddress, [
      address.wallets.ARBITRATOR,
    ]),
    finalityModuleData: await sdk.modules.encodeRequestData(finalityModule.moduleAddress, [
      address.deployed.ACCOUNTING_EXTENSION,
      accountingExtension.interface.encodeFunctionData('revokeModule', [address.deployed.CALLBACK_MODULE]), // drops the finality module
    ]),
  };

  const reward = BOND_SIZE;

  // The metadata is defined for the response type and the description of the request
  const metadata = {
    responseType: 'string',
    description: 'test description',
    returnedTypes: null, // not needed
  };

  // Approve the accounting extension to spend the expected reward
  console.log(await usdt.connect(runner)['approve'](accountingExtensionAddress, reward));
  // Deposit the expected reward into the accounting extension
  console.log(await accountingExtension.connect(runner)['deposit'](tokenAddress, reward));

  // Create the request
  const result = await sdk.helpers.createRequest(newRequest, metadata);
  console.log(result);
})();
