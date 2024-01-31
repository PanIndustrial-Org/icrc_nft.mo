# icrc_nft.mo

## Prerequisites

-   mops
-   dfx 0.15.1

## Test

-   run `npm run test`

## Deployment

-   `dfx start --clean --background`
-   `./deploy.sh`

The simplest deployment is to provide null arguments to each ICRC(3,7,30) component.

```
dfx deploy icrc7 --argument 'record {icrc7_args = null; icrc30_args =null; icrc3_args =null;}' --mode reinstall
```

This will produce an NFT canister with the default config. For more fine grained control, please consult the documentation for each project:

-   ICRC3 - Transaction Log and Archive - https://github.com/PanIndustrial-Org/icrc30.mo
-   ICRC7 - Base NFT - https://github.com/PanIndustrial-Org/icrc7.mo
-   ICRC30 - Approval workflow - https://github.com/PanIndustrial-Org/icrc30.mo

A sample deployment/functional script is provided in deploy.sh.

## Provided functions

For sample minting, burning, approval, transfer functions, please see the deploy.sh file.

Further availability of functionality can be referenced in earlier referenced documentation.

## Documentation

Pre-compiled docs can be found on mops.one at:

-   ICRC3 - Transaction Log and Archive - https://mops.one/icrc3-mo/docs/lib
-   ICRC7 - Base NFT - https://mops.one/icrc7-mo/docs
-   ICRC30 - Approval workflow - https://mops.one/icrc30-mo/docs
