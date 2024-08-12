import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Payload } from "../types/payload";

export const useAuth = () => {
    const [authInfo, setAuthInfo] = useState<{
        checked: boolean,
        isAuthenticated: boolean
    }>({ checked: false, isAuthenticated: false });

    useEffect(() => {
        // ローカルストレージからトークンを取得
        const token = localStorage.getItem('token');
        try {
            // トークンが存在する場合
            if (token) {
                // tokenをデコード
                const decoded_token = jwtDecode<Payload>(token);

                // トークンの有効期限が切れていたら、トークンを削除して認証情報を更新
                if (decoded_token.exp * 1000 < Date.now()) {
                    // トークンを削除
                    localStorage.removeItem('token');
                    // 認証情報を更新(チェック済みかつ未認証)
                    setAuthInfo({ checked: true, isAuthenticated: false });

                } else {

                    // 認証情報を更新(チェック済みかつ認証済み)
                    setAuthInfo({ checked: true, isAuthenticated: true });

                }
                // トークンが存在しない場合
            } else {

                // 認証情報を更新(チェック済みかつ未認証)
                setAuthInfo({ checked: true, isAuthenticated: false });

            }
        } catch (error) {
            // トークンのデコードに失敗した場合
            setAuthInfo({ checked: true, isAuthenticated: false });
        }
    }, []);

    return authInfo;
}
