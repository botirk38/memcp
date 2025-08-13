---
url: "https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/"
title: "Upload Video from File | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.1**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/API/Upload/Upload-from-local/)** (v1.2).

Version: v1.1

On this page

Use this API to upload your file from your local storage.

## Prerequisites [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#prerequisites "Direct link to Prerequisites")

- You’re familiar with the concepts described on the [Platform overview](https://memories.ai/docs/v1.1/overview/) page.
- You have created a memories.ai API key.
- The videos must meet the following requirements to ensure a successful encoding process:
  - **Video and audio formats**: The video files must be encoded in `h264`, `h265`, `vp9`, or `hevc`.
  - **Audio track**: If you intend to use the [audio transcription](https://memories.ai/docs/v1.1/API/Transcription/audio-transcription/) feature, the video you are uploading must contain an audio track.

## Host URL [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#endpoint "Direct link to Endpoint")

**POST** `/serve/api/video/upload`

* * *

## Request Example [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import os
import requests
headers = {"Authorization": "<API_KEY>"}  # API key
file_path = "<VIDEO_FILE_PATH>"
# Video file details
files = {
    "file": (os.path.basename(file_path), open(file_path, 'rb'), "video/mp4")
}

# Optional callback URL for task status notifications
data = {"callback": "<YOUR_CALLBACK_URI>"} # Optional

response = requests.post(
    "https://api.memories.ai/serve/api/video/upload",
    files=files,
    data=data,
    headers=headers
)

print(response.json())


```

Replace the following placeholders:

- `API_KEY`: Your actual memories.ai API key.

- `MY_VIDEO_NAME`: The name of your video file (e.g., example.mp4).

- `VIDEO_FILE_PATH`: Full path to your video file.

- `YOUR_CALLBACK_URI`: A publicly accessible URL where memories.ai can send video status updates.


## Callback Notification Payload [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#callback-notification-payload "Direct link to Callback Notification Payload")

If you provide a callBackUri, memories.ai will send a POST request to it once the video has been uploaded or parsed.

```codeBlockLines_e6Vv
{
  "videoNo": "mavi_video_554046065381212160",
  "clientId": "d7a7427b502df6c8e31de003675b7b77",
  "status": "PARSE"
}

```

The callback request body includes the following fields:

- **videoNo**: The unique video number.
- **clientId**: Identifies the client that is being used to upload the video.
- **status**: The processing status of the video.

The **status** field can have one of the following values:

- `"PARSE"` – The video is being processed.
- `"UNPARSE"` – The video has not been processed.
- `"FAIL"` – The video processing failed.

## Request Body [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
file: ""

```

## Request Parameters [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| callback | query | string | No | Callback URI to notify on successful parsing |
| Authorization | header | string | Yes | Authorization API key |
| file | body | string (binary) | Yes | Video file to upload |

## Response Example [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": {
    "videoNo": "mavi_video_568102998803353600",
    "videoName": "mavi_api_video_1be6a69f3c6e49bf986235d68807ab1f",
    "videoStatus": "UNPARSE",
    "uploadTime": "1744905509814"
  }
}

```

## Response Structure [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/\#response-structure "Direct link to Response Structure")

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| code | string | Yes | Status code |
| msg | string | Yes | Message |
| data | object | Yes | Data object |
| » videoNo | string | Yes | Video identification number |
| » videoName | string | Yes | Name of the video |
| » videoStatus | string | Yes | Status of the video |
| » uploadTime | string | Yes | Video upload timestamp |

**Note: The callBackUri field will actively notify you of the task status after the video upload is complete and the parsing task is finished.**

- [Prerequisites](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#prerequisites)
- [Host URL](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#host-url)
- [Endpoint](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#endpoint)
- [Request Example](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#request-example)
- [Callback Notification Payload](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#callback-notification-payload)
- [Request Body](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#response-example)
- [Response Structure](https://memories.ai/docs/v1.1/API/Upload/Upload-from-local/#response-structure)