// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//@dev Ownable allows in theory the payment of royalties on Opensea. One reason to deploy to polygon, cheaper fees!
import "@openzeppelin/contracts/access/Ownable.sol";
//@dev Reentrancy guard for security. Prevents contract from calling itself. 
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
//@dev Burnable token, so you can get rid of it even if you can't transfer it out. 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract SoulBound is ERC721Burnable, Ownable, ReentrancyGuard {

address owner;

//@notice Error is thrown when trying to transfer a soulbound nft using other methods.
error soul_bound();

struct claimNFT {
		string uri;
		address to;
		bool claimed;

	}

using Counters for Counters.Counter;
Counters.Counter private _tokenIds;

//uint256 public countMint;

mapping (uint256 => bytes32) tokens;
mapping (bytes32 => claimNFT) claims;

event boundSoul(address from, address to, bytes32 claimID);

event claimBoundSoul(bytes32 claimID, uint256 tokenId);

constructor() public payable ERC721("ExodusSBT", "ESBT"){ }

owner = msg.sender;

//@dev Corresponds with the boundSoul event.
//@dev This creates a soul bound claimID which is then used to make the non-transferrable NFT. Stored in struct to be accessed later. Uses msg.sender to ensure no-one else can claim that NFT. 

function bindASoul(address _to, string memory _uri) public payable returns (bytes32 claimID) {
	require (_to != address(0), "Can't create nft for the burn address");
	require (bytes(_uri).length > 0, "Can't create nft for an empty URI");

	claimID = keccack256(abi.encodePacked(msg.sender, _to, _uri));

	claims[claimID] = claimNFT({uri: _uri, to: _to, claimed: false});

	emit boundSoul(msg.sender, _to, claimID);

	return claimID;
}

//@dev Allows for the SBT to be claimed according to the claimID, and only by the owner therefore. Mints token to Owner.

function claimBoundSoul (bytes32 claimID) public returns (uint256 tokenId) {
	claimNFT memory claim = claims[claimID];

	require(claim.to == msg.sender, "You have to be an owner to claim");
	require(claim.claimed == false, "This SBT has been claimed");

	claims[claimID].claimed = true;

	_tokenIds.increment();
	tokenId = _tokenIds.current();

	tokens[tokenId] = claimID;

	_mint(msg.sender, tokenId);

	emit claimBoundSoul(claimID, tokenId);

}

//@dev Ensures the token URI exists and is paired with valid metadata. This is what makes the NFT a viewable or confirmed NFT. Returns token URI

function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
	require(_exists(tokenId), "ERC721Metadata does not exist. Search for non-existant token or incomplete metadata");

	return claims[tokens[tokenId]].uri;

}

//@dev Allows for the burning of SBT. Removes data from the mappings. Mappings are not storing the balances of owners, but rather the claims and the token information. Claims mapping has owner information used to encode. 

function burn(uint256 tokenId) public virtual override {
	super.burn(tokenId);

	delete claims[tokens[tokenId]];
	delete tokens[tokenId];
}

  /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     */

function _beforeTokenTransfer(address from, address to, uint256 tokenId)internal virtual override {
	//only allow mint and burn transfers
	require(from == address(0) || to == address(0), "This is an Soul Bound NFT, you cannot transfer it except to burn.");

	//@dev super condition places this in all events. Hook. 
	super._beforeTokenTransfer(from, to, tokenId);
}

// --- Disabling Transfer Of Soulbound NFT Other Methods--- //

  // @notice Function disabled as cannot transfer a soulbound nft
  function safeTransferFrom(
    address, 
    address, 
    uint256,
    bytes memory
  ) public pure override {
    revert soul_bound();
  }

  // @notice Function disabled as cannot transfer a soulbound nft
  function safeTransferFrom(
    address, 
    address, 
    uint256 
  ) public pure override {
    revert soul_bound();
  }

  // @notice Function disabled as cannot transfer a soulbound nft
  function transferFrom(
    address, 
    address, 
    uint256
  ) public pure override {
    revert soul_bound();
  }

  // @notice Function disabled as cannot transfer a soulbound nft
  function approve(
    address, 
    uint256
  ) public pure override {
    revert soul_bound();
  }

  // @notice Function disabled as cannot transfer a soulbound nft
  function setApprovalForAll(
    address, 
    bool
  ) public pure override {
    revert soul_bound();
  }

  // @notice Function disabled as cannot transfer a soulbound nft
  function getApproved(
    uint256
  ) public pure override returns (address) {
    revert soul_bound();
  }

  // @notice Function disabled as cannot transfer a soulbound nft
  function isApprovedForAll(
    address, 
    address
  ) public pure override returns (bool) {
    revert soul_bound();
  }

//@notice Ending contract
}




