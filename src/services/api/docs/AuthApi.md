# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAuthGetUserInfoGet**](#apiauthgetuserinfoget) | **GET** /api/Auth/GetUserInfo | |
|[**apiAuthLoginPost**](#apiauthloginpost) | **POST** /api/Auth/Login | |
|[**apiAuthRefreshTokenPost**](#apiauthrefreshtokenpost) | **POST** /api/Auth/RefreshToken | |
|[**apiAuthRegisterPost**](#apiauthregisterpost) | **POST** /api/Auth/Register | |
|[**apiAuthVerifyTokenGet**](#apiauthverifytokenget) | **GET** /api/Auth/VerifyToken | |

# **apiAuthGetUserInfoGet**
> TokenInfoDTO apiAuthGetUserInfoGet()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.apiAuthGetUserInfoGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**TokenInfoDTO**

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

# **apiAuthLoginPost**
> ResAuthToken apiAuthLoginPost(reqLoginUser)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ReqLoginUser
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let reqLoginUser: ReqLoginUser; //

const { status, data } = await apiInstance.apiAuthLoginPost(
    reqLoginUser
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqLoginUser** | **ReqLoginUser**|  | |


### Return type

**ResAuthToken**

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

# **apiAuthRefreshTokenPost**
> ResAuthToken apiAuthRefreshTokenPost()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let oldRefresh: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiAuthRefreshTokenPost(
    oldRefresh
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **oldRefresh** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ResAuthToken**

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

# **apiAuthRegisterPost**
> ResAuthToken apiAuthRegisterPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ReqRegisterUser
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let reqRegisterUser: ReqRegisterUser; // (optional)

const { status, data } = await apiInstance.apiAuthRegisterPost(
    reqRegisterUser
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqRegisterUser** | **ReqRegisterUser**|  | |


### Return type

**ResAuthToken**

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

# **apiAuthVerifyTokenGet**
> string apiAuthVerifyTokenGet()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let email: string; // (default to undefined)
let token: string; // (default to undefined)

const { status, data } = await apiInstance.apiAuthVerifyTokenGet(
    email,
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|
| **token** | [**string**] |  | defaults to undefined|


### Return type

**string**

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

