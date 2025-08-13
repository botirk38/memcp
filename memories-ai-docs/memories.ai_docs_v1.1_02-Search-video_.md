---
url: "https://memories.ai/docs/v1.1/02-Search-video/"
title: "Search Video | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.1/02-Search-video/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.1**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/02-Search-video/)** (v1.2).

Version: v1.1

On this page

Using a natural language query, this API searches through all processed videos and ranks the video clips within milliseconds. Memories.ai retrieves and ranks videos based on visual information in a way similar to human perception. With this API, developers can access the most relevant videos from their entire library.

Searching from `AUDIO` and `VIDEO` are supported and the most relevant clips will be retrieved from the video.

* * *

## Prerequisites [​](https://memories.ai/docs/v1.1/02-Search-video/\#prerequisites "Direct link to Prerequisites")

- You have created a memories.ai API key.
- At least one video has been uploaded to memories.ai and is currently in `PARSE` status.

* * *

## Host URL [​](https://memories.ai/docs/v1.1/02-Search-video/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/v1.1/02-Search-video/\#endpoint "Direct link to Endpoint")

**POST** `/serve/api/video/search`

* * *

## Request Example [​](https://memories.ai/docs/v1.1/02-Search-video/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": "<API_KEY>"}  # API key
json_body = {
    "search_param": "<YOUR_PROMPT>",  # The search query
    "folder_id": -1, # By default -1.
    "search_type": "BY_VIDEO" # 'BY_AUDIO' or 'BY_VIDEO' or 'BY_CLIP'
}

response = requests.post(
    "https://api.memories.ai/serve/api/video/search",
    headers=headers,
    json=json_body
)

print(response.json())

```

Replace `API_KEY` in the code above with your actual API key and `YOUR_PROMPT` with your search query. You can search for relevant videos you've uploaded using natural language.

## Request Body [​](https://memories.ai/docs/v1.1/02-Search-video/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
{
  "search_param": "Find sprint race with Usain Bolt",
  "folder_id": -2
}

```

## Request Parameters [​](https://memories.ai/docs/v1.1/02-Search-video/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | API key used for authorization |
| search\_param | body | string | Yes | Natural language search query |
| folder\_id | body | int | No | -1 for Default folder; -2 for API folder; -1 by default |
| search\_type | body | string | Yes | `BY_AUDIO` search by audio; `BY_VIDEO` search by video and return video numbers; `BY_CLIP` search by video and return exact clips |

## Response Example [​](https://memories.ai/docs/v1.1/02-Search-video/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "SUCCESS",
  "msg": "Search completed successfully",
  "data": {
    "videos": [\
      {\
        "videoNo": "mavi_video_001",\
        "videoName": "olympic_sprint.mp4",\
        "videoStatus": "PARSE",\
        "uploadTime": "1740995860114"\
      }\
    ]
  }
}

```

## Response Result [​](https://memories.ai/docs/v1.1/02-Search-video/\#response-result "Direct link to Response Result")

| Status code | Status code msg | Description | Data |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request was successful | Inline |

## Response Structure [​](https://memories.ai/docs/v1.1/02-Search-video/\#response-structure "Direct link to Response Structure")

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

- [Prerequisites](https://memories.ai/docs/v1.1/02-Search-video/#prerequisites)
- [Host URL](https://memories.ai/docs/v1.1/02-Search-video/#host-url)
- [Endpoint](https://memories.ai/docs/v1.1/02-Search-video/#endpoint)
- [Request Example](https://memories.ai/docs/v1.1/02-Search-video/#request-example)
- [Request Body](https://memories.ai/docs/v1.1/02-Search-video/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.1/02-Search-video/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.1/02-Search-video/#response-example)
- [Response Result](https://memories.ai/docs/v1.1/02-Search-video/#response-result)
- [Response Structure](https://memories.ai/docs/v1.1/02-Search-video/#response-structure)