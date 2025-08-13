---
url: "https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/"
title: "Upload Video from URL | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.1**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/API/Upload/Upload-from-url/)** (v1.2).

Version: v1.1

On this page

Use this API to upload your file from a direct downloadable url. Example:

```codeBlockLines_e6Vv
http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4

```

## Prerequisites [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#prerequisites "Direct link to Prerequisites")

- You’re familiar with the concepts described on the [Platform overview](https://memories.ai/docs/v1.1/overview/) page.
- You have created a memories.ai API key.
- The videos from url must meet the following requirements to ensure a successful encoding process:
  - **Video and audio formats**: The video files must be encoded in `h264`, `h265`, `vp9`, or `hevc`.
  - **Audio track**: If you intend to use the [audio transcription](https://memories.ai/docs/v1.1/API/Transcription/audio-transcription/) feature, the video you are uploading must contain an audio track.
- The url must be a direct download link to the video file. This URL can be accessed via a GET request to download or stream the video content. No authentication is required (unless otherwise noted).

## Host URL [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#endpoint "Direct link to Endpoint")

**POST** `/serve/api/video/upload_url`

* * *

## Request Example [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests
headers = {"Authorization": "<API_KEY>"}  # API key

# Video file details
data = {
    "url": "<URL>",
    "callback": "<YOUR_CALLBACK_URI>" # Optional
}

response = requests.post(
    "https://api.memories.ai/serve/api/video/upload_url",
    data=data,
    headers=headers
)

print(response.json())


```

Replace the following placeholders:

- `API_KEY`: Your actual memories.ai API key.
- `URL`: URL to your video.
- `YOUR_CALLBACK_URI`: A publicly accessible URL where memories.ai can send video status updates.

## Callback Notification Payload [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#callback-notification-payload "Direct link to Callback Notification Payload")

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

## Request Body [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
file: "http://storage.cloud/xxxx.mp4"
callback: "http://xxx.callback.com"

```

## Request Parameters [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| callback | query | string | No | Callback URI to notify on successful parsing |
| Authorization | header | string | Yes | Authorization API key |
| url | body | string | Yes | URL of the video |

## Response Example [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#response-example "Direct link to Response Example")

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

## Response Structure [​](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/\#response-structure "Direct link to Response Structure")

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

- [Prerequisites](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#prerequisites)
- [Host URL](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#host-url)
- [Endpoint](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#endpoint)
- [Request Example](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#request-example)
- [Callback Notification Payload](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#callback-notification-payload)
- [Request Body](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#response-example)
- [Response Structure](https://memories.ai/docs/v1.1/API/Upload/Upload-from-url/#response-structure)