# ResAgendaDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**utenteId** | **number** |  | [default to undefined]
**nomeAgenda** | **string** |  | [default to undefined]
**descrizione** | **string** |  | [optional] [default to undefined]
**tema** | **string** |  | [default to undefined]
**isprivate** | **boolean** |  | [default to undefined]
**utente** | [**ResUtenteDTO**](ResUtenteDTO.md) |  | [default to undefined]
**evento** | [**Array&lt;ResEventoDTO&gt;**](ResEventoDTO.md) |  | [optional] [default to undefined]
**nota** | [**Array&lt;ResNotaDTO&gt;**](ResNotaDTO.md) |  | [optional] [default to undefined]
**likes** | [**Array&lt;ResLikesDTO&gt;**](ResLikesDTO.md) |  | [optional] [default to undefined]
**likesCount** | **number** |  | [optional] [default to undefined]
**hasLiked** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { ResAgendaDTO } from './api';

const instance: ResAgendaDTO = {
    id,
    utenteId,
    nomeAgenda,
    descrizione,
    tema,
    isprivate,
    utente,
    evento,
    nota,
    likes,
    likesCount,
    hasLiked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
