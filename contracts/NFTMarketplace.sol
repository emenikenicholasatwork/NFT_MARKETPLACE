// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage{
    address payable private owner;
    uint256 creationPrice = 0.0015 ether;
    uint256 private _tokenIdCounter;
    uint256 private _itemsSold;

    mapping(uint256 => MarketItem) public idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
    }

    constructor() ERC721("Metaverse Tokens","METT"){
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only admin can change NFT listing price");
        _;
    }

    function updateCreationPrice(uint256 _creationPrice) public payable onlyOwner {
        creationPrice = _creationPrice;
    }

    function getCreationPrice() public view returns (uint256) {
        return creationPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        require( price > 0, "price must be  atleast 1");
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "price must be atleast 1");
        require(msg.value == creationPrice, "price must be equal to creation price");
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price
        );
        _transfer(msg.sender, address(this), tokenId);
    }

    function buyToken(uint256 tokenId, uint256 price) public payable{
        require(idMarketItem[tokenId].owner == msg.sender, "Only items owner can perform this operation");
        require(msg.value == creationPrice, "Price must be equals to creation price");
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));
        _itemsSold--;
        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable{
        uint256 price = idMarketItem[tokenId].price;
        require(msg.value == price, "submit the required price to complete the purchase");
        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(0));
        _itemsSold++;
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(creationPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItem() public view returns(MarketItem[] memory){
        uint256 itemCount = _tokenIdCounter;
        uint256 unsoldItemCount = _tokenIdCounter - _itemsSold;
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for(uint256 i=0; i < itemCount; i++){
            if(idMarketItem[i + 1].owner == address(this)){
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFT() public view returns(MarketItem[] memory) {
        uint256 totalCount = _tokenIdCounter;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for(uint256 i = 0; i < totalCount; i++){
            if(idMarketItem[i + 1].owner == msg.sender){
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[] (itemCount);
        for(uint256 i = 0; i < totalCount; i++){
           if(idMarketItem[i + 1].owner == msg.sender){
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
           }
        }
        return items;
    }
}
