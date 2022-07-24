# Soul Bound NFT Project

This is a project to mint a Soul Bound NFT as an example for the purposes of exploring whether it is profitable to mint SBTs on Polygon and bridge them to Ethereum for users of the Exodus wallet.

Example metadata and functionality is limited. claim and burn. 

To Do:
- Get images to mint and pin folder to Pinata
- Assign metadata and each image and pin those to Pinata (also metadata folder)
- Write tests for NFT
- Deploy mumbai testnet
- Sign up for Web3 Dog food and get test Matic to mint and bridge in order to understand costs. 
- Use Polygon fee tracker I built to estimate deployment costs or times of lesser costs. 

Uses the Alchemy API to launch.  



Hardhat project with the following commands:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
