import { getAccountingExtension, getERC20Tokens, generateDeadline, getSigner } from '../helpers';
import { BOND_SIZE, address } from '../constants';
import { ProphetSDK } from '@defi-wonderland/prophet-sdk/dist';
import IHttpRequestModule from '@defi-wonderland/prophet-modules-abi/abi/IHttpRequestModule.json';
import IArbitratorModule from '@defi-wonderland/prophet-modules-abi/abi/IArbitratorModule.json';
import ICallbackModule from '@defi-wonderland/prophet-modules-abi/abi/ICallbackModule.json';
import IBondedResponseModule from '@defi-wonderland/prophet-modules-abi/abi/IBondedResponseModule.json';
import IBondedDisputeModule from '@defi-wonderland/prophet-modules-abi/abi/IBondedDisputeModule.json';

import { ContractRunner } from 'ethers-v6';
import { getNetworkName } from '../utils';
import { RequestData } from '@defi-wonderland/prophet-sdk/dist/types/types';

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

  const knownModules = [
    { address: address.deployed.HTTP_REQUEST_MODULE, abi: IHttpRequestModule.abi },
    { address: address.deployed.BONDED_RESPONSE_MODULE, abi: IBondedResponseModule.abi },
    { address: address.deployed.BONDED_DISPUTE_MODULE, abi: IBondedDisputeModule.abi },
    { address: address.deployed.ARBITRATOR_MODULE, abi: IArbitratorModule.abi },
    { address: address.deployed.CALLBACK_MODULE, abi: ICallbackModule.abi },
  ];

  // The sdk is initialized with the runner, the oracle address and the known modules
  const sdk = new ProphetSDK(runner, address.deployed.ORACLE, knownModules);

  // usdt is going to be used as the bond token
  const { usdt } = await getERC20Tokens();
  const tokenAddress = await usdt.getAddress();

  const accountingExtension = await getAccountingExtension();
  const accountingExtensionAddress = await accountingExtension.getAddress();
  const deadline = generateDeadline();

  // Set the data for the new request
  const newRequest: RequestData = {
    requestModuleData: {
      url: 'https://jsonplaceholder.typicode.com/comments',
      body: 'postId=1',
      method: 0, // GET, see HttpRequestModule
      accountingExtension: address.deployed.ACCOUNTING_EXTENSION,
      paymentToken: tokenAddress,
      paymentAmount: BOND_SIZE,
    },
    responseModuleData: {
      accountingExtension: address.deployed.ACCOUNTING_EXTENSION,
      bondToken: tokenAddress,
      bondSize: BOND_SIZE,
      deadline: deadline,
      disputeWindow: 5000,
    },
    disputeModuleData: {
      accountingExtension: address.deployed.ACCOUNTING_EXTENSION,
      bondToken: tokenAddress,
      bondSize: BOND_SIZE,
    },
    resolutionModuleData: address.wallets.ARBITRATOR,
    finalityModuleData: {
      target: address.deployed.ACCOUNTING_EXTENSION,
      data: accountingExtension.interface.encodeFunctionData('revokeModule', [address.deployed.CALLBACK_MODULE]), // drops the finality module
    },
    requestModule: address.deployed.HTTP_REQUEST_MODULE,
    responseModule: address.deployed.BONDED_RESPONSE_MODULE,
    disputeModule: address.deployed.BONDED_DISPUTE_MODULE,
    resolutionModule: address.deployed.ARBITRATOR_MODULE,
    finalityModule: address.deployed.CALLBACK_MODULE,
  };

  console.log('New request to be created: ', newRequest);

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
