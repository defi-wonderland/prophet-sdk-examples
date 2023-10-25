import { ContractRunner } from 'ethers-v6';
import { address } from '../constants';
import { getAccountingExtension, getSigner } from '../helpers';
import { getNetworkName } from '../utils';

/**
 * Approve modules script
 *
 * The goal of this script is to approve all the modules in the Accounting Extension.
 *
 */
(async () => {
  const runner = (await getSigner()) as unknown as ContractRunner;
  const accountingExtension = await getAccountingExtension();

  for (const module of Object.values(address.deployed[getNetworkName()])) {
    console.log(await accountingExtension.connect(runner)['approveModule'](module));
  }
})();
