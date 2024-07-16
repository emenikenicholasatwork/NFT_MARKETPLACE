import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import nfts from "../components/collections/nft.json";

interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
  collection: string;
  inCart: boolean;
  price: number;
}

export function saveCookie(name: string, value: string, days: number) {
  setCookie(name, value, { expires: days });
}

export function retrieveCookie(name: string): string | undefined {
  return getCookie(name);
}

export function deleteCookie(name: string) {
  removeCookie(name);
}

const createNftMap = (nfts: NFT[]): { [key: string]: NFT } => {
  const nftMap: { [key: string]: NFT } = {};
  nfts.forEach((nft) => {
    nftMap[nft.id] = nft;
  });
  return nftMap;
};

const nftMap = createNftMap(nfts);

export function findNftById(nftId: string): NFT | undefined {
  return nftMap[nftId];
}

export function saveNftChange(nft: NFT) { }
