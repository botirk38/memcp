---
url: "https://memories.ai/docs/API/Utils/Get-session-detail/"
title: "Get Session Detail | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Utils/Get-session-detail/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Use this API to retrieve detailed metadata about a specific video session. You must provide a valid `session_id` and API key to access the session information.

## Prerequisites [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#prerequisites "Direct link to Prerequisites")

- You have access to session IDs retrieved via the [List Sessions API](https://memories.ai/docs/API/Utils/List-sessions/) or other workflows.
- You have a valid memories.ai API key.

## Host URL [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#endpoint "Direct link to Endpoint")

**GET** `/serve/api/v1/get_session_detail`

## Request Example [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

url = "https://api.memories.ai/serve/api/v1/get_session_detail"
headers = {"Authorization": "<API_KEY>"}
params = {"sessionId": "<SESSION_ID>", "unique_id": "<UNIQUE_ID>"}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    print("Session detail retrieved successfully:")
    print(response.json())
else:
    print("Failed to retrieve session detail:", response.status_code)
    print(response.text)

```

## Request Parameters [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| sessionId | query | int | Yes | Unique identifier for the video session |
| Authorization | header | string | Yes | Your API key for authentication |
| unique\_id | body | string | Yes | unique id |

## Response Example [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#response-example "Direct link to Response Example")

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": {
    "title": "tell me where to travel in mid june?",
    "messages": [\
      {\
        "role": "user",\
        "content": "tell me where to travel in mid june?"\
      },\
      {\
        "role": "assistant",\
        "content": "When planning travel for mid-June, it's a fantastic time to consider a variety of destinations...",\
        "thinkings": [\
          {\
            "title": "Information Retrieval",\
            "content": "Okay, I need to figure out the best travel destinations for mid-June. That's a pretty broad question..."\
          },\
          {\
            "title": "Information Retrieval",\
            "content": "Okay, I need to figure out how these videos relate to the user's question about 'best travel destinations in mid June.'..."\
          }\
        ],\
        "refs": [\
          {\
            "video": {\
              "duration": "10",\
              "video_no": "VI606140356924534784",\
              "video_name": "test_video_gz_visual_understanding_fuse_s9_video_fuse_4_video_fuse_4"\
            },\
            "refItems": [\
              {\
                "videoNo": "VI606140356924534784",\
                "startTime": 23,\
                "type": "keyframe"\
              },\
              {\
                "videoNo": "VI606140356924534784",\
                "startTime": 30,\
                "endTime": 36,\
                "type": "visual_ts",\
                "text": "A close-up view shows a collection of items on a concrete surface. To the left, two brown, round objects resembling small barrels or planters are visible. One has a blue lid or insert..."\
              },\
              {\
                "videoNo": "VI606140356924534784",\
                "startTime": 30,\
                "endTime": 36,\
                "type": "audio_ts",\
                "text": "A close-up view shows a collection of items on a concrete surface. To the left, two brown, round objects resembling small barrels or planters are visible. One has a blue lid or insert..."\
              }\
            ]\
          }\
        ]\
      }\
    ],
    "session_id": "590197794380320770"
  },
  "failed": false,
  "success": true
}

```

## Response Structure [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#response-structure "Direct link to Response Structure")

## Response Structure [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#response-structure-1 "Direct link to Response Structure")

| Name | Type | Description |
| --- | --- | --- |
| code | string | Response status code |
| msg | string | Human-readable status message |
| data | object | Session information |
| » title | string | Title or query related to the session |
| » messages | list of objects | List of messages in the session |
| »» role | string | Role of the message sender ( `user` or `assistant`) |
| »» content | string | Text content of the message |
| »» thinkings | list of objects | _(assistant only)_ Thought process or reasoning steps |
| »»» title | string | Title describing the reasoning step |
| »»» content | string | Detailed explanation of that reasoning step |
| »» refs | list of objects | _(assistant only)_ Reference evidence based on related videos |
| »»» video | object | Metadata of the referenced video |
| »»»» video\_no | string | Unique video identifier |
| »»»» video\_name | string | Name of the referenced video |
| »»»» duration | string | Duration of the video (in seconds or minutes) |
| »»» refItems | list of objects | List of reference items with temporal and type information |
| »»»» videoNo | string | Video ID the reference item belongs to |
| »»»» type | string | Type of reference ( `keyframe`, `visual_ts`, `audio_ts`, etc.) |
| »»»» startTime | int | Start time of the reference segment (in seconds) |
| »»»» endTime | int (optional) | End time of the reference segment (if applicable) |
| »»»» text | string (optional) | Transcript or descriptive content associated with the reference |
| session\_id | string | Unique identifier of the session |
| success | boolean | Indicates whether the request was successful |
| failed | boolean | Indicates whether the request failed |

## Notes [​](https://memories.ai/docs/API/Utils/Get-session-detail/\#notes "Direct link to Notes")

- The `sessionId` must be a valid and existing identifier in your account.
- Use this API to retrieve rich context about a specific session for display or downstream processing.

- [Prerequisites](https://memories.ai/docs/API/Utils/Get-session-detail/#prerequisites)
- [Host URL](https://memories.ai/docs/API/Utils/Get-session-detail/#host-url)
- [Endpoint](https://memories.ai/docs/API/Utils/Get-session-detail/#endpoint)
- [Request Example](https://memories.ai/docs/API/Utils/Get-session-detail/#request-example)
- [Request Parameters](https://memories.ai/docs/API/Utils/Get-session-detail/#request-parameters)
- [Response Example](https://memories.ai/docs/API/Utils/Get-session-detail/#response-example)
- [Response Structure](https://memories.ai/docs/API/Utils/Get-session-detail/#response-structure)
- [Response Structure](https://memories.ai/docs/API/Utils/Get-session-detail/#response-structure-1)
- [Notes](https://memories.ai/docs/API/Utils/Get-session-detail/#notes)