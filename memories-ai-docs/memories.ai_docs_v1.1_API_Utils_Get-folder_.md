---
url: "https://memories.ai/docs/v1.1/API/Utils/Get-folder/"
title: "Get Folders | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.1**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.1

On this page

Use this API to retrieve all video folders associated with your account. This can be used to organize, filter, or group videos based on folder assignments.

## Prerequisites [​](https://memories.ai/docs/v1.1/API/Utils/Get-folder/\#prerequisites "Direct link to Prerequisites")

- You have already created or uploaded videos into folders.
- You have a valid memories.ai API key.

## Host URL [​](https://memories.ai/docs/v1.1/API/Utils/Get-folder/\#host-url "Direct link to Host URL")

- `https://api.memories.ai`

## Endpoint [​](https://memories.ai/docs/v1.1/API/Utils/Get-folder/\#endpoint "Direct link to Endpoint")

**GET** `/serve/api/video/get_folder`

```codeBlockLines_e6Vv
import requests

api_url = "https://api.memories.ai"
api_key = "<YOUR_API_KEY>"

url = f"{api_url}/serve/api/video/get_folder"
headers = {
    "Authorization": api_key
}

response = requests.get(url, headers=headers)

if response.status_code != 200:
    print("Failed to retrieve folders:", response.status_code)
    print(response.text)
else:
    result = response.json()
    folders = result.get("data", [])
    print(f"Retrieved {len(folders)} folders:")
    for folder in folders:
        print(f"- {folder.get('id')}: {folder.get('foldersName')}")

```

## Request Parameters [​](https://memories.ai/docs/v1.1/API/Utils/Get-folder/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| Authorization | header | string | Yes | Your API key for authentication |

## Response Example [​](https://memories.ai/docs/v1.1/API/Utils/Get-folder/\#response-example "Direct link to Response Example")

```codeBlockLines_e6Vv
{
  "code": "0000",
  "msg": "success",
  "data": [\
    {\
      "account": "xxx@gmail.com",\
      "foldersName": "Default folder",\
      "parentId": null,\
      "level": 1,\
      "id": "-1"\
    },\
    {\
      "account": "xxx@gmail.com",\
      "foldersName": "test",\
      "parentId": null,\
      "level": 1,\
      "id": "590235112738787328"\
    },\
    {\
      "account": "xxx@gmail.com",\
      "foldersName": "API",\
      "parentId": null,\
      "level": 1,\
      "id": "-2"\
    }\
  ],
  "failed": false,
  "success": true
}

```

## Response Structure [​](https://memories.ai/docs/v1.1/API/Utils/Get-folder/\#response-structure "Direct link to Response Structure")

| Name | Type | Description |
| --- | --- | --- |
| code | string | Response status code |
| msg | string | Human-readable status message |
| data | list of objects | List of folder metadata |
| » id | int | Unique folder identifier |
| » account | string | account username/email |
| » foldersName | string | Name of the folder |
| » parentId | string | parent folder id |
| » level | string | folder level |

## Notes [​](https://memories.ai/docs/v1.1/API/Utils/Get-folder/\#notes "Direct link to Notes")

- Folder IDs returned from this API can be used to filter videos in other APIs (e.g., `list_videos`).
- This API returns all folders available to the authenticated user.

- [Prerequisites](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#prerequisites)
- [Host URL](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#host-url)
- [Endpoint](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#endpoint)
- [Request Parameters](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#response-example)
- [Response Structure](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#response-structure)
- [Notes](https://memories.ai/docs/v1.1/API/Utils/Get-folder/#notes)