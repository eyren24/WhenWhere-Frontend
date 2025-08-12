# TagApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiTagAddPost**](#apitagaddpost) | **POST** /api/Tag/Add | |
|[**apiTagGetListGet**](#apitaggetlistget) | **GET** /api/Tag/GetList | |
|[**apiTagRemoveDelete**](#apitagremovedelete) | **DELETE** /api/Tag/Remove | |
|[**apiTagUpdatePut**](#apitagupdateput) | **PUT** /api/Tag/Update | |

# **apiTagAddPost**
> apiTagAddPost(reqTagDTO)


### Example

```typescript
import {
    TagApi,
    Configuration,
    ReqTagDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TagApi(configuration);

let reqTagDTO: ReqTagDTO; //

const { status, data } = await apiInstance.apiTagAddPost(
    reqTagDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqTagDTO** | **ReqTagDTO**|  | |


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

# **apiTagGetListGet**
> apiTagGetListGet()


### Example

```typescript
import {
    TagApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TagApi(configuration);

const { status, data } = await apiInstance.apiTagGetListGet();
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

# **apiTagRemoveDelete**
> apiTagRemoveDelete()


### Example

```typescript
import {
    TagApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TagApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiTagRemoveDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | (optional) defaults to undefined|


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

# **apiTagUpdatePut**
> apiTagUpdatePut(reqUpdateTagDTO)


### Example

```typescript
import {
    TagApi,
    Configuration,
    ReqUpdateTagDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TagApi(configuration);

let reqUpdateTagDTO: ReqUpdateTagDTO; //
let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiTagUpdatePut(
    reqUpdateTagDTO,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reqUpdateTagDTO** | **ReqUpdateTagDTO**|  | |
| **id** | [**number**] |  | (optional) defaults to undefined|


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

