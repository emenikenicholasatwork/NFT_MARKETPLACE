import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

export function saveCookie(name: string, value: string, days: number){
    setCookie(name, value, {expires: days});
}

export function retrieveCookie(name: string): string | undefined {
    return getCookie(name);
}

export function deleteCookie(name: string) {
    removeCookie(name);
}