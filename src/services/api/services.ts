import {AuthApi, type ReqLoginUser, type ReqRegisterUser} from "./api.ts";
import {apiClient} from "./Interceptor.ts";
import {URL_PATH, apiConfig} from "./config.ts";

export const authApi = new AuthApi(apiConfig, URL_PATH, apiClient)


export const login = (loginField: ReqLoginUser) => {
    return authApi.apiAuthLoginPost(loginField);
}
export const register = (registerField: ReqRegisterUser) => {
    return authApi.apiAuthLoginPost(registerField);
}
export const getUserInfo = async () => {
    return authApi.apiAuthGetUserInfoGet()
}
