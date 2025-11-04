# SocialApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiSocialGetUtenteByUsernameGet**](#apisocialgetutentebyusernameget) | **GET** /api/Social/GetUtenteByUsername | |

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

