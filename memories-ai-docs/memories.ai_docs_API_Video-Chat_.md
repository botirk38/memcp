---
url: "https://memories.ai/docs/API/Video-Chat/"
title: "Video Chat | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Video-Chat/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Developers can interact with an LLM-based AI assistant using the context from one or more videos. By providing the `videoNos`, developers can ask the LLM to analyze, summarize, annotate, or perform other reasoning tasks across all uploaded videos. This API also supports streaming responses to reduce latency during generation.

* * *

![upload](https://memories.ai/docs/assets/images/video_chat-ef1f1ef518a957840e653075ad27f9f8.png)

## Prerequisites [​](https://memories.ai/docs/API/Video-Chat/\#prerequisites "Direct link to Prerequisites")

- You have created a memories.ai API key.
- You have uploaded a video via the [Upload API](https://memories.ai/docs/API/Upload/) and obtained its `videoNo`.
- The video is currently in the `PARSE` status.

* * *

## Language Limitations [​](https://memories.ai/docs/API/Video-Chat/\#language-limitations "Direct link to Language Limitations")

- Currently, only prompts in **English** are supported.
- Chinese, French, Spanish, and other languages are not supported.

* * *

## Host URL [​](https://memories.ai/docs/API/Video-Chat/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/API/Video-Chat/\#endpoint "Direct link to Endpoint")

**POST** `/serve/api/v1/chat`

* * *

## Request Example [​](https://memories.ai/docs/API/Video-Chat/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests
import json

headers = {
    "Authorization": "<API_KEY>",
    "Content-Type": "application/json",
    "Accept": "text/event-stream"
}

payload = {
    "video_nos": ["<VIDEO_ID_1>", "<VIDEO_ID_2>"],  # List of video IDs to chat about
    "prompt": "Summarize the emotional moments in these videos",  # User query
    "session_id": "<SESSION_ID>",  # Chat session ID
    "unique_id": "<UNIQUE_ID>",
}

response = requests.post(
    "https://api.memories.ai/serve/api/v1/chat",
    headers=headers,
    data=json.dumps(payload),
    stream=True
)

if response.status_code != 200:
    print(response.status_code)
    print(response.text)
else:
    try:
        for line in response.iter_lines(decode_unicode=True):
            if line:
                print(line)
                if line.strip().lower() == 'data:"done"':
                    print("\n")
                    break
                if line.startswith("data:"):
                    print(line.replace("data:", "").strip(), end="", flush=True)
    except Exception as e:
        print(str(e))

```

## Request Body [​](https://memories.ai/docs/API/Video-Chat/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
{
  "videoNos": [\
    "string"\
  ],
  "prompt": "string",
  "session_id": "123456",
  "unique_id": "1",
}

```

## Request Parameters [​](https://memories.ai/docs/API/Video-Chat/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | API key used for authorization |
| video\_nos | body | \[string\] | Yes | list of video numbers |
| prompt | body | string | Yes | natural language prompt |
| session\_id | body | int | No | ID of the chat session |
| unique\_id | body | string | Yes | unique id |

## Response Example [​](https://memories.ai/docs/API/Video-Chat/\#response-example "Direct link to Response Example")

🧠 Thinking Message

```codeBlockLines_e6Vv
{
    "type": "thinking",
    "title": "Based on selected videos, fetch detailed information",
    "content": "Okay, the user wants a \"Video summary.\" I've been given some selected videos and need to fetch their detailed information to understand their content. This means I need to go",
    "sessionId": "606120397607260160"
}

```

🔁 Reference Message (ref)

```codeBlockLines_e6Vv
{
	"type": "ref",
	"sessionId": "606143186439766016",
	"ref": [{\
		"video": {\
			"duration": "10",\
			"video_no": "VI606140356924534784",\
			"video_name": "test_video_gz_visual_understanding_fuse_s9_video_fuse_4_video_fuse_4"\
		},\
		"refItems": [{\
			"videoNo": "VI606140356924534784",\
			"startTime": 23,\
			"type": "keyframe"\
		}\
		{\
			"videoNo": "VI606140356924534784",\
			"startTime": 30,\
			"type": "visual_ts",\
			"endTime": 36,\
			"text": "A close-up view shows a collection of items on a concrete surface. To the left, two brown, round objects resembling small barrels or planters are visible. One has a blue lid or insert. Next to them, a black corrugated pipe is partially visible, along with a red flexible tube and a yellow pole with a red tip. A grey, textured wall or fence dominates the right side of the frame, with wooden planks visible at the top right."\
		},{\
			"videoNo": "VI606140356924534784",\
			"startTime": 30,\
			"type": "audio_ts",\
			"endTime": 36,\
			"text": "A close-up view shows a collection of items on a concrete surface. To the left, two brown, round objects resembling small barrels or planters are visible. One has a blue lid or insert. Next to them, a black corrugated pipe is partially visible, along with a red flexible tube and a yellow pole with a red tip. A grey, textured wall or fence dominates the right side of the frame, with wooden planks visible at the top right."\
		}\
]\
	}]
}

```

💬 Content Message

```codeBlockLines_e6Vv
{
  "type": "content",
  "role": "assistant",
  "content": "A\" shape, is suggested to be inspired by Eiffel's past",
  "sessionId": "606122521255088128"
}

```

✅ Response End Example
Success Response (Status Code: 200)

```codeBlockLines_e6Vv
{
  "code": "SUCCESS",
  "data": "Done"
}

```

⚠️ Error End Conditions
Any final response where "data" is not "Done" is considered an error. Common examples include:
"data": "Error"
"data": "No videos found for the provided video numbers."
"data": "user don't login"
"data": "Video is not parsed:"

## Response End Example [​](https://memories.ai/docs/API/Video-Chat/\#response-end-example "Direct link to Response End Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "SUCCESS",
  "data": "Done"
}

```

## Response Result [​](https://memories.ai/docs/API/Video-Chat/\#response-result "Direct link to Response Result")

| Status code | Status code msg | Description | Data |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline |

## Response Structure [​](https://memories.ai/docs/API/Video-Chat/\#response-structure "Direct link to Response Structure")

Status code **200**

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| code | string | true | none | Response code |
| data | object or string | true | none | JSON data. `"Done"` on success; error message string or structured data otherwise |
| type | string | true | enum | Type of message, e.g., `"thinking"`, `"ref"`, `"content"` |
| title | string | false | none | Title of the thinking message (used when `type` is `"thinking"`) |
| content | string | false | none | Text content of the message (used in `"thinking"` or `"content"` types) |
| sessionId | string | true | UUID/ID | ID of the current session |
| role | string | false | enum | Role of the responder; currently used with `"assistant"` |
| ref | array | false | none | List of reference objects containing video and timestamp-based metadata |
| video | object | true | nested | Video metadata (only when `type` is `"ref"`) |
| video\_no | string | true | none | Unique video identifier |
| video\_name | string | true | none | Name of the video |
| duration | string or number | true | seconds | Duration of the video |
| refItems | array | true | none | Reference annotations such as `keyframe`, `visual_ts`, `audio_ts` |
| videoNo | string | true | none | Video identifier in `refItems` (redundant with `video_no`) |
| startTime | number | true | seconds | Start timestamp of the referenced segment |
| endTime | number | optional | seconds | End timestamp (if applicable, e.g., for `visual_ts` or `audio_ts`) |
| text | string | optional | none | Transcribed or described content of the referenced segment |

- [Prerequisites](https://memories.ai/docs/API/Video-Chat/#prerequisites)
- [Language Limitations](https://memories.ai/docs/API/Video-Chat/#language-limitations)
- [Host URL](https://memories.ai/docs/API/Video-Chat/#host-url)
- [Endpoint](https://memories.ai/docs/API/Video-Chat/#endpoint)
- [Request Example](https://memories.ai/docs/API/Video-Chat/#request-example)
- [Request Body](https://memories.ai/docs/API/Video-Chat/#request-body)
- [Request Parameters](https://memories.ai/docs/API/Video-Chat/#request-parameters)
- [Response Example](https://memories.ai/docs/API/Video-Chat/#response-example)
- [Response End Example](https://memories.ai/docs/API/Video-Chat/#response-end-example)
- [Response Result](https://memories.ai/docs/API/Video-Chat/#response-result)
- [Response Structure](https://memories.ai/docs/API/Video-Chat/#response-structure)