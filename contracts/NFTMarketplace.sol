// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

//internal import for nft openzipline
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "hardhat/console.sol";

contract NFTMarketplace {
    uint public NftId
    address payable owner;
    
    mapping(address => MarketItem) public idMarketItem;


    struct MarketItem{
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("MyNFT", "MNFT" ){
        owner = payable (msg.sender)
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "only admin can change NFT listing price");
        _;
    }


    function createNft() external returns (uint256){
        NftId++;
    }

    function getPriceList() public view returns(uint256){
        return priceList;
    }
}
