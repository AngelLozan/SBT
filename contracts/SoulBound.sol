// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//@dev Ownable allows in theory the payment of royalties on Opensea. One reason to deploy to polygon, cheaper fees!
import "@openzeppelin/contracts/access/Ownable.sol";
//@dev Reentrancy guard for security
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
//@dev Burnable token, so you can get rid of it even if you can't transfer it out. 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract SoulBound is ERC721Burnable, Ownable {
	

	struct claimNFT {
		string _uri;
		address to;
		bool claimed;

	}


using Counters for Counters.Counter;
Counters.Counter private _tokenIds;

//uint256 public countMint;

mapping (uint256 => bytes32) tokens;
mapping (bytes32 => claimNFT) claims;

event bindSoul(address from, address to, bytes32 claimID);

event claimBoundSoul(bytes32 claimID, uint256 tokenId);

constructor() public payable ERC721("ExodusSBT", "ESBT"){ }





}

//Ending contract



