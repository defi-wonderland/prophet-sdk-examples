import { faker } from '@faker-js/faker';
import { MerkleTree } from 'merkletreejs';
import { IMerkleNode } from './types';
import { Contract, ContractRunner, ethers } from 'ethers-v6';
import { ethers as ethersHardhat } from 'hardhat';
import { IERC20_ABI, address } from './constants';
import IAccountingExtension from '@defi-wonderland/prophet-modules-abi/abi/IAccountingExtension.json';
import { getNetworkName } from './utils';

export const getSigner = async () => {
  const [signer] = await ethersHardhat.getSigners();

  return signer;
};

export const getDecodeRequestDataFunctionReturnTypes = (abi: any[]) => {
  const decodeRequestDataFunction = abi.find((item) => item.name === 'decodeRequestData').outputs;
  return decodeRequestDataFunction;
};

export const getRandomDeadline = () => {
  return faker.number.int({ min: getCurrentEpochInSeconds(), max: epochInOneYear() });
};

export const getRandomTimeUntilDeadline = () => {
  return getRandomDeadline() - getCurrentEpochInSeconds();
};

export const getCurrentEpochInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

const epochInOneYear = () => {
  const currentDate: Date = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  return Math.floor(currentDate.getTime() / 1000);
};

export const generateRandomMerkleTree = (leavesAmount: number) => {
  const SHA256 = require('crypto-js/sha256');
  const unHashedArray = Array.from({ length: leavesAmount }, () => faker.string.alpha({ length: 1 }));
  const leaves = unHashedArray.map((x) => SHA256(x));
  const tree = new MerkleTree(leaves, SHA256);

  const treeCount = 1;
  const treeBranches = convertToBytes32(tree.getProofs() as IMerkleNode[][]);

  // sending only the first merkle proof array
  const treeData = ethers.AbiCoder.defaultAbiCoder().encode(['bytes32[]', 'uint256'], [treeBranches[0], treeCount]);
  return {
    tree,
    treeData,
  };
};

function convertToBytes32(dataArray: IMerkleNode[][]): string[][] {
  return dataArray.map((subArray) =>
    subArray.map((item) => {
      // Convert the buffer data to a hexadecimal string without the '0x' prefix.
      let hexString = item.data.toString('hex');

      // Ensure the hex string is of length 64.
      if (hexString.length < 64) {
        hexString = hexString.padStart(64, '0'); // Using padStart to add zeros to the beginning, not the end.
      } else if (hexString.length > 64) {
        throw new Error('Data is too long for bytes32');
      }

      // Add '0x' prefix
      return '0x' + hexString;
    })
  );
}

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
  const accountingExtension = new Contract(
    address.deployed[getNetworkName()].ACCOUNTING_EXTENSION,
    IAccountingExtension.abi,
    runner
  );

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

  const weth = new Contract(address.erc20[getNetworkName()].WETH, IERC20_ABI, runner);
  const usdc = new Contract(address.erc20[getNetworkName()].USDC, IERC20_ABI, runner);
  const usdt = new Contract(address.erc20[getNetworkName()].USDT, IERC20_ABI, runner);

  return {
    usdc,
    usdt,
    weth,
  };
};
