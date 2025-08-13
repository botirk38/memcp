---
url: "https://memories.ai/docs/API/Utils/List-sessions/"
title: "List Chat Sessions | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Utils/List-sessions/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Use this API to retrieve a paginated list of historical chat sessions, including metadata such as session IDs, timestamps, and related videos.

## Prerequisites [​](https://memories.ai/docs/API/Utils/List-sessions/\#prerequisites "Direct link to Prerequisites")

- You‘re familiar with the concepts described on the [Platform overview](https://memories.ai/docs/overview/) page.
- You have previously used the [Video Chat API](https://memories.ai/docs/API/Video-Chat/) to create sessions.
- You have a valid memories.ai API key.

## Host URL [​](https://memories.ai/docs/API/Utils/List-sessions/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/API/Utils/List-sessions/\#endpoint "Direct link to Endpoint")

**GET** `/serve/api/v1/list_sessions`

## Request Example [​](https://memories.ai/docs/API/Utils/List-sessions/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests
headers = {"Authorization": "<API_KEY>"}

params = {
    "page": 1,
    "unique_id": "<UNIQUE_ID>"
}

response = requests.get("https://api.memories.ai/serve/api/v1/list_sessions", headers=headers, params=params)
print(response.json())

```

## Request Parameters [​](https://memories.ai/docs/API/Utils/List-sessions/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| page | query | int | No | Page number for pagination (default: 1) |
| Authorization | header | string | Yes | Your API key for authentication |
| unique\_id | body | string | Yes | unique id |

## Response Example [​](https://memories.ai/docs/API/Utils/List-sessions/\#response-example "Direct link to Response Example")

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": {
    "sessions": [\
      {\
        "sessionId": "601308802842759168",\
        "title": "Identify common objects across all videos."\
      },\
      {\
        "sessionId": "601308024392519680",\
        "title": "Identify common objects across all videos."\
      },\
      {\
        "sessionId": "601307898781503488",\
        "title": "Identify common objects across all videos."\
      },\
      {\
        "sessionId": "601307775271833600",\
        "title": "Identify common objects across all videos."\
      },\
      {\
        "sessionId": "601306626737180672",\
        "title": "Identify common objects across all videos."\
      },\
      {\
        "sessionId": "601295262723477504",\
        "title": "Identify common objects across all videos."\
      },\
      {\
        "sessionId": "601295114840707072",\
        "title": "Identify common objects across all videos."\
      },\
      {\
        "sessionId": "601290664273121280",\
        "title": "What sports games have been on recently, and what were the results?"\
      },\
      {\
        "sessionId": "601290471351914496",\
        "title": "What sports games have been on recently, and what were the results?"\
      },\
      {\
        "sessionId": "601290207567941632",\
        "title": "What sports games have been on recently, and what were the results?"\
      },\
      {\
        "sessionId": "601287205255778304",\
        "title": "111"\
      },\
      {\
        "sessionId": "601286465544130560",\
        "title": "Identify common objects across all videos."\
      }\
    ],
    "current_page": 1,
    "page_size": 20,
    "total_count": "18"
  },
  "success": true,
  "failed": false
}

```

## Response Structure [​](https://memories.ai/docs/API/Utils/List-sessions/\#response-structure "Direct link to Response Structure")

| Name | Type | Description |
| --- | --- | --- |
| code | string | Response status code |
| msg | string | Human-readable status message |
| data | object | Paginated session data container |
| » sessions | list of objects | List of chat session entries |
| »» session\_id | string | Unique identifier for the session |
| »» video\_no | string | Associated video ID |
| »» created\_time | string (timestamp) | Time when the session was created |
| » page | int | Current page number |
| » total\_pages | int | Total number of pages available |
| » total\_count | int | Total number of sessions |

## Notes [​](https://memories.ai/docs/API/Utils/List-sessions/\#notes "Direct link to Notes")

- Pagination starts at `page=1`.
- Use the `session_id` returned here to query messages with the [Get Chat History](https://memories.ai/docs/API/Utils/List-sessions/) API.
- This endpoint only returns sessions that were previously created through interactive chat or summary APIs.

- [Prerequisites](https://memories.ai/docs/API/Utils/List-sessions/#prerequisites)
- [Host URL](https://memories.ai/docs/API/Utils/List-sessions/#host-url)
- [Endpoint](https://memories.ai/docs/API/Utils/List-sessions/#endpoint)
- [Request Example](https://memories.ai/docs/API/Utils/List-sessions/#request-example)
- [Request Parameters](https://memories.ai/docs/API/Utils/List-sessions/#request-parameters)
- [Response Example](https://memories.ai/docs/API/Utils/List-sessions/#response-example)
- [Response Structure](https://memories.ai/docs/API/Utils/List-sessions/#response-structure)
- [Notes](https://memories.ai/docs/API/Utils/List-sessions/#notes)