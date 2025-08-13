---
url: "https://memories.ai/docs/v1.0/MAVI-API/Upload/"
title: "Upload Video | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Upload/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Use this API to upload your video to MAVI! Once the video is uploaded, it enters the MAVI video processing pipeline, and you can query the status of video processing at any time. Additionally, by providing a callback URI in the request body, MAVI can automatically notify you about the status, saving you hassle of waiting in front your screen!

## Host URL [​](https://memories.ai/docs/v1.0/MAVI-API/Upload/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

## Endpoint [​](https://memories.ai/docs/v1.0/MAVI-API/Upload/\#endpoint "Direct link to Endpoint")

**POST** `/api/serve/video/upload`

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Upload/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization":"Bearer <YOUR_ACCESS_TOKEN>" } # #YOUR_ACCESS_TOKEN
data = {"file": ("<MY_VIDEO_NAME>", open("<VIDEO_FILE_PATCH>", "rb"), "video/mp4")}
params={"callBackUri":"<YOUR_CALLBACK_URI>"}
response = requests.post(
    "https://mavi-backend.memories.ai/api/serve/video/upload",
    files=data,
    params=params,
    headers=headers
    )
print(response.json())

```

Replace YOUR\_ACCESS\_TOKEN in the code above with your actual access token, MY\_VIDEO\_NAME with your video's name (including the file extension, e.g., .mp4), VIDEO\_FILE\_PATH with the path to your video file, and YOUR\_CALLBACK\_URI with your public callback URL. Ensure that the callback URL is publicly accessible, as the resolution results will be sent to this address via a POST request with the following request body:

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

## Request Body [​](https://memories.ai/docs/v1.0/MAVI-API/Upload/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
file: ""

```

## Request Parameters [​](https://memories.ai/docs/v1.0/MAVI-API/Upload/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| callBackUri | query | string | Yes | Callback URI to notify on successful parsing |
| Authorization | header | string | Yes | Authorization token (if required) |
| body | body | object | Yes | Request payload |
| » file | body | string (binary) | Yes | Video file to upload |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Upload/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "videoNo": "string",
    "videoName": "string",
    "videoStatus": "string",
    "uploadTime": "string",
    "duration": "string"
  }
}

```

## Response Structure [​](https://memories.ai/docs/v1.0/MAVI-API/Upload/\#response-structure "Direct link to Response Structure")

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| code | string | Yes | Status code |
| msg | string | Yes | Message |
| data | object | Yes | Data object |
| » videoNo | string | Yes | Video identification number |
| » videoName | string | Yes | Name of the video |
| » videoStatus | string | Yes | Status of the video |
| » uploadTime | string | Yes | Video upload timestamp |
| » duration | string | Yes | Duration of the video |

**Note: The callBackUri field will actively notify you of the task status after the video upload is complete and the parsing task is finished.**

- [Host URL](https://memories.ai/docs/v1.0/MAVI-API/Upload/#host-url)
- [Endpoint](https://memories.ai/docs/v1.0/MAVI-API/Upload/#endpoint)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Upload/#request-example)
- [Request Body](https://memories.ai/docs/v1.0/MAVI-API/Upload/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.0/MAVI-API/Upload/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Upload/#response-example)
- [Response Structure](https://memories.ai/docs/v1.0/MAVI-API/Upload/#response-structure)