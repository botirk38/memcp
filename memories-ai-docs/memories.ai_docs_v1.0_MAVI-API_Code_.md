---
url: "https://memories.ai/docs/v1.0/MAVI-API/Code/"
title: "Code | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/MAVI-API/Code/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Here are some common response code that developers may encounter when using the MAVI-API.

## Response code [​](https://memories.ai/docs/v1.0/MAVI-API/Code/\#response-code "Direct link to Response code")

| code | Description | solution |
| --- | --- | --- |
| 0000 | success | The API completes successfully |
| 0001 | parameter is incorrect | Check the correctness of the parameters. |
| 0429 | Request is too busy | The system is too busy. Please check if the API call limit has been exceeded or if the system is currently under high load. |
| 0409 | Duplicate requests are not allowed. | Some API does not allow duplicate operations such as deleteing a video |
| 0403 | Developer account has been disabled, please contact us to find out the reason | Contact us to find out the reason. |
| 0401 | Authorization is invalid or incorrect. Please check the correctness of the Authorization. | Try to re-acquire the token or re-authenticate. |

## VideoStatus enum [​](https://memories.ai/docs/v1.0/MAVI-API/Code/\#videostatus-enum "Direct link to VideoStatus enum")

The VideoStatus enum has three states: PARSE, UNPARSE and PARSE\_ERROR, representing success, pending, and failure, respectively. Failure to upload a video is very unlikely. If unfortunately, an PARSE\_ERROR occurs, please examine the video encoding format with our provided failure information in the API response. If the issue cannot be resolved, please contact us. We will always be there to improve our platform's developing experience.

- [Response code](https://memories.ai/docs/v1.0/MAVI-API/Code/#response-code)
- [VideoStatus enum](https://memories.ai/docs/v1.0/MAVI-API/Code/#videostatus-enum)