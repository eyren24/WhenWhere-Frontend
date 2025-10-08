import {
    AgendaApi,
    AuthApi,
    EventoApi,
    type FiltriAgendaDTO, NotaApi,
    type ReqAgendaDTO,
    type ReqEventoDTO,
    type ReqLoginUser, type ReqNotaDTO,
    type ReqRegisterUser,
    type ReqUpdateEventoDTO, TagApi
} from "./api.ts";
import {apiClient} from "./Interceptor.ts";
import {URL_PATH, apiConfig} from "./config.ts";

export const authApi = new AuthApi(apiConfig, URL_PATH, apiClient)
export const agendaApi = new AgendaApi(apiConfig, URL_PATH, apiClient)
export const eventoApi = new EventoApi(apiConfig, URL_PATH, apiClient)
export const noteApi = new NotaApi(apiConfig, URL_PATH, apiClient)
export const tagsApi = new TagApi(apiConfig, URL_PATH, apiClient)


export const login = (loginField: ReqLoginUser) => {
    return authApi.apiAuthLoginPost(loginField);
}
export const register = (registerField: ReqRegisterUser) => {
    return authApi.apiAuthRegisterPost(registerField);
}
export const getUserInfo = async () => {
    return authApi.apiAuthGetUserInfoGet()
}
export const getAllAgende = async () => {
    return agendaApi.apiAgendaGetAllGet();
}
export const createEvent = async (evento: ReqEventoDTO) => {
    return eventoApi.apiEventoAddPost(evento);
}
export const deleteEvento = async (eventoId: number) => {
    return eventoApi.apiEventoRemoveDelete(eventoId);
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
export const getAgendaById = async (agendaId: number) => {
    return agendaApi.apiAgendaGetByIdGet(agendaId)
}

export const getTags = async () => {
    return tagsApi.apiTagGetListGet()
}
export const creaNote = async (nota: ReqNotaDTO) => {
    return noteApi.apiNotaAddPost(nota);
}
export const getNote = async (agendaId: number, filtri: FiltriAgendaDTO) => {
    return noteApi.apiNotaGetAllGet(agendaId, filtri);
}

export const deleteNote = async (notaId: number) => {
    return noteApi.apiNotaRemoveDelete(notaId);
}
export const updateNote = async (notaId: number, nota: ReqNotaDTO) => {
    return noteApi.apiNotaUpdatePut(notaId, nota)
}