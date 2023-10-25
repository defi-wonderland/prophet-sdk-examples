import { sendUnsignedTx, ethToWei } from '../utils';
import { address } from '../constants';
import { ethers } from 'hardhat';
import { getERC20Tokens } from '../helpers';

/**
 * Fund Wallets script
 *
 * The goal of this script is to provide the main signer with the funds needed to run the scripts.
 *
 * Requirements:
 *  1. Update the addresses of the whales in `constants.ts`
 */

(async () => {
  const [signer] = await ethers.getSigners();

  // Change the receiver if you want to fund a different address
  const receiverAddress = signer.address;
  const { usdt } = await getERC20Tokens();

  console.log(`Address to fund: ${receiverAddress}`);
  console.log(`Funding receiver: ${receiverAddress} with whale ${address.whales.USDT_WHALE} with USDT`);

  await sendUnsignedTx({
    from: address.whales.ETH_WHALE,
    to: address.whales.USDT_WHALE,
    value: ethToWei(1),
  });

  const printBalance = async (moment: string) =>
    console.log(`USDT balance ${moment} ${await usdt.balanceOf(receiverAddress)}`);

  printBalance('before');
  await sendUnsignedTx({
    from: address.whales.USDT_WHALE,
    to: await usdt.getAddress(),
    data: (await usdt['transfer'](receiverAddress, 10_0000)).data,
  });

  printBalance('after');
})();
