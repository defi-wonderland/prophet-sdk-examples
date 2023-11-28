import { defineConfig } from '@dethcrypto/eth-sdk';

export default defineConfig({
  etherscanKey: process.env.OPTIMISM_KEY,
  contracts: {
    optimism: {
      usdc: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      weth: '0x4200000000000000000000000000000000000006',
      usdt: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    },
  },
});
