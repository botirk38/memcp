---
url: "https://memories.ai/docs/v1.0/MAVI-API/Metadata/"
title: "Search Video Metadata | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

MAVI stores metadata of uploaded videos to simplify developers' workflows. Developers can retrieve the metadata for all videos at once or flexibly fetch a subset of video metadata by using filtering parameters in their requests.

## Host URL [​](https://memories.ai/docs/v1.0/MAVI-API/Metadata/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

## Endpoint [​](https://memories.ai/docs/v1.0/MAVI-API/Metadata/\#endpoint "Direct link to Endpoint")

**GET** `/api/serve/video/searchDB`

## Request Example [​](https://memories.ai/docs/v1.0/MAVI-API/Metadata/\#request-example "Direct link to Request Example")

```codeBlockLines_e6Vv
import requests

headers = {"Authorization": "Bearer <YOUR_ACCESS_TOKEN>"} # access token
# Uncomment the line to search with filters; this filter will return parsed videos uploaded
# between 1740995860114 and 1740995860115 and return at most first 100 results.
# params={"startTime":1740995860114,"endTime":1740995860115,"videoStatus":"PARSE","page":1,"pageSize":100}
response = requests.get("https://mavi-backend.memories.ai/api/serve/video/searchDB",
                       # params=params,
                        headers=headers)

print(response.json())

```

Replace `YOUR_ACCESS_TOKEN` in the code above with your actual access token.

You can add filter conditions to the `params`, with the following available parameters:

- **startTime** (ms): Timestamp of the uploaded video (start time).
- **endTime** (ms): Timestamp of the uploaded video (end time).
- **videoStatus** ( `PARSE`, `UNPARSE`, `FAIL`): The processing status of the video.
- **page**: The page number for pagination — i.e. which range of results to retrieve
- **pageSize**: The number of elements per page.

## Request Parameters [​](https://memories.ai/docs/v1.0/MAVI-API/Metadata/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| startTime | query | number | No | timesstamp (ms) |
| endTime | query | number | No | timesstamp (ms) |
| videoStatus | query | string | No | PARSE, UNPARSE, FAIL |
| page | query | number | No | none |
| pageSize | query | string | No | Default 20; max 200 |
| Authorization | header | string | Yes | Authentication token |

## Response Example [​](https://memories.ai/docs/v1.0/MAVI-API/Metadata/\#response-example "Direct link to Response Example")

Status code **200**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "page": 0,
    "current": 0,
    "total": 0,
    "pageSize": 0,
    "videoData": [\
      {\
        "videoNo": "string",\
        "videoName": "string",\
        "videoStatus": "string",\
        "uploadTime": "string",\
        "duration": "string"\
      }\
    ]
  }
}

```

## Response Result [​](https://memories.ai/docs/v1.0/MAVI-API/Metadata/\#response-result "Direct link to Response Result")

| Status code | Status code msg | Description | Data |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline |

## Response Structure [​](https://memories.ai/docs/v1.0/MAVI-API/Metadata/\#response-structure "Direct link to Response Structure")

Status code **200**

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| code | string | true | none | none |
| msg | string | true | none | none |
| data | object | true | none | none |
| » page | number | false | none | total number of pages |
| » current | number | true | none | current page number |
| » total | number | true | none | total number of records |
| » pageSize | number | true | none | number of elements in the page |
| » videoData | \[object\] | true | none | JSON data |
| »» videoNo | string | true | none | video id |
| »» videoName | string | true | none | video name |
| »» videoStatus | string | true | none | video status |
| »» uploadTime | string | true | none | upload timestamp(ms) |
| »» duration | string | false | none | video length(seconds) |

- [Host URL](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#host-url)
- [Endpoint](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#endpoint)
- [Request Example](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#request-example)
- [Request Parameters](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#response-example)
- [Response Result](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#response-result)
- [Response Structure](https://memories.ai/docs/v1.0/MAVI-API/Metadata/#response-structure)