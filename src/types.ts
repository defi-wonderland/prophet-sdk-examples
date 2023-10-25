import BigNumber from 'bignumber.js';
import MerkleTree from 'merkletreejs';
import { Module } from '@defi-wonderland/prophet-sdk/dist';

export interface UnsignedTx {
  from: Address;
  to: Address;
  value?: BigNumber;
  data?: string;
}

export type Address = string;

export type INewRequestData = {
  requestModuleData: any;
  responseModuleData: any;
  disputeModuleData: any;
  resolutionModuleData: any;
  finalityModuleData: any;
  ipfsHash: any;
};

export type ModuleAddressAndAbi = {
  address: string;
  abi: any[];
};

export type ModuleAndAbi = {
  module: Module;
  abi: any[];
};

export type MerkleTreeWithData = {
  tree: MerkleTree;
  treeData: any;
};

export interface IMerkleNode {
  position: 'left' | 'right';
  data: Buffer;
}
