# NotaApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiNotaAddPost**](#apinotaaddpost) | **POST** /api/Nota/Add | |
|[**apiNotaGetAllGet**](#apinotagetallget) | **GET** /api/Nota/GetAll | |
|[**apiNotaRemoveDelete**](#apinotaremovedelete) | **DELETE** /api/Nota/Remove | |
|[**apiNotaUpdatePut**](#apinotaupdateput) | **PUT** /api/Nota/Update | |

# **apiNotaAddPost**
> apiNotaAddPost(reqNotaDTO)


### Example

```typescript
import {
    NotaApi,
    Configuration,
    ReqNotaDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new NotaApi(configuration);

let reqNotaDTO: ReqNotaDTO; //

const { status, data } = await apiInstance.apiNotaAddPost(
    reqNotaDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqNotaDTO** | **ReqNotaDTO**|  | |


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

# **apiNotaGetAllGet**
> Array<ResNotaDTO> apiNotaGetAllGet()


### Example

```typescript
import {
    NotaApi,
    Configuration,
    FiltriAgendaDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new NotaApi(configuration);

let agendaId: number; // (default to undefined)
let filtriAgendaDTO: FiltriAgendaDTO; // (optional)

const { status, data } = await apiInstance.apiNotaGetAllGet(
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

**Array<ResNotaDTO>**

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

# **apiNotaRemoveDelete**
> Array<ResNotaDTO> apiNotaRemoveDelete()


### Example

```typescript
import {
    NotaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotaApi(configuration);

let notaId: number; // (default to undefined)

const { status, data } = await apiInstance.apiNotaRemoveDelete(
    notaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notaId** | [**number**] |  | defaults to undefined|


### Return type

**Array<ResNotaDTO>**

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

# **apiNotaUpdatePut**
> Array<ResNotaDTO> apiNotaUpdatePut(reqUpdateNotaDTO)


### Example

```typescript
import {
    NotaApi,
    Configuration,
    ReqUpdateNotaDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new NotaApi(configuration);

let notaId: number; // (default to undefined)
let reqUpdateNotaDTO: ReqUpdateNotaDTO; //

const { status, data } = await apiInstance.apiNotaUpdatePut(
    notaId,
    reqUpdateNotaDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqUpdateNotaDTO** | **ReqUpdateNotaDTO**|  | |
| **notaId** | [**number**] |  | defaults to undefined|


### Return type

**Array<ResNotaDTO>**

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

