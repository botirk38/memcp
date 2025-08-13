---
url: "https://memories.ai/docs/API/Utils/List-videos/"
title: "List Videos | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Utils/List-videos/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Use this API to retrieve a paginated list of videos that have been uploaded to the platform. You can optionally filter the results by video name, video ID, folder, or processing status.

## Prerequisites [​](https://memories.ai/docs/API/Utils/List-videos/\#prerequisites "Direct link to Prerequisites")

- You have uploaded videos to the platform using the [Upload API](https://memories.ai/docs/API/Upload/).
- You have a valid memories.ai API key.

## Host URL [​](https://memories.ai/docs/API/Utils/List-videos/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/API/Utils/List-videos/\#endpoint "Direct link to Endpoint")

**POST** `/serve/api/v1/list_videos`

## Request Example [​](https://memories.ai/docs/API/Utils/List-videos/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests
headers = {"Authorization": "<API_KEY>"}

json_body = {
    "page": 1,
    "size": 200,
    "video_name": "<VIDEO_NAME>",
    "video_no": "<VIDEO_ID>",
    "unique": "<UNIQUE_ID>",
    "status": "<STATUS>",
}

response = requests.post("https://api.memories.ai/serve/api/v1/list_videos", headers=headers, json=json_body)
print(response.json())

```

## Request Parameters [​](https://memories.ai/docs/API/Utils/List-videos/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| page | query | int | No | Page number for pagination (default: 1) |
| size | query | int | No | Number of results per page (default: 20) |
| video\_name | query | string | No | Filter by partial or exact video name |
| video\_no | query | string | No | Filter by unique video ID |
| status | query | string | No | Filter by video status (must match internal `VideoStatus` enum) |
| Authorization | header | string | Yes | Your API key for authentication |
| unique\_id | body | string | Yes | unique id |

## Response Example [​](https://memories.ai/docs/API/Utils/List-videos/\#response-example "Direct link to Response Example")

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": {
    "videos": [\
      {\
        "duration": "12",\
        "size": "3284512",\
        "status": "PARSE",\
        "cause": "null",\
        "video_no": "VI606404158946574336",\
        "video_name": "182082-867762198_tiny",\
        "create_time": "1754037217992"\
      },\
      {\
        "duration": "61",\
        "size": "5324808",\
        "status": "PARSE",\
        "cause": "null",\
        "video_no": "VI606402870447996928",\
        "video_name": "test_video_gz_visual_understanding_s36_gun_6_special_gun_6",\
        "create_time": "1754036910783"\
      },\
      {\
        "duration": "44",\
        "size": "3583477",\
        "status": "PARSE",\
        "cause": "null",\
        "video_no": "VI606401846039576576",\
        "video_name": "ssstik.io_@evarose.cosplay_1747479033469",\
        "create_time": "1754036666561"\
      }\
    ],
    "current_page": 1,
    "page_size": 200,
    "total_count": "3"
  },
  "success": true,
  "failed": false
}

```

## Response Structure [​](https://memories.ai/docs/API/Utils/List-videos/\#response-structure "Direct link to Response Structure")

| Name | Type | Description |
| --- | --- | --- |
| code | string | Response status code |
| msg | string | Human-readable status message |
| data | object | Paginated video metadata |
| » videos | list of objects | List of video entries |
| »» duration | string | Length of the video in seconds |
| »» size | string | File size in bytes |
| »» status | string | Processing status (e.g., `PARSE`, `DONE`, `FAILED`) |
| »» cause | string | Reason for failure if status is failed (or `"null"`) |
| »» video\_no | string | Unique video identifier |
| »» video\_name | string | Name of the video |
| »» create\_time | string | Upload timestamp (Unix milliseconds format) |
| » current\_page | int | Current page number |
| » page\_size | int | Number of videos per page |
| » total\_count | string | Total number of videos matching the query |
| success | boolean | Indicates if the request was successful |
| failed | boolean | Indicates if the request failed |

## Notes [​](https://memories.ai/docs/API/Utils/List-videos/\#notes "Direct link to Notes")

- Combine filters for more specific search results (e.g., by `folder_id` and `status`).
- Use this API to find `video_no` values for downstream processing or retrieval tasks.

- [Prerequisites](https://memories.ai/docs/API/Utils/List-videos/#prerequisites)
- [Host URL](https://memories.ai/docs/API/Utils/List-videos/#host-url)
- [Endpoint](https://memories.ai/docs/API/Utils/List-videos/#endpoint)
- [Request Example](https://memories.ai/docs/API/Utils/List-videos/#request-example)
- [Request Parameters](https://memories.ai/docs/API/Utils/List-videos/#request-parameters)
- [Response Example](https://memories.ai/docs/API/Utils/List-videos/#response-example)
- [Response Structure](https://memories.ai/docs/API/Utils/List-videos/#response-structure)
- [Notes](https://memories.ai/docs/API/Utils/List-videos/#notes)