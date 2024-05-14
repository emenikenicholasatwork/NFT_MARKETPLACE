// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

//internal import for nft openzipline
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract NFTMarketplace {
    address payable private owner;
    uint256 creationPrice = 0.0025 ether;
    uint256 private numOfNft;

    mapping(address => MarketItem) public idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only admin can change NFT listing price");
        _;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );


    function createNft() external {
        addNft();
    }

    function addNft() public {
        numOfNft += 1;
    }

    function deleteNft() public {
        numOfNft -= 1;
    }

    function getNumOfNft() public view returns (uint256) {
        return numOfNft;
    }

    function updateCreationPrice(
        uint256 _creationPrice
    ) public payable onlyOwner {
        creationPrice = _creationPrice;
    }

    function getPriceList() public view returns (uint256) {
        return creationPrice;
    }

    function getCreationPrice() public view returns (uint256) {
        return creationPrice;
    }

    // create NFT token function
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        // _tokenId.increament();
    }
}
