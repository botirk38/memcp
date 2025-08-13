---
url: "https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/"
title: "Delete Videos | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

To free up cloud storage or remove unused videos from the MAVI database, developers can call this API to delete all raw and derived data associated with specified `videoNos` in the request. Once the API is successfully completed, no data related to deleted videos will be retained.

## Host URL [​](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

**DELETE** `/api/serve/video/delete`

- Rate limit: max 500 videos each call.

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization":"<your access token>" } # access token
data = ["<list of videoNos>"]
response = requests.delete(
    "https://mavi-backend.memories.ai/api/serve/video/delete",
    headers=headers,
    json=data
)

print(response.json())

```

## Request Body [​](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
[\
    "string"\
  ]

```

## Request Parameters [​](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | Authorization token |
| body | body | object | No | none |
| » videoNos | body | \[string\] | Yes | list of video numbers |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string"
}

```

## Response Result [​](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/\#response-result "Direct link to Response Result")

| Status code | Status code msg | Description | Data |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline |

## Response Structure [​](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/\#response-structure "Direct link to Response Structure")

Status code **200**

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| code | string | true | none | response code |
| msg | string | true | none | message with response code |

- [Host URL](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#host-url)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#request-example)
- [Request Body](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#response-example)
- [Response Result](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#response-result)
- [Response Structure](https://memories.ai/docs/v1.0/MAVI-API/Delete-videos/#response-structure)