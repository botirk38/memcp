---
url: "https://memories.ai/docs/v1.0/MAVI-API/Search-video/"
title: "Search Video | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Using a natural language query, this API will searches through all processed videos and ranks the results within milliseconds. MAVI retrieves and ranks videos based on visual information in a manner similar to human perception. With this API, developers can access the most relevant videos from their entire library.

## Host URL [​](https://memories.ai/docs/v1.0/MAVI-API/Search-video/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

**POST** `/api/serve/video/searchAI`

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Search-video/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": "<YOUR_ACCESS_TOKEN>"} # access token
data = {"searchValue": "<YOUR_PROMPT>"}
response = requests.post(
    "https://mavi-backend.memories.ai/api/serve/video/searchAI",
    headers=headers,
    json=data
)
print(response.json())

```

Replace `YOUR_ACCESS_TOKEN` in the code above with your actual access token and `YOUR_PROMPT` with your search query. You can search for relevant videos you've uploaded using natural language.

## Request Body [​](https://memories.ai/docs/v1.0/MAVI-API/Search-video/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
{
  "searchValue": "string"
}

```

## Request Parameters [​](https://memories.ai/docs/v1.0/MAVI-API/Search-video/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | authorization token |
| searchValue | body | string | Yes | natural language prompt |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Search-video/\#response-example "Direct link to Response Example")

Status code **200**

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

## Response Result [​](https://memories.ai/docs/v1.0/MAVI-API/Search-video/\#response-result "Direct link to Response Result")

| Status code | Status code msg | Description | Data |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline |

## Response Structure [​](https://memories.ai/docs/v1.0/MAVI-API/Search-video/\#response-structure "Direct link to Response Structure")

Status code **200**

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| code | string | true | none | response code |
| msg | string | true | none | message with response code |
| data | object | true | none | JSON data |
| » videos | \[object\] | false | none | JSON data |
| »» videoNo | string | true | none | video number |
| »» videoName | string | false | none | video name |
| »» videoStatus | string | false | none | video status |
| »» uploadTime | string | false | none | upload timestamp(ms) |
| »» duration | string | false | none | video length(seconds) |

- [Host URL](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#host-url)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#request-example)
- [Request Body](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#response-example)
- [Response Result](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#response-result)
- [Response Structure](https://memories.ai/docs/v1.0/MAVI-API/Search-video/#response-structure)