import { Contract, ContractRunner, ethers } from 'ethers-v6';
import { ethers as ethersHardhat } from 'hardhat';
import { IERC20_ABI, address } from './constants';
import IAccountingExtension from '@defi-wonderland/prophet-modules-abi/abi/IAccountingExtension.json';

export const getSigner = async () => {
  const [signer] = await ethersHardhat.getSigners();

  return signer;
};

export const getDecodeRequestDataFunctionReturnTypes = (abi: any[]) => {
  const decodeRequestDataFunction = abi.find((item) => item.name === 'decodeRequestData').outputs;
  return decodeRequestDataFunction;
};

export const generateDeadline = () => {
  return getCurrentEpochInSeconds() + 60;
};
export const getCurrentEpochInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export function convertBufferArrayToBytes32(dataArray: Buffer[]): string[] {
  return dataArray.map((buffer) => {
    if (buffer.length > 32) {
      throw new Error('Data is too long for bytes32');
    }

    // Create a new buffer of 32 bytes initialized with zeros.
    const bytes32Buffer = Buffer.alloc(32);

    // Copy the data into the new buffer.
    buffer.copy(bytes32Buffer, 32 - buffer.length);

    // Convert the buffer to a hexadecimal string with '0x' prefix.
    return '0x' + bytes32Buffer.toString('hex');
  });
}

export const getAccountingExtension = async () => {
  const runner = (await getSigner()) as unknown as ContractRunner;
  const accountingExtension = new Contract(address.deployed.ACCOUNTING_EXTENSION, IAccountingExtension.abi, runner);

  return accountingExtension;
};

export const getTokenContract = async (tokenAddress: string) => {
  const { usdc, usdt, weth } = await getERC20Tokens();
  console.log('token address: ', tokenAddress);

  const usdcAddres = (await usdc.getAddress()).toUpperCase();
  const usdtAddress = (await usdt.getAddress()).toUpperCase();
  const wethAddress = (await weth.getAddress()).toUpperCase();
  switch (tokenAddress.toUpperCase()) {
    case usdcAddres:
      return usdc;
    case usdtAddress:
      return usdt;
    case wethAddress:
      return weth;
    default:
      throw new Error('Invalid token address');
  }
};

export const getERC20Tokens = async () => {
  const runner = (await getSigner()) as unknown as ContractRunner;

  const weth = new Contract(address.erc20.WETH, IERC20_ABI, runner);
  const usdc = new Contract(address.erc20.USDC, IERC20_ABI, runner);
  const usdt = new Contract(address.erc20.USDT, IERC20_ABI, runner);

  return {
    usdc,
    usdt,
    weth,
  };
};
