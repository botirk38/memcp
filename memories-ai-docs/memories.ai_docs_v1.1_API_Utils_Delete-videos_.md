---
url: "https://memories.ai/docs/v1.1/API/Utils/Delete-videos/"
title: "Delete Videos | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.1**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/API/Utils/Delete-videos/)** (v1.2).

Version: v1.1

On this page

To free up cloud storage or remove unused videos from the memories.ai database, developers can call this API to delete all raw and derived data associated with the specified `videoNos` in the request. Once the API call is successfully completed, no data related to the deleted videos will be retained.

## Prerequisites [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#prerequisites "Direct link to Prerequisites")

- You have created a memories.ai API key.

## Host URL [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#endpoint "Direct link to Endpoint")

**POST** `serve/api/video/delete_videos`

**Rate limit**: Maximum 100 videos per request.

* * *

## Request Example [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": "<API_KEY>"}  # API key
# List of video IDs to delete
data = ["VI1234567890", "VI0987654321"]

response = requests.post(
    "https://api.memories.ai/serve/api/video/delete_videos",
    headers=headers,
    json=data
)

print(response.json())

```

## Request Body [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
["VI1234567890", "VI0987654321"]

```

## Request Parameters [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | Authorization API key |
| data | body | string | Yes | List of video numbers to delete |

## Response Example [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": null,
  "success": true,
  "failed": false
}

```

## Response Result [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#response-result "Direct link to Response Result")

| Status code | Message | Description |
| --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | The request was successful and the videos have been deleted. |

## Response Structure [​](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/\#response-structure "Direct link to Response Structure")

Status code **200**

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| code | string | true | none | Response status code |
| msg | string | true | none | Message for the response |

- [Prerequisites](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#prerequisites)
- [Host URL](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#host-url)
- [Endpoint](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#endpoint)
- [Request Example](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#request-example)
- [Request Body](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#response-example)
- [Response Result](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#response-result)
- [Response Structure](https://memories.ai/docs/v1.1/API/Utils/Delete-videos/#response-structure)