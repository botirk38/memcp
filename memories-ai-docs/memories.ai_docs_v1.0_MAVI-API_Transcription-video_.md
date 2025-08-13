---
url: "https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/"
title: "Transcription video | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Transcription API converts visual and autio context of the video into text representations. You could transcribe an uploaded vidoe in two ways:

- `AUDIO`: Transcribing the video's audio content into text.
- `VIDEO`: Transcribing the video's visual content into text.

## Host URL [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

## Submit Transcription Task [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#submit-transcription-task "Direct link to Submit Transcription Task")

You can submit a transcription task through this interface with the following options:

- Choose between **AUDIO** or **VIDEO** transcription.
- Specify a **callback address** to receive the transcription results automatically.
- Opt **not to use a callback**—in this case, you can retrieve the transcription results using the query interface.

**POST** `/api/serve/video/subTranscription`

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests
headers = {"Authorization": "Bearer <YOUR_ACCESS_TOKEN>"} # access token
data = {"videoNo": "<VIDEO_NO>","type":"AUDIO/VIDEO","callBackURI":"<CALLBACK>"}
response = requests.post(
    "https://mavi-backend.memories.ai/api/serve/video/subTranscription",
    headers=headers,
    json=data
)
print(response.json())

```

Replace the placeholders in the code above with your actual values:

- `YOUR_ACCESS_TOKEN`: Your access token.
- `VIDEO_NO`: The unique video number.
- `AUDIO` or `VIDEO`: The transcription type (choose one).
- `CALLBACK`: (Optional) A publicly accessible URL endpoint,

## Request Body [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
{
  "videoNo": "string",
  "type": "string",
  "callBackURI": "string"
}

```

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | authorization token |
| videoNo | body | string | Yes | video number |
| type | body | string | Yes | transcription type: `AUDIO`, `VIDEO` |
| callBackURI | body | string | No | callback address |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "taskNo": "string"
  }
}

```

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| code | string | true | response code |
| msg | string | true | message with response code |
| data | object | true | JSON data |
| » taskNo | string | true | task number |

## GET Transcription Content [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#get-transcription-content "Direct link to GET Transcription Content")

You can get the transcription content of the video through this interface, you need to provide the video number.

**GET** `/api/serve/video/getTranscription`

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#request-example-1 "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests
headers = {"Authorization": "Bearer <YOUR_ACCESS_TOKEN>"} # access token
data={"taskNo":"<TASK_NO>"}
response = requests.get(
    "https://mavi-backend.memories.ai/api/serve/video/getTranscription",
    headers=headers,
    params=data
)
print(response.json())

```

Replace the YOUR\_ACCESS\_TOKEN in the above code as your access token, TASK\_NO as your task number, you can get the transcription content of the video through the task number.

## Request Parameters [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | authorization token |
| taskNo | query | string | Yes | task number |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/\#response-example-1 "Direct link to Response Example")

If you provide a **callback URL** when submitting the task, a mesage containing content inside **data** in the following example will be sent to **callback URL** automatically to notify the status of the task.

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "status": "FINISH",
    "type": "AUDIO",
    "videoNo": "videoNo_fd30e4c3700c",
    "taskNo": "taskNo_0a3f11298b9e",
    "transcriptions": [\
      {\
        "id": 0,\
        "startTime": 0,\
        "endTime": 0,\
        "content": "content_0e5150607a47"\
      }\
    ]
  }
}

```

```codeBlockLines_e6Vv

```

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| code | string | true | response code |
| msg | string | true | message with response code |
| data | object | true | JSON data |
| » taskNo | string | true | task number |
| » status | string | true | transcription status: `FINISH`, `UNFINISHED` |
| » type | string | true | transcription type |
| » videoNo | string | true | video number |
| » transcriptions | array | true | transcription content |
| »» id | number | true | transcription number |
| »» startTime | number | true | start time |
| »» endTime | number | true | end time |
| »» content | string | true | transcription content |

- [Host URL](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#host-url)
- [Submit Transcription Task](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#submit-transcription-task)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#request-example)
- [Request Body](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#request-body)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#response-example)
- [GET Transcription Content](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#get-transcription-content)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#request-example-1)
- [Request Parameters](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Transcription-video/#response-example-1)