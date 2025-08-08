# AgendaApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAgendaAddAgendaPost**](#apiagendaaddagendapost) | **POST** /api/Agenda/AddAgenda | |
|[**apiAgendaGetAllGet**](#apiagendagetallget) | **GET** /api/Agenda/GetAll | |
|[**apiAgendaRemoveDelete**](#apiagendaremovedelete) | **DELETE** /api/Agenda/Remove | |
|[**apiAgendaUpdatePut**](#apiagendaupdateput) | **PUT** /api/Agenda/Update | |

# **apiAgendaAddAgendaPost**
> apiAgendaAddAgendaPost(reqAgendaDTO)


### Example

```typescript
import {
    AgendaApi,
    Configuration,
    ReqAgendaDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AgendaApi(configuration);

let reqAgendaDTO: ReqAgendaDTO; //

const { status, data } = await apiInstance.apiAgendaAddAgendaPost(
    reqAgendaDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqAgendaDTO** | **ReqAgendaDTO**|  | |


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

# **apiAgendaGetAllGet**
> Array<ResAgendaDTO> apiAgendaGetAllGet()


### Example

```typescript
import {
    AgendaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AgendaApi(configuration);

const { status, data } = await apiInstance.apiAgendaGetAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ResAgendaDTO>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAgendaRemoveDelete**
> apiAgendaRemoveDelete()


### Example

```typescript
import {
    AgendaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AgendaApi(configuration);

let agendaId: number; // (default to undefined)

const { status, data } = await apiInstance.apiAgendaRemoveDelete(
    agendaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **agendaId** | [**number**] |  | defaults to undefined|


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

# **apiAgendaUpdatePut**
> apiAgendaUpdatePut()


### Example

```typescript
import {
    AgendaApi,
    Configuration,
    ReqUpdateAgenda
} from './api';

const configuration = new Configuration();
const apiInstance = new AgendaApi(configuration);

let agendaId: number; // (default to undefined)
let reqUpdateAgenda: ReqUpdateAgenda; // (optional)

const { status, data } = await apiInstance.apiAgendaUpdatePut(
    agendaId,
    reqUpdateAgenda
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqUpdateAgenda** | **ReqUpdateAgenda**|  | |
| **agendaId** | [**number**] |  | defaults to undefined|


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

