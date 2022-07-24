const { expect } = require("chai");
const { ethers } = require("hardhat");
// const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");

/* Tests for NFT contract */
describe("Soul Bound Token Contract", () => {
it("Should initialize the name and symbol correctly", async () => {
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  const NFT = await ethers.getContractFactory("NFT");
  //Random contract address inserted here to satisfy constructor arguments
  const nft = await NFT.deploy("0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d");
  const name = await nft.name();
  const symbol = await nft.symbol();
  expect(await nft.name()).to.equal("ExodusSBT");
  expect(await nft.symbol()).to.equal("ESBT");
  console.log("name:" , name);
  console.log("symbol:", symbol);
 })
})























describe("ESBT NFT contract minting", () => {

  let owner;
  let addr1;
  let addr2;
  let addrs;
  let tokenURI = "https://www.mytokenlocation.com";
  let tokenURI2 ="https://www.mytokenlocation2.com";

  it("Should set the right owner", async () => {

  /* deploy the marketplace */
  const Market = await ethers.getContractFactory("NFTMarket")
  const market = await Market.deploy()
  await market.deployed()
  const marketAddress = market.address

  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners()

  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy(marketAddress)

  await nft.createToken(tokenURI)

  expect(await nft.owner()).to.equal(owner.address);
  //console.log("Owner address:", addr1 )
  })

  it("Should mint an NFT", async () => {
  //   /* deploy the marketplace */
  // const Market = await ethers.getContractFactory("NFTMarket")
  // const market = await Market.deploy()
  // await market.deployed()
  // const marketAddress = market.address
  // const [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy("0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d")

  await
  expect(nft.createToken(tokenURI)).to.emit(nft, "Transfer")
  console.log("The transfer has been successful")
  })

  it("should return the new Item ID", async () => {
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy("0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d")
  
  await expect(await nft.callStatic.createToken(tokenURI)).to.equal("1")
  const ID = await nft.callStatic.createToken(tokenURI)
  console.log("The new item ID is:", ID.toString())
  })

  it("should increment the Item ID", async () => {
  const startID = "2";
  const nextID = "3";
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy("0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d")
  
  await expect(nft.createToken(tokenURI)).to.emit(nft, "Transfer")
  await expect(await nft.callStatic.createToken(tokenURI)).to.equal(startID)
  const ID2 = await nft.callStatic.createToken(tokenURI)
  console.log("The next Item ID is:", ID2.toString())
  
  await expect(nft.createToken(tokenURI2)).to.emit(nft, "Transfer")
  await expect(await nft.callStatic.createToken(tokenURI2)).to.equal(nextID)
  const ID3 = await nft.callStatic.createToken(tokenURI2)
  console.log("The next Item ID is:", ID3.toString())
  })

})

describe("balanceOf", () => {

  let tokenURI = "https://www.mytokenlocation.com";

  it("Gets the count of NFTs for this address", async () => {
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy("0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d")

  await expect (await nft.balanceOf(owner.address)).to.equal("0")
  await nft.createToken(tokenURI)

  expect(await nft.balanceOf(owner.address)).to.equal("1")
  const count = await nft.balanceOf(owner.address)
  console.log("The number of NFTs the Owner has is now:", count.toString())

  })

})