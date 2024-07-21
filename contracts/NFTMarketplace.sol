// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    address payable private owner;
    uint256 creationPrice = 0.00015 ether;
    uint256 private _tokenCount;
    uint256 private _itemsSold;

    mapping(uint256 => MarketItem) public idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
    }

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only admin can change NFT listing price");
        _;
    }

    function updateCreationPrice(
        uint256 _creationPrice
    ) public payable onlyOwner {
        creationPrice = _creationPrice;
    }

    function getCreationPrice() public view returns (uint256) {
        return creationPrice;
    }

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        require(price > 0, "price must be  atleast 1");
        _tokenCount++;
        uint256 newTokenId = _tokenCount;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "price must be atleast 1");
        require(
            msg.value == creationPrice,
            "price must be equal to creation price"
        );
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            price
        );
    }

    function buyToken(uint256 tokenId) public payable {
        MarketItem storage item = idMarketItem[tokenId];
        uint256 price = item.price;
        address payable seller = item.seller;
        require(
            msg.value == item.price,
            "Price must be equals to creation price"
        );
        item.seller = payable(msg.sender);
        _itemsSold++;
        _transfer(item.owner, msg.sender, tokenId);
        uint256 creationFee = (price * creationPrice) / 100;
        owner.transfer(creationFee);
        seller.transfer(msg.value - creationFee);
    }

    function getAllItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenCount;
        MarketItem[] memory items = new MarketItem[](itemCount);
        uint256 currentCount = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            MarketItem storage currentItem = idMarketItem[currentId];
            items[currentCount] = currentItem;
            currentCount += 1;
        }
        return items;
    }

    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalCount; i++) {
            if (
                idMarketItem[i + 1].owner == msg.sender ||
                idMarketItem[i + 1].seller == msg.sender
            ) {
                itemCount++;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (
                idMarketItem[i + 1].owner == msg.sender ||
                idMarketItem[i + 1].seller == msg.sender
            ) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }
}
