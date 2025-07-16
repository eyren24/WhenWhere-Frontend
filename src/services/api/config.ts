import { Configuration } from './configuration'
import {apiClient} from "./Interceptor.ts";

export const apiConfig = new Configuration({
    baseOptions:{
        axios: apiClient
    },
    basePath: import.meta.env.VITE_API_BASE_URL,

})


export const URL_PATH = import.meta.env.VITE_API_ORIGIN ? document.location.origin : 'https://gibivision.com';