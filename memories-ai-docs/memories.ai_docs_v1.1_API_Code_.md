---
url: "https://memories.ai/docs/v1.1/API/Code/"
title: "Code | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.1/API/Code/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.1**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/API/Code/)** (v1.2).

Version: v1.1

On this page

Here are some common response codes that developers may encounter when using the memories.ai API.

## Response Codes [​](https://memories.ai/docs/v1.1/API/Code/\#response-codes "Direct link to Response Codes")

| Code | Description | Solution |
| --- | --- | --- |
| `0000` | Success | The API completed successfully. |
| `0001` / `0003` | One or more parameters are incorrect | Check that all parameters are correct and meet the API requirements. |
| `0429` | Request is too busy | The system is under heavy load. Check if the API call limit has been exceeded or try again later. |
| `0409` | Duplicate requests are not allowed | Some APIs do not allow duplicate operations (e.g., deleting a video multiple times). |
| `0403` | Developer account has been disabled. | Contact us to learn more and resolve the issue. |
| `0401` | Authorization is invalid or incorrect. | Try re-authenticating or re-acquiring the token. |
| `0402` | You don’t have enough points. | Try depositing more credits or contacting sales. |
| `9009` | Permission denied. | Check your API key validness. |

* * *

## `VideoStatus` Enum [​](https://memories.ai/docs/v1.1/API/Code/\#videostatus-enum "Direct link to videostatus-enum")

The `VideoStatus` enum has three possible values:

- `PARSE`: The video was successfully parsed.
- `UNPARSE`: The video is still being processed or pending parsing.
- `PARSE_ERROR`: Parsing failed due to video encoding or content issues.

> Failure to upload or parse a video is very rare.
>
> If a `PARSE_ERROR` occurs, please check the video encoding format using the failure details provided in the API response.
>
> If the issue persists, don't hesitate to contact us. We're here to support you and continuously improve your developer experience.

- [Response Codes](https://memories.ai/docs/v1.1/API/Code/#response-codes)
- [`VideoStatus` Enum](https://memories.ai/docs/v1.1/API/Code/#videostatus-enum)