// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//internal import for nft openzipline
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

library Counter {

    struct Counter {
        uint256 value; //default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter.value;
    }

    function increment(Counter storage counter) internal {
        counter.value += 1;
    }

    function decrement(Counter storage counter) internal {
        require(counter.value > 0, "Counter: decrement overflow");
        counter.value -= 1;
    }

    function reset(Counter storage counter) internal {
        counter.value = 0;
    }
}

contract NFTMarketplace is ERC721URIStorage{
    using Counter for Counter.Counter;
    address payable private owner;
    address contractAddress;
    uint256 creationPrice = 0.0015 ether;
    Counter.Counter private _tokenIdCounter;
    Counter.Counter private _itemsSold;

    mapping(address => MarketItem) public idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    constructor(address marketplaceAddress) ERC721("Metaverse Tokens","METT"){
        owner = payable(msg.sender);
        contractAddress = marketplaceAddress;
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
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        setApprovalForAll(contractAddress, true);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "price must be atleast 1");
        require(msg.value == creationPrice, "price must be equal to creation price");
    }
}
