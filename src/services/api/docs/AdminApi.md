# AdminApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAdminGetAgendeStatsGet**](#apiadmingetagendestatsget) | **GET** /api/Admin/GetAgendeStats | |
|[**apiAdminGetStatsGet**](#apiadmingetstatsget) | **GET** /api/Admin/GetStats | |

# **apiAdminGetAgendeStatsGet**
> ResAdminAgendeStatsDTO apiAdminGetAgendeStatsGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.apiAdminGetAgendeStatsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResAdminAgendeStatsDTO**

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

# **apiAdminGetStatsGet**
> ResAdminStatsDTO apiAdminGetStatsGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.apiAdminGetStatsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResAdminStatsDTO**

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

