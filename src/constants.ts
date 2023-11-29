export const address = {
  ZERO: '0x0000000000000000000000000000000000000000',
  wallets: {
    DEPLOYER: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    ARBITRATOR: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    REQUESTER: '0x1498A6996b39e0a8265A4C8448DB731d5BF84032',
  },

  deployed: {
    ORACLE: '0x66ada61779038adb405b79f77e33d5ad64040691',
    ARBITRATOR_MODULE: '0xe8428fd4a4c19add00bbeb2fcad8520a3b7b4c1c',
    BONDED_DISPUTE_MODULE: '0x5435e1202bec0d84813dedacc4285a726ea1bc11',
    BONDED_RESPONSE_MODULE: '0x8db80260859504c00345787a3f0e40a18485fe30',
    BOND_ESCALATION_MODULE: '0x6d8c5b1fba2b39423b3368b2363212d4bc633d6c',
    CALLBACK_MODULE: '0xf1740db91c113347aa15948a05558c9d7eec1826',
    HTTP_REQUEST_MODULE: '0x91b4634aea060add0446a8b569bce71c49c51319',
    ACCOUNTING_EXTENSION: '0x04ca5ffe64f7e23bebfc1af987ddab5ddb287875',
  },

  whales: {
    ETH_WHALE: '0x4200000000000000000000000000000000000016',
    USDT_WHALE: '0xacd03d601e5bb1b275bb94076ff46ed9d753435a',
    WETH_WHALE: '0xdd06d01966688b4efbe18d789e8e1ddba7bc31f8',
    USDC_WHALE: '0xEbe80f029b1c02862B9E8a70a7e5317C06F62Cae',
  },

  erc20: {
    WETH: '0x4200000000000000000000000000000000000006',
    USDC: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  },
};

export const BOND_SIZE = 100;

export const IERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];
