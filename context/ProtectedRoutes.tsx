import { ReactNode, useEffect } from "react";
import { useGlobal } from "./GlobalContext";
import { useRouter } from "next/navigation";
import { retrieveCookie } from "../utils/Utils";


interface ProtectedRouteProps {
    children: ReactNode
}


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isWalletConnected } = useGlobal();
    const logout = retrieveCookie("crypto~art: logout");
    const router = useRouter();

    useEffect(() => {
        if (logout === "true") {
            router.push("/");
        }
    }, [isWalletConnected, router])

    if (isWalletConnected === false) {
        return null;
    }
    return <>{children}</>
};

export default ProtectedRoute;