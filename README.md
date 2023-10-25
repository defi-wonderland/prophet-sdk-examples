# prophet-sdk-examples

This repository contains a collection of scripts examples for interacting with Prophet smart contracts.

# Running

Set up the `RPC_URL` in the `.env` file, make sure the addresses in the `constants.ts` file are up to date, then run:

```bash
# Create requests with random modules and parameters
yarn scripts:create-requests ${NETWORK}

# Propose responses for the last 3 requests
yarn scripts:propose-responses ${NETWORK}

# Dispute the last 3 responses
yarn scripts:dispute-responses ${NETWORK}

# Finalize the last 3 requests
yarn scripts:finalize-requests ${NETWORK}
```

## Contributors

Prophet SDK was built with ❤️ by [Wonderland](https://defi.sucks).

Wonderland is a team of top Web3 researchers, developers, and operators who believe that the future needs to be open-source, permissionless, and decentralized.

[DeFi sucks](https://defi.sucks), but Wonderland is here to make it better.
