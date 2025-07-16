# AgendaApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAgendaAddAgendaPost**](#apiagendaaddagendapost) | **POST** /api/Agenda/AddAgenda | |
|[**apiAgendaGetAllAgendaPost**](#apiagendagetallagendapost) | **POST** /api/Agenda/GetAllAgenda | |

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

# **apiAgendaGetAllAgendaPost**
> apiAgendaGetAllAgendaPost()


### Example

```typescript
import {
    AgendaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AgendaApi(configuration);

const { status, data } = await apiInstance.apiAgendaGetAllAgendaPost();
```

### Parameters
This endpoint does not have any parameters.


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

