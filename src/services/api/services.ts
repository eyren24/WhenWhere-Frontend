import {
    AgendaApi,
    AuthApi,
    EventoApi,
    LikesApi,
    NotaApi,
    SocialApi,
    TagApi,
    UtenteApi,
    type FiltriAgendaDTO,
    type ReqAgendaDTO,
    type ReqEventoDTO,
    type ReqLikesDTO,
    type ReqLoginUser,
    type ReqNotaDTO,
    type ReqRegisterUser,
    type ReqUpdateAgenda,
    type ReqUpdateEventoDTO, type ReqUpdateNotaDTO
} from "./api.ts";
import { apiClient } from "./Interceptor.ts";
import { apiConfig, URL_PATH } from "./config.ts";

// === ISTANZE API ===
export const authApi = new AuthApi(apiConfig, URL_PATH, apiClient);
export const utenteApi = new UtenteApi(apiConfig, URL_PATH, apiClient);
export const agendaApi = new AgendaApi(apiConfig, URL_PATH, apiClient);
export const eventoApi = new EventoApi(apiConfig, URL_PATH, apiClient);
export const notaApi = new NotaApi(apiConfig, URL_PATH, apiClient);
export const likesApi = new LikesApi(apiConfig, URL_PATH, apiClient);
export const tagsApi = new TagApi(apiConfig, URL_PATH, apiClient);
export const socialApi = new SocialApi(apiConfig, URL_PATH, apiClient);

// === AUTH ===
export const login = (loginField: ReqLoginUser) => authApi.apiAuthLoginPost(loginField);
export const register = (registerField: ReqRegisterUser) => authApi.apiAuthRegisterPost(registerField);
export const getUserInfo = () => authApi.apiAuthGetUserInfoGet();

// === AGENDA ===
export const createAgenda = (agenda: ReqAgendaDTO) => agendaApi.apiAgendaAddAgendaPost(agenda);
export const updateAgenda = (id: number, agenda: ReqUpdateAgenda) => agendaApi.apiAgendaUpdateAgendaPut(id, agenda);
export const deleteAgenda = (id: number) => agendaApi.apiAgendaRemoveAgendaDelete(id);
export const getAgendaById = (id: number) => agendaApi.apiAgendaGetByIdGet(id);
export const getAllAgende = () => agendaApi.apiAgendaGetAllAgendeGet();
export const getAllLiked = () => agendaApi.apiAgendaGetAllLikedGet();
export const getPersonalAgende = () => agendaApi.apiAgendaGetPersonalAgendaGet();
export const getAgendeByOwner = (username: string) => agendaApi.apiAgendaGetByOwnerGet(username);
export const getTop10Agende = () => agendaApi.apiAgendaListTopAgendeGet();

// === EVENTI ===
export const createEvento = (evento: ReqEventoDTO) => eventoApi.apiEventoAddPost(evento);
export const updateEvento = (id: number, evento: ReqUpdateEventoDTO) => eventoApi.apiEventoUpdatePut(id, evento);
export const deleteEvento = (id: number) => eventoApi.apiEventoRemoveDelete(id);
export const getAllEventi = (agendaId: number, filtri: FiltriAgendaDTO) =>
    eventoApi.apiEventoGetAllPost(agendaId, filtri);

// === NOTE ===
export const createNota = (nota: ReqNotaDTO) => notaApi.apiNotaAddPost(nota);
export const updateNota = (notaId: number, nota: ReqUpdateNotaDTO) => notaApi.apiNotaUpdatePut(notaId, nota);
export const deleteNota = (notaId: number) => notaApi.apiNotaRemoveDelete(notaId);
export const getNote = (agendaId: number, filtri: FiltriAgendaDTO) =>
    notaApi.apiNotaGetAllGet(agendaId, filtri);

// === LIKES ===
export const addLike = (like: ReqLikesDTO) => likesApi.apiLikesAddLikePost(like);
export const removeLike = (agendaId: number) => likesApi.apiLikesRemoveDelete(agendaId);
export const getLikesByUser = (userId: number) => likesApi.apiLikesGetListByUserIdGet(userId);
export const getLikeByAgendaId = (agendaId: number) => likesApi.apiLikesGetLikeByAgendaIdGet(agendaId);
export const getIfUserLikedAgenda = (agendaId: number) => likesApi.apiLikesGetIfUserLikeAgendaGet(agendaId);

// === TAGS ===
export const getTags = () => tagsApi.apiTagGetListGet();

// === SOCIAL ===
export const getUserByUsername = (username: string) => socialApi.apiSocialGetUtenteByUsernameGet(username);

// === UTENTE ===
export const getUtenteById = (id: number) => utenteApi.apiUtenteGetByIdGet(id);
