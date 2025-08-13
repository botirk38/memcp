---
url: "https://memories.ai/docs/API/Transcription/summary/"
title: "Generate Video Summary | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Transcription/summary/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Use this API to generate a structured summary of a video, either in the form of **chapters** or **topics**.

## Prerequisites [​](https://memories.ai/docs/API/Transcription/summary/\#prerequisites "Direct link to Prerequisites")

- You’re familiar with the concepts described on the [Platform overview](https://memories.ai/docs/overview/) page.
- You have uploaded a video via the [Upload API](https://memories.ai/docs/API/Upload/) and obtained its `videoNo`.
- You have a valid memories.ai API key.
- The video must be successfully parsed and transcribed.

## Host URL [​](https://memories.ai/docs/API/Transcription/summary/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/API/Transcription/summary/\#endpoint "Direct link to Endpoint")

**GET** `/serve/api/v1/generate_summary`

* * *

## Request Example [​](https://memories.ai/docs/API/Transcription/summary/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests
headers = {"Authorization": "<API_KEY>"}
params = {
    "video_no": "<VIDEO_ID>",
    "type": "<TYPE>",
    "unique_id": "<UNIQUE_ID>"
}

response = requests.get("https://api.memories.ai/serve/api/v1/generate_summary", headers=headers, params=params)

print("Status:", response.status_code)
try:
    print("Summary Response:", response.json())
except Exception:
    print("Response Text:", response.text)

```

## Request Parameters [​](https://memories.ai/docs/API/Transcription/summary/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| video\_no | query | string | Yes | Unique video number returned after upload |
| type | query | string | Yes | Type of summary to generate. Accepted values: `CHAPTER`, `TOPIC` |
| Authorization | header | string | Yes | Your API key for authentication |
| unique\_id | body | string | Yes | unique id |

* * *

## Response Example [​](https://memories.ai/docs/API/Transcription/summary/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": {
    "summary": "The video seems to capture a family in a parking lot, possibly dealing with a minor emergency or preparing to leave. The audio consists of fragmented speech, mainly a child's voice repeating \"Mommy, you're going to go,\" suggesting a departure or concern. The visual content shows the family approaching their car with shopping bags and a red backpack. There is no clear indication of what's happening, so it's hard to say definitively what the video is about without additional context.",
    "items": [\
      {\
        "description": "A woman, a boy, and another woman are walking towards a parked car in a parking lot. They are carrying shopping bags. The car doors are open.",\
        "title": "Arrival at the Car",\
        "start": "0"\
      },\
      {\
        "description": "The boy is looking at his phone near the open car door. One of the women is bending down, seemingly interacting with something on the ground near the car.",\
        "title": "Phone and Interaction on the Ground",\
        "start": "10"\
      },\
      {\
        "description": "Close-up view reveals objects on a concrete surface, including brown planters, a black pipe, a red tool, and a yellow broom or mop handle.",\
        "title": "Close-up of Objects on the Ground",\
        "start": "30"\
      }\
    ]
  },
  "success": true,
  "failed": false
}

```

## Response Structure [​](https://memories.ai/docs/API/Transcription/summary/\#response-structure "Direct link to Response Structure")

| Name | Type | Description |
| --- | --- | --- |
| code | string | Response status code |
| msg | string | Human-readable status message |
| data | object | Response data container |
| » videoNo | string | The unique video ID |
| » summary\_type | string | The requested summary type ( `CHAPTER` or `TOPIC`) |
| » summary | list of objects | List of structured summary segments |
| »» title | string | Title of the segment |
| »» start | float | Segment start time in seconds |
| »» end | float | Segment end time in seconds |
| »» description | string | Natural language description of the segment content |

## Notes [​](https://memories.ai/docs/API/Transcription/summary/\#notes "Direct link to Notes")

- Use `type=CHAPTER` for scene-based structural breakdown.
- Use `type=TOPIC` for semantic grouping of related content.
- Ensure the video has completed transcription before calling this API.

- [Prerequisites](https://memories.ai/docs/API/Transcription/summary/#prerequisites)
- [Host URL](https://memories.ai/docs/API/Transcription/summary/#host-url)
- [Endpoint](https://memories.ai/docs/API/Transcription/summary/#endpoint)
- [Request Example](https://memories.ai/docs/API/Transcription/summary/#request-example)
- [Request Parameters](https://memories.ai/docs/API/Transcription/summary/#request-parameters)
- [Response Example](https://memories.ai/docs/API/Transcription/summary/#response-example)
- [Response Structure](https://memories.ai/docs/API/Transcription/summary/#response-structure)
- [Notes](https://memories.ai/docs/API/Transcription/summary/#notes)