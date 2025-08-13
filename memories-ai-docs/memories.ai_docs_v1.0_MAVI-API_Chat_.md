---
url: "https://memories.ai/docs/v1.0/MAVI-API/Chat/"
title: "Video Chat | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Chat/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Developer could interact with an LLM AI assistant based on the context of one or multiple videos. By simply providing the `videoNos`, developers can request the LLM to analyze, summarize, annotate, and more for all uploaded videos. Additionally, this API supports streaming these responses to minimize latency during response generation.

## Host URL [​](https://memories.ai/docs/v1.0/MAVI-API/Chat/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

**POST** `/api/serve/video/chat`

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Chat/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": token} # access token
data = {
    "videoNos": <list of videoNos>,
    "message": "<your prompt>",
    "history": [],
    "stream": False,
}
response = requests.post(
    "https://mavi-backend.memories.ai/api/serve/video/chat",
    headers=headers,
    json=data
)

```

## Request Body [​](https://memories.ai/docs/v1.0/MAVI-API/Chat/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
{
  "videoNos": [\
    "string"\
  ],
  "message": "string",
  "history": [\
    {\
      "robot": "string",\
      "user": "string"\
    }\
  ],
  "stream": true
}

```

## Request Parameters [​](https://memories.ai/docs/v1.0/MAVI-API/Chat/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | authorization token |
| videoNos | body | \[string\] | Yes | list of video numbers |
| message | body | string | Yes | natural language prompt |
| history | body | \[object\] | No | list of JSON |
| » robot | body | string | Yes | historical LLM response |
| » user | body | string | Yes | historical message sent to LLM |
| stream | body | boolean | Yes | whether to stream the response |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Chat/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "msg": "string"
  }
}

```

## Response Result [​](https://memories.ai/docs/v1.0/MAVI-API/Chat/\#response-result "Direct link to Response Result")

| Status code | Status code msg | Description | Data |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline |

## Response Structure [​](https://memories.ai/docs/v1.0/MAVI-API/Chat/\#response-structure "Direct link to Response Structure")

Status code **200**

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| code | string | true | none | response code |
| msg | string | true | none | message with response code |
| data | object | true | none | JSON data |
| » msg | string | true | none | message returned by LLM |

- [Host URL](https://memories.ai/docs/v1.0/MAVI-API/Chat/#host-url)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Chat/#request-example)
- [Request Body](https://memories.ai/docs/v1.0/MAVI-API/Chat/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.0/MAVI-API/Chat/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Chat/#response-example)
- [Response Result](https://memories.ai/docs/v1.0/MAVI-API/Chat/#response-result)
- [Response Structure](https://memories.ai/docs/v1.0/MAVI-API/Chat/#response-structure)