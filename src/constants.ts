export const address = {
  ZERO: '0x0000000000000000000000000000000000000000',
  wallets: {
    DEPLOYER: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    ARBITRATOR: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    REQUESTER: '0x1498A6996b39e0a8265A4C8448DB731d5BF84032',
  },

  deployed: {
    ORACLE: '0x612a7ffee18d918f4f6e807ccb7ecadedfc22452',
    ARBITRATOR_MODULE: '0x11ca5437d5a77dc9c77040341996249f6b231eb4',
    BONDED_DISPUTE_MODULE: '0x9dee2732b45857423a85bf3f691ee529df2e7bda',
    BONDED_RESPONSE_MODULE: '0xb6dc6918f0f0c1004413e69b130d5011948b80ea',
    BOND_ESCALATION_MODULE: '0x32EEce76C2C2e8758584A83Ee2F522D4788feA0f',
    CALLBACK_MODULE: '0x557eb5e99f6ec16fd56595e371d6ee1164f1164a',
    HTTP_REQUEST_MODULE: '0xc759ac76623c0fad3809251807971e605fe68988',
    ACCOUNTING_EXTENSION: '0x3837dac4f73f45258a29293a9da15f81acb075bc',
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
