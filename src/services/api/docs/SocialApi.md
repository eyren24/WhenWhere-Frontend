# SocialApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiSocialGetByOwnerGet**](#apisocialgetbyownerget) | **GET** /api/Social/GetByOwner | |
|[**apiSocialGetUtenteByUsernameGet**](#apisocialgetutentebyusernameget) | **GET** /api/Social/GetUtenteByUsername | |
|[**apiSocialListTopAgendeGet**](#apisociallisttopagendeget) | **GET** /api/Social/ListTopAgende | |

# **apiSocialGetByOwnerGet**
> Array<ResSocialDTO> apiSocialGetByOwnerGet()


### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

let username: string; // (default to undefined)

const { status, data } = await apiInstance.apiSocialGetByOwnerGet(
    username
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **username** | [**string**] |  | defaults to undefined|


### Return type

**Array<ResSocialDTO>**

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

# **apiSocialGetUtenteByUsernameGet**
> ResUtenteDTO apiSocialGetUtenteByUsernameGet()


### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

let username: string; // (default to undefined)

const { status, data } = await apiInstance.apiSocialGetUtenteByUsernameGet(
    username
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **username** | [**string**] |  | defaults to undefined|


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

# **apiSocialListTopAgendeGet**
> Array<ResSocialDTO> apiSocialListTopAgendeGet()


### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

const { status, data } = await apiInstance.apiSocialListTopAgendeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ResSocialDTO>**

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

