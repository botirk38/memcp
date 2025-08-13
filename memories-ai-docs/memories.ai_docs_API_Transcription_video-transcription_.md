---
url: "https://memories.ai/docs/API/Transcription/video-transcription/"
title: "Get Video Transcription | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Transcription/video-transcription/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Use this API to retrieve the transcription result for a video you have uploaded.

## Prerequisites [​](https://memories.ai/docs/API/Transcription/video-transcription/\#prerequisites "Direct link to Prerequisites")

- You’re familiar with the concepts described on the [Platform overview](https://memories.ai/docs/overview/) page.
- You have uploaded a video via the [Upload API](https://memories.ai/docs/API/Upload/) and obtained its `videoNo`.
- You have a valid memories.ai API key.

## Host URL [​](https://memories.ai/docs/API/Transcription/video-transcription/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/API/Transcription/video-transcription/\#endpoint "Direct link to Endpoint")

**GET** `/serve/api/v1/get_video_transcription`

* * *

## Request Example [​](https://memories.ai/docs/API/Transcription/video-transcription/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": "<API_KEY>"}
params = {"video_no": "<VIDEO_ID>", "unique_id", "<UNIQUE_ID>"}

response = requests.get("https://api.memories.ai/serve/api/v1/get_video_transcription", headers=headers, params=params)

print("Status:", response.status_code)
try:
    print("Video Transcription Response:", response.json())
except Exception:
    print("Response Text:", response.text)

```

## Request Parameters [​](https://memories.ai/docs/API/Transcription/video-transcription/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| video\_no | query | string | Yes | Unique video number returned after upload |
| Authorization | header | string | Yes | Your API key for authentication |
| unique\_id | body | string | Yes | unique id |

* * *

## Response Example [​](https://memories.ai/docs/API/Transcription/video-transcription/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": {
    "videoNo": "VI606041694843813888",
    "transcriptions": [\
      {\
        "index": 0,\
        "content": "Under a rocky overhang, three people are washing clothes in a shallow stream. Two individuals are seated on the pebbled ground, tending to laundry in basins, while a third person stands in the water further downstream. To the left, an open doorway reveals a room with a fireplace and a person tending to the fire. The background shows a misty, mountainous landscape with trees.",\
        "startTime": "0",\
        "endTime": "8"\
      }\
    ]
  },
  "success": true, "failed": false
}

```

## Response Structure [​](https://memories.ai/docs/API/Transcription/video-transcription/\#response-structure "Direct link to Response Structure")

| Name | Type | Description |
| --- | --- | --- |
| code | string | Response status code |
| msg | string | Human-readable status message |
| data | object | Response data container |
| » videoNo | string | The unique video ID |
| » transcription | list of objects | List of transcription segments |
| »» start | float | Segment start time in seconds |
| »» end | float | Segment end time in seconds |
| »» text | string | Transcribed speech content for that time segment |

## Notes [​](https://memories.ai/docs/API/Transcription/video-transcription/\#notes "Direct link to Notes")

- Ensure the video has finished processing (status: `PARSE`) before calling this API.
- This endpoint returns the final transcription of the full video (audio + visual).

- [Prerequisites](https://memories.ai/docs/API/Transcription/video-transcription/#prerequisites)
- [Host URL](https://memories.ai/docs/API/Transcription/video-transcription/#host-url)
- [Endpoint](https://memories.ai/docs/API/Transcription/video-transcription/#endpoint)
- [Request Example](https://memories.ai/docs/API/Transcription/video-transcription/#request-example)
- [Request Parameters](https://memories.ai/docs/API/Transcription/video-transcription/#request-parameters)
- [Response Example](https://memories.ai/docs/API/Transcription/video-transcription/#response-example)
- [Response Structure](https://memories.ai/docs/API/Transcription/video-transcription/#response-structure)
- [Notes](https://memories.ai/docs/API/Transcription/video-transcription/#notes)