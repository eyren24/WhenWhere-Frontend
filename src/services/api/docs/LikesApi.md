# LikesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiLikesAddLikePost**](#apilikesaddlikepost) | **POST** /api/Likes/AddLike | |
|[**apiLikesGetAllGet**](#apilikesgetallget) | **GET** /api/Likes/GetAll | |
|[**apiLikesGetListByUserIdGet**](#apilikesgetlistbyuseridget) | **GET** /api/Likes/GetListByUserId | |
|[**apiLikesRemoveDelete**](#apilikesremovedelete) | **DELETE** /api/Likes/Remove | |

# **apiLikesAddLikePost**
> apiLikesAddLikePost(reqLikesDTO)


### Example

```typescript
import {
    LikesApi,
    Configuration,
    ReqLikesDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new LikesApi(configuration);

let reqLikesDTO: ReqLikesDTO; //

const { status, data } = await apiInstance.apiLikesAddLikePost(
    reqLikesDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqLikesDTO** | **ReqLikesDTO**|  | |


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

# **apiLikesGetAllGet**
> Array<ResLikesDTO> apiLikesGetAllGet()


### Example

```typescript
import {
    LikesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikesApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiLikesGetAllGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<ResLikesDTO>**

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

# **apiLikesGetListByUserIdGet**
> Array<ResLikesDTO> apiLikesGetListByUserIdGet()


### Example

```typescript
import {
    LikesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiLikesGetListByUserIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Array<ResLikesDTO>**

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

# **apiLikesRemoveDelete**
> apiLikesRemoveDelete()


### Example

```typescript
import {
    LikesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiLikesRemoveDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

