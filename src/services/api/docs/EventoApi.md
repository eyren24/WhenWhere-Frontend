# EventoApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiEventoAddPost**](#apieventoaddpost) | **POST** /api/Evento/Add | |
|[**apiEventoGetAllPost**](#apieventogetallpost) | **POST** /api/Evento/GetAll | |
|[**apiEventoRemoveDelete**](#apieventoremovedelete) | **DELETE** /api/Evento/Remove | |
|[**apiEventoUpdatePut**](#apieventoupdateput) | **PUT** /api/Evento/Update | |

# **apiEventoAddPost**
> apiEventoAddPost(reqEventoDTO)


### Example

```typescript
import {
    EventoApi,
    Configuration,
    ReqEventoDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new EventoApi(configuration);

let reqEventoDTO: ReqEventoDTO; //

const { status, data } = await apiInstance.apiEventoAddPost(
    reqEventoDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqEventoDTO** | **ReqEventoDTO**|  | |


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEventoGetAllPost**
> Array<ResEventoDTO> apiEventoGetAllPost(filtriAgendaDTO)


### Example

```typescript
import {
    EventoApi,
    Configuration,
    FiltriAgendaDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new EventoApi(configuration);

let agendaId: number; // (default to undefined)
let filtriAgendaDTO: FiltriAgendaDTO; //

const { status, data } = await apiInstance.apiEventoGetAllPost(
    agendaId,
    filtriAgendaDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filtriAgendaDTO** | **FiltriAgendaDTO**|  | |
| **agendaId** | [**number**] |  | defaults to undefined|


### Return type

**Array<ResEventoDTO>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEventoRemoveDelete**
> apiEventoRemoveDelete()


### Example

```typescript
import {
    EventoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventoApi(configuration);

let eventoId: number; // (default to undefined)

const { status, data } = await apiInstance.apiEventoRemoveDelete(
    eventoId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventoId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEventoUpdatePut**
> apiEventoUpdatePut(reqUpdateEventoDTO)


### Example

```typescript
import {
    EventoApi,
    Configuration,
    ReqUpdateEventoDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new EventoApi(configuration);

let eventoId: number; // (default to undefined)
let reqUpdateEventoDTO: ReqUpdateEventoDTO; //

const { status, data } = await apiInstance.apiEventoUpdatePut(
    eventoId,
    reqUpdateEventoDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqUpdateEventoDTO** | **ReqUpdateEventoDTO**|  | |
| **eventoId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

