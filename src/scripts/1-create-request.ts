import {
  getAccountingExtension,
  getDecodeRequestDataFunctionReturnTypes,
  getERC20Tokens,
  getRandomDeadline,
  getSigner,
} from '../helpers';
import { BOND_SIZE, address } from '../constants';
import { Module, ProphetSDK } from '@defi-wonderland/prophet-sdk/dist';
import { ModulesMap } from '@defi-wonderland/prophet-sdk/dist/types/Module';
import IHttpRequestModule from '@defi-wonderland/prophet-modules-abi/abi/IHttpRequestModule.json';
import IArbitratorModule from '@defi-wonderland/prophet-modules-abi/abi/IArbitratorModule.json';
import ICallbackModule from '@defi-wonderland/prophet-modules-abi/abi/ICallbackModule.json';
import IBondedResponseModule from '@defi-wonderland/prophet-modules-abi/abi/IBondedResponseModule.json';
import IBondedDisputeModule from '@defi-wonderland/prophet-modules-abi/abi/IBondedDisputeModule.json';

import { ethers } from 'ethers-v6';
import { IOracle } from '@defi-wonderland/prophet-sdk/dist/types/typechain';

import { ContractRunner } from 'ethers-v6';
import { getNetworkName } from '../utils';

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

  // The modules are defined to be used in the sdk as known modules
  const httpRequestModule = {
    module: new Module(address.deployed.HTTP_REQUEST_MODULE, IHttpRequestModule.abi, runner),
    abi: IHttpRequestModule.abi,
  };

  const bondedResponseModule = new Module(address.deployed.BONDED_RESPONSE_MODULE, IBondedResponseModule.abi, runner);

  const bondedDisputeModule = {
    module: new Module(address.deployed.BONDED_DISPUTE_MODULE, IBondedDisputeModule.abi, runner),
    abi: IBondedDisputeModule.abi,
  };

  const arbitratorModule = {
    module: new Module(address.deployed.ARBITRATOR_MODULE, IArbitratorModule.abi, runner),
    abi: IArbitratorModule.abi,
  };

  const callbackModule = {
    module: new Module(address.deployed.CALLBACK_MODULE, ICallbackModule.abi, runner),
    abi: ICallbackModule.abi,
  };

  const knownModules: ModulesMap = {
    [httpRequestModule.module.moduleAddress]: httpRequestModule.module,
    [address.deployed.BONDED_RESPONSE_MODULE]: bondedResponseModule,
    [bondedDisputeModule.module.moduleAddress]: bondedDisputeModule.module,
    [arbitratorModule.module.moduleAddress]: arbitratorModule.module,
    [callbackModule.module.moduleAddress]: callbackModule.module,
  };

  // The sdk is initialized with the runner, the oracle address and the known modules
  const sdk = new ProphetSDK(runner, address.deployed.ORACLE, knownModules);

  // usdt is going to be used as the bond token
  const { usdt } = await getERC20Tokens();
  const tokenAddress = await usdt.getAddress();

  const accountingExtension = await getAccountingExtension();
  const accountingExtensionAddress = await accountingExtension.getAddress();
  const deadline = getRandomDeadline();

  // Define the data to be sent for each module
  const requestModuleData = Object.values({
    url: 'https://jsonplaceholder.typicode.com/comments',
    body: 'postId=1',
    method: 0, // GET, see HttpRequestModule
    accountingExtension: address.deployed.ACCOUNTING_EXTENSION,
    paymentToken: tokenAddress,
    paymentAmount: BOND_SIZE,
  });

  const responseModuleData = Object.values({
    accountingExtension: address.deployed.ACCOUNTING_EXTENSION,
    bondToken: tokenAddress,
    bondSize: BOND_SIZE,
    deadline: deadline,
    disputeWindow: 5000,
  });

  const disputeModuleData = Object.values({
    accountingExtension: address.deployed.ACCOUNTING_EXTENSION,
    bondToken: tokenAddress,
    bondSize: BOND_SIZE,
  });

  const resolutionModuleData = [address.wallets.ARBITRATOR];

  accountingExtension.interface.encodeFunctionData('revokeModule', [address.deployed.CALLBACK_MODULE]); // drops the finality module

  const finalityModuleData = Object.values({
    target: address.deployed.ACCOUNTING_EXTENSION,
    data: accountingExtension.interface.encodeFunctionData('revokeModule', [address.deployed.CALLBACK_MODULE]), // drops the finality module
  });

  // Create the new request object
  const newRequest: IOracle.NewRequestStruct = {
    requestModuleData: ethers.AbiCoder.defaultAbiCoder().encode(
      getDecodeRequestDataFunctionReturnTypes(IHttpRequestModule.abi),
      [requestModuleData]
    ),
    responseModuleData: ethers.AbiCoder.defaultAbiCoder().encode(
      getDecodeRequestDataFunctionReturnTypes(IBondedResponseModule.abi),
      [responseModuleData]
    ),
    disputeModuleData: ethers.AbiCoder.defaultAbiCoder().encode(
      getDecodeRequestDataFunctionReturnTypes(IBondedDisputeModule.abi),
      [disputeModuleData]
    ),
    resolutionModuleData: ethers.AbiCoder.defaultAbiCoder().encode(
      getDecodeRequestDataFunctionReturnTypes(IArbitratorModule.abi),
      resolutionModuleData
    ),
    finalityModuleData: ethers.AbiCoder.defaultAbiCoder().encode(
      getDecodeRequestDataFunctionReturnTypes(ICallbackModule.abi),
      [finalityModuleData]
    ),
    ipfsHash: '0', // null hash because we are going to create a request without the metadata deployed yet and the sdk will deploy it for us
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
