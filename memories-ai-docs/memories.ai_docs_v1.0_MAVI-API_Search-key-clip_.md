---
url: "https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/"
title: "Search Key Clip | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

While the Search-Video API retrieves the most relevant videos, this API identifies and ranks the most relevant clips within one or multiple videos. The output is sorted by the relevance of the clips. With this API, developers can quickly pinpoint moments of interest across all uploaded videos in just milliseconds.

## Host URL [​](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

**POST** `/api/serve/video/searchVideoFragment`

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": token} # access token
data = {"videoNos": [], "searchValue": "<your prompt>"}
response = requests.post(
    "https://mavi-backend.memories.ai/api/serve/video/searchVideoFragment",
    headers=headers,
    json=data
)

```

## Request Body [​](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
{
  "videoNos": [],
  "searchValue": "string"
}

```

## Request Parameters [​](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | authorization token |
| videoNos | body | \[string\] | Yes | list of video IDs to search from (max 50 for free tier) |
| searchValue | body | string | Yes | search prompt |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/\#response-example "Direct link to Response Example")

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "videos": [\
      {\
        "videoNo": "string",\
        "videoName": "string",\
        "videoStatus": "string",\
        "uploadTime": "string",\
        "duration": "string"\
      }\
    ]
  }
}

```

## Response Result [​](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/\#response-result "Direct link to Response Result")

| Status code | Status code msg | Description | Data |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline |

## Response Structure [​](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/\#response-structure "Direct link to Response Structure")

Status code **200**

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| code | string | true | none | response code |
| msg | string | true | none | message with response code |
| data | object | true | none | JSON data |
| » videos | \[object\] | true | none | JSON data |
| »» videoNo | string | false | none | video number |
| »» videoName | string | false | none | video name/title |
| »» videoStatus | string | false | none | video processing status |
| »» uploadTime | string | false | none | upload timesatmp(ms) |
| »» duration | string | false | none | video length(seconds) |
| »» fragmentStartTime | string | true | none | video clip start time (s) |
| »» fragmentEndTime | string | true | none | video clip end time(s) |

- [Host URL](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#host-url)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#request-example)
- [Request Body](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#response-example)
- [Response Result](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#response-result)
- [Response Structure](https://memories.ai/docs/v1.0/MAVI-API/Search-key-clip/#response-structure)