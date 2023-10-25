export const address = {
  ZERO: '0x0000000000000000000000000000000000000000',
  wallets: {
    DEPLOYER: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    ARBITRATOR: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    REQUESTER: '0x1498A6996b39e0a8265A4C8448DB731d5BF84032',
  },

  deployed: {
    optimismGoerli: {
      ORACLE: '0xe40DED509A3806Eed8065b478BB681953bD9B554',
      ARBITRATOR_MODULE: '0x605Ce36fe8349546752c05489510f888809665F9',
      BONDED_DISPUTE_MODULE: '0x19d83482A85123D46399Bf6B5d8aF435424B4418',
      BONDED_RESPONSE_MODULE: '0x82e4dA51B5c62bBF8D274a0fB4d94f01C6F12244',
      BOND_ESCALATION_MODULE: '0x4174e93077305Bb19379D0870F6103b308e5db60',
      CALLBACK_MODULE: '0x5d5B6BCdB4FE8Ae3E1358C99A0232a6AF4b75c89',
      HTTP_REQUEST_MODULE: '0x4C05BFC84D62E8401c6a1B761101a16F808D98fe',
      CONTRACT_CALL_MODULE: '0xe4BDf45121df36E44De6cB81bCB2Fe7329E7BfB1',
      ERC20_RESOLUTION_MODULE: '0x3C5Ca94895A6e1b6aba8A7c753dCb71eCbE2bD9e',
      PRIVATE_ERC20_RESOLUTION_MODULE: '0x277605D2bF206664efa3C63f76206D193ce023df',
      BOND_ESCALATION_RESOLUTION_MODULE: '0xCc1eEC68dBC2Db36d892637A2e6a5AF469626F10',
      CIRCUIT_RESOLVER_MODULE: '0xB97781779a1eDAD0E1e8344C18CD30b61fa813f3',
      MULTIPLE_CALLBACKS_MODULE: '0xa0eCA5a3D68177BCb1b7B155eeBab848BD60b34b',
      ROOT_VERIFICATION_MODULE: '0x34Bea6F14b434C5C77Efc8AA0c30dB80535de3B3',
      SPARSE_MERKLE_TREE_REQUEST_MODULE: '0x030BB7960EAB293c288691245CBe9e2Efe1C6446',
      ACCOUNTING_EXTENSION: '0x57BfF2aF4ED481E50777Dd9f73f646baf145B055',
      BOND_ESCALATION_ACCOUNTING_EXTENSION: '0x1BF2141Ff3210125177898f2961bf8F5B793108d',
      SEQUENTIAL_RESOLUTION_MODULE: '0x8874b80bCE75884C041c41483f9b5BA026730eBa',
      MOCK_DISPUTE_MODULE: '0x3ac536EAA6D236D6434aF27EbE85904D430a23D5',
      MOCK_RESOLUTION_MODULE: '0x7bfF39C49c133e40be1E30A871A60c74B61303fa',
    },
    tenderly: {
      ORACLE: '0x612a7ffee18d918f4f6e807ccb7ecadedfc22452',
      ARBITRATOR_MODULE: '0x11ca5437d5a77dc9c77040341996249f6b231eb4',
      BONDED_DISPUTE_MODULE: '0x9dee2732b45857423a85bf3f691ee529df2e7bda',
      BONDED_RESPONSE_MODULE: '0xb6dc6918f0f0c1004413e69b130d5011948b80ea',
      BOND_ESCALATION_MODULE: '0x32EEce76C2C2e8758584A83Ee2F522D4788feA0f',
      CALLBACK_MODULE: '0x557eb5e99f6ec16fd56595e371d6ee1164f1164a',
      HTTP_REQUEST_MODULE: '0xc759ac76623c0fad3809251807971e605fe68988',
      ACCOUNTING_EXTENSION: '0x3837dac4f73f45258a29293a9da15f81acb075bc',
    },
    tenderlyOptimismGoerli: {
      ORACLE: '0x0fd302e4304858191cc167c963edb9647f9b69f8',
      ARBITRATOR_MODULE: '0x4492276e982b3a0AfEbb5b4d32694EdC09D9288D',
      BONDED_DISPUTE_MODULE: '0x07CebEFA6EE4a303166e7597832a6AFF130d4E2D',
      BONDED_RESPONSE_MODULE: '0x924251656d9a03676b2e53a9466272c3349ea131',
      BOND_ESCALATION_MODULE: '0xa8c561cdc5eac06ae70ecb00a14e59bc90952669',
      CALLBACK_MODULE: '0x69954ddc347f14d68f0fa3637f480bb5479d8449',
      HTTP_REQUEST_MODULE: '0x86571dd99e4b399fce7d980400be5cfc4e7393cb',
      CONTRACT_CALL_MODULE: '0xc9E8aB83388D9FB2A29c5e2CcBf6f4746828Fa76',
      ERC20_RESOLUTION_MODULE: '0x0807f8af57402752d7467178d2881a7d707f4f92',
      PRIVATE_ERC20_RESOLUTION_MODULE: '0x4Fd3736e637789562F683f2Bd501B9010Ca79Db8',
      BOND_ESCALATION_RESOLUTION_MODULE: '0x8d0a371b9a6b5fd877e41fd99daf580b998efd4f',
      MULTIPLE_CALLBACKS_MODULE: '0xf4E7B67905b180Af5BBc7fFeCA949fB06417e119',
      ROOT_VERIFICATION_MODULE: '0xD8452335A76EB6C7D976e7CF2A1DcD7d024Cb229',
      SPARSE_MERKLE_TREE_REQUEST_MODULE: '0x7cEEfE33329A70AE01f939D8d82053228E3C9F93',
      ACCOUNTING_EXTENSION: '0x9d7dd1bdde29fc812bd34bd263a7d70e3433d5ec',
      BOND_ESCALATION_ACCOUNTING_EXTENSION: '0x2528076F05aF25833567d6E6399EC99ab7906497',
      SEQUENTIAL_RESOLUTION_MODULE: '0x9d90a69E22FfEFB5b09D10C46e82bE47f8D24631',
    },
  },

  whales: {
    ETH_WHALE: '0x4200000000000000000000000000000000000016',
    USDT_WHALE: '0xacd03d601e5bb1b275bb94076ff46ed9d753435a',
    WETH_WHALE: '0xdd06d01966688b4efbe18d789e8e1ddba7bc31f8',
    USDC_WHALE: '0xEbe80f029b1c02862B9E8a70a7e5317C06F62Cae',
  },

  erc20: {
    optimism: {
      WETH: '0x4200000000000000000000000000000000000006',
      USDC: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    },
    optimismGoerli: {
      WETH: '0x8f4A10ad5fD508Dd363A5AF49718c0324bCCf34F',
      USDC: '0x5510C00D55cE5dc65EAad071f3668b5dDBf29aB9',
      USDT: '0x184b7dBC320d64467163F2F8F3f02E6f36766D9E',
    },
    tenderly: {
      WETH: '0x4200000000000000000000000000000000000006',
      USDC: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    },
    tenderlyOptimismGoerli: {
      USDT: '0x12e3d792bb023ba87b019256271caf547a3bdca5',
      WETH: '0x8f4A10ad5fD508Dd363A5AF49718c0324bCCf34F',
      USDC: '0x5510C00D55cE5dc65EAad071f3668b5dDBf29aB9',
    },
  },

  opUniv3Pools: {
    optimism: [
      '0x85149247691df622eaf1a8bd0cafd40bc45154a9', // WETH/USDC
      '0xf1f199342687a7d78bcc16fce79fa2665ef870e1', // USDC/USDT
      '0xc858a329bf053be78d6239c4a4343b8fbd21472b', // WETH/USDT
      '0x95d9d28606ee55de7667f0f176ebfc3215cfd9c0', // WETH/DAI
      '0xbf16ef186e715668aa29cef57e2fd7f9d48adfe6', // USDC/DAI
      '0x1c3140ab59d6caf9fa7459c6f83d4b52ba881d36', // OP/USDC
      '0xfc1f3296458f9b2a27a0b91dd7681c4020e09d05', // WETH/OP
      '0x702b283b06fa4e49ef155597945f2ba4b717e19c', // OP/DAI
      '0xad4c666fc170b468b19988959eb931a3676f0e9f', // WETH/UNI
      '0xd7ccc603a29fc9af6b25bae13b434e2f66f556aa', // WETH/MAI
    ],
    optimismGoerli: ['0x5510C00D55cE5dc65EAad071f3668b5dDBf29aB9'], // just a ERC20 contract for now
    tenderly: [
      '0x85149247691df622eaf1a8bd0cafd40bc45154a9', // WETH/USDC
      '0xf1f199342687a7d78bcc16fce79fa2665ef870e1', // USDC/USDT
      '0xc858a329bf053be78d6239c4a4343b8fbd21472b', // WETH/USDT
      '0x95d9d28606ee55de7667f0f176ebfc3215cfd9c0', // WETH/DAI
      '0xbf16ef186e715668aa29cef57e2fd7f9d48adfe6', // USDC/DAI
      '0x1c3140ab59d6caf9fa7459c6f83d4b52ba881d36', // OP/USDC
      '0xfc1f3296458f9b2a27a0b91dd7681c4020e09d05', // WETH/OP
      '0x702b283b06fa4e49ef155597945f2ba4b717e19c', // OP/DAI
      '0xad4c666fc170b468b19988959eb931a3676f0e9f', // WETH/UNI
      '0xd7ccc603a29fc9af6b25bae13b434e2f66f556aa', // WETH/MAI
    ],
    tenderlyOptimismGoerli: ['0x12e3d792bb023ba87b019256271caf547a3bdca5'], // just a ERC20 contract for now
  },
};

export const FINALIZE_SOON = true;

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
