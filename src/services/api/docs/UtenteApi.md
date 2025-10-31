# UtenteApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiUtenteGetAllGet**](#apiutentegetallget) | **GET** /api/Utente/GetAll | |
|[**apiUtenteGetByIdGet**](#apiutentegetbyidget) | **GET** /api/Utente/GetById | |
|[**apiUtenteToggleStatusDelete**](#apiutentetogglestatusdelete) | **DELETE** /api/Utente/ToggleStatus | |
|[**apiUtenteUpdatePut**](#apiutenteupdateput) | **PUT** /api/Utente/Update | |

# **apiUtenteGetAllGet**
> Array<ResUtenteDTO> apiUtenteGetAllGet()


### Example

```typescript
import {
    UtenteApi,
    Configuration,
    FiltriUtenteDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UtenteApi(configuration);

let agendaId: number; // (default to undefined)
let filtriUtenteDTO: FiltriUtenteDTO; // (optional)

const { status, data } = await apiInstance.apiUtenteGetAllGet(
    agendaId,
    filtriUtenteDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filtriUtenteDTO** | **FiltriUtenteDTO**|  | |
| **agendaId** | [**number**] |  | defaults to undefined|


### Return type

**Array<ResUtenteDTO>**

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

# **apiUtenteGetByIdGet**
> ResUtenteDTO apiUtenteGetByIdGet()


### Example

```typescript
import {
    UtenteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UtenteApi(configuration);

let utenteId: number; // (default to undefined)

const { status, data } = await apiInstance.apiUtenteGetByIdGet(
    utenteId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **utenteId** | [**number**] |  | defaults to undefined|


### Return type

**ResUtenteDTO**

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

# **apiUtenteToggleStatusDelete**
> Array<ResUtenteDTO> apiUtenteToggleStatusDelete()


### Example

```typescript
import {
    UtenteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UtenteApi(configuration);

let utenteId: number; // (default to undefined)

const { status, data } = await apiInstance.apiUtenteToggleStatusDelete(
    utenteId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **utenteId** | [**number**] |  | defaults to undefined|


### Return type

**Array<ResUtenteDTO>**

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

# **apiUtenteUpdatePut**
> Array<ResUtenteDTO> apiUtenteUpdatePut(reqUpdateUtenteDTO)


### Example

```typescript
import {
    UtenteApi,
    Configuration,
    ReqUpdateUtenteDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UtenteApi(configuration);

let utenteId: number; // (default to undefined)
let reqUpdateUtenteDTO: ReqUpdateUtenteDTO; //

const { status, data } = await apiInstance.apiUtenteUpdatePut(
    utenteId,
    reqUpdateUtenteDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqUpdateUtenteDTO** | **ReqUpdateUtenteDTO**|  | |
| **utenteId** | [**number**] |  | defaults to undefined|


### Return type

**Array<ResUtenteDTO>**

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

