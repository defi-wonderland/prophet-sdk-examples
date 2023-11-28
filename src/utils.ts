import { JsonRpcSigner } from '@ethersproject/providers';
import { UnsignedTx } from './types';
import BigNumber from 'bignumber.js';
import hre from 'hardhat';

export const toUnit = (value: number): string => {
  const ONE_UNIT = new BigNumber(10).pow(18);
  return new BigNumber(value).div(ONE_UNIT).toString();
};

export const ethToWei = (amount: number): BigNumber => {
  const ONE_UNIT = new BigNumber(10).pow(18);
  return new BigNumber(amount).times(ONE_UNIT);
};

export const impersonate = async (address: string): Promise<JsonRpcSigner> => {
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
  return hre.ethers.provider.getSigner(address);
};

export const sendUnsignedTx = async ({ from, to, value, data }: UnsignedTx): Promise<any> => {
  if (hre.network.name === 'localhost' || hre.network.name === 'local') await impersonate(from);

  return await hre.network.provider.send('eth_sendTransaction', [
    {
      from,
      to,
      value: value ? '0x' + value.toString(16) : undefined,
      data,
    },
  ]);
};

export const getNetworkName = (): string => {
  return hre.network.name;
};
