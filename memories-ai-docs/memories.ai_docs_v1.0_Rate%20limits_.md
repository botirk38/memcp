---
url: "https://memories.ai/docs/v1.0/Rate%20limits/"
title: "Rate limits | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/Rate%20limits/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Allocate the necessary service resources to maintain optimal performance for all users and ensure the smooth operation of the software.

## Rate-Limited interface [​](https://memories.ai/docs/v1.0/Rate%20limits/\#rate-limited-interface "Direct link to Rate-Limited interface")

The following are the throttling limits for each interface, defined by per-minute and 24-hour (daily) restrictions:

| Interface | minute | 24 hours |
| --- | --- | --- |
| update-video | 10 | 1000 |
| search-video-metadata | 200 | 1000 |
| search-video | 20 | 1000 |
| search-key-clip | 10 | 1000 |
| video-chat | 10 | 1500 |
| transcription-video | 20 | 2000 |
| transcription-audio | 50 | 4000 |
| get-transcription-task | 50 | 10000 |

## Exceeding rate limits [​](https://memories.ai/docs/v1.0/Rate%20limits/\#exceeding-rate-limits "Direct link to Exceeding rate limits")

If you exceed the rate limit, the API will return an 0429 error response. For example:

```codeBlockLines_e6Vv
{
  "code": "0429",
  "msg": "Request has exceeded the limit."
}

```

## Upgrade your plan [​](https://memories.ai/docs/v1.0/Rate%20limits/\#upgrade-your-plan "Direct link to Upgrade your plan")

After registering, you’ll receive an automatic space quota. If you exceed the standard limit, contact us to upgrade your service.

- [Rate-Limited interface](https://memories.ai/docs/v1.0/Rate%20limits/#rate-limited-interface)
- [Exceeding rate limits](https://memories.ai/docs/v1.0/Rate%20limits/#exceeding-rate-limits)
- [Upgrade your plan](https://memories.ai/docs/v1.0/Rate%20limits/#upgrade-your-plan)