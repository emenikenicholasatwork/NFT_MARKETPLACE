import Cookies from "js-cookie";
interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
  collection: string;
  price: number;
}

export function saveCookie(name: string, value: any, days: number) {
  Cookies.set(name, value, { expires: days });
}

export function retrieveCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function deleteCookie(name: string) {
  Cookies.remove(name);
}
