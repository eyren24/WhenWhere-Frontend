import {
    AgendaApi, AuthApi, EventoApi, type FiltriAgendaDTO, type ReqAgendaDTO, type ReqLoginUser, type ReqRegisterUser,
    type ReqUpdateEventoDTO
} from "./api.ts";
import {apiClient} from "./Interceptor.ts";
import {URL_PATH, apiConfig} from "./config.ts";

export const authApi = new AuthApi(apiConfig, URL_PATH, apiClient)
export const agendaApi = new AgendaApi(apiConfig, URL_PATH, apiClient)
export const eventoApi = new EventoApi(apiConfig, URL_PATH, apiClient)


export const login = (loginField: ReqLoginUser) => {
    return authApi.apiAuthLoginPost(loginField);
}
export const register = (registerField: ReqRegisterUser) => {
    return authApi.apiAuthLoginPost(registerField);
}
export const getUserInfo = async () => {
    return authApi.apiAuthGetUserInfoGet()
}
export const getAllAgende = async () => {
    return agendaApi.apiAgendaGetAllGet();
}

export const getAllEventi = async (agenda: number, filtri: FiltriAgendaDTO) => {
    return eventoApi.apiEventoGetAllPost(agenda, filtri);
}
export const updateEvento = async (evento: number, nuovoEvento: ReqUpdateEventoDTO) => {
    return eventoApi.apiEventoUpdatePut(evento, nuovoEvento);
}
export const createAgenda = async (agenda: ReqAgendaDTO) => {
    return agendaApi.apiAgendaAddAgendaPost(agenda)
}
export const deleteAgenda = async (agenda: number) => {
    return agendaApi.apiAgendaRemoveDelete(agenda)
}