---
url: "https://memories.ai/docs/API/Transcription/audio-transcription/"
title: "Get Audio Transcription | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Transcription/audio-transcription/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Use this API to retrieve the transcription result specifically from the audio track of a video you have uploaded.

## Prerequisites [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#prerequisites "Direct link to Prerequisites")

- You’re familiar with the concepts described on the [Platform overview](https://memories.ai/docs/overview/) page.
- You have uploaded a video via the [Upload API](https://memories.ai/docs/API/Upload/) and obtained its `videoNo`.
- You have a valid memories.ai API key.
- The video must include an audio track.

## Host URL [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#endpoint "Direct link to Endpoint")

**GET** `/serve/api/v1/get_audio_transcription`

* * *

## Request Example [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": "<API_KEY>"}

params = {"video_no": "<VIDEO_ID>", "unique_id": "<UNIQUE_ID>"}

response = requests.get("https://api.memories.ai/serve/api/v1/get_audio_transcription", headers=headers, params=params)

print("Status:", response.status_code)
try:
    print("Video Transcription Response:", response.json())
except Exception:
    print("Response Text:", response.text)

```

## Request Parameters [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| video\_no | query | string | Yes | Unique video number returned after upload |
| Authorization | header | string | Yes | Your API key for authentication |
| unique\_id | body | string | Yes | unique id |

* * *

## Response Example [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": {
    "videoNo": "VI605961375402668032",
    "transcriptions": [\
      {\
        "index": 0,\
        "content": " I'm going to get my emergency and report.",\
        "startTime": "0",\
        "endTime": "7"\
      },\
      {\
        "index": 1,\
        "content": " Mommy, you're going to go.",\
        "startTime": "7",\
        "endTime": "12"\
      },\
      {\
        "index": 2,\
        "content": " What's going on up there?",\
        "startTime": "12",\
        "endTime": "15"\
      },\
      {\
        "index": 3,\
        "content": " Yes.",\
        "startTime": "15",\
        "endTime": "20"\
      },\
      {\
        "index": 4,\
        "content": " Mommy, you're going to go.",\
        "startTime": "20",\
        "endTime": "30"\
      },\
      {\
        "index": 5,\
        "content": " Mommy, you're going to go.",\
        "startTime": "30",\
        "endTime": "35"\
      }\
    ]
  },
  "success": true,
  "failed": false
}

```

## Response Structure [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#response-structure "Direct link to Response Structure")

| Name | Type | Description |
| --- | --- | --- |
| code | string | Response status code |
| msg | string | Human-readable status message |
| data | object | Response data container |
| » videoNo | string | The unique video ID |
| » transcription | list of objects | List of transcription segments from the audio track |
| »» start | float | Segment start time in seconds |
| »» end | float | Segment end time in seconds |
| »» text | string | Transcribed speech content for that time segment |

## Notes [​](https://memories.ai/docs/API/Transcription/audio-transcription/\#notes "Direct link to Notes")

- This endpoint returns only the transcription derived from the **audio track**.
- Ensure the video has finished processing (status: `PARSE`) before calling this API.

- [Prerequisites](https://memories.ai/docs/API/Transcription/audio-transcription/#prerequisites)
- [Host URL](https://memories.ai/docs/API/Transcription/audio-transcription/#host-url)
- [Endpoint](https://memories.ai/docs/API/Transcription/audio-transcription/#endpoint)
- [Request Example](https://memories.ai/docs/API/Transcription/audio-transcription/#request-example)
- [Request Parameters](https://memories.ai/docs/API/Transcription/audio-transcription/#request-parameters)
- [Response Example](https://memories.ai/docs/API/Transcription/audio-transcription/#response-example)
- [Response Structure](https://memories.ai/docs/API/Transcription/audio-transcription/#response-structure)
- [Notes](https://memories.ai/docs/API/Transcription/audio-transcription/#notes)