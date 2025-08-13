---
url: "https://memories.ai/docs/rate-limits/"
title: "Rate Limits | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/rate-limits/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Rate limiting helps ensure optimal performance and smooth operation for all users by allocating resources efficiently.

## Rate-Limited Interfaces [​](https://memories.ai/docs/rate-limits/\#rate-limited-interfaces "Direct link to Rate-Limited Interfaces")

The following are the throttling limits for each interface, defined by per-minute and daily (24-hour) usage caps:

| Interface | Query Per Second |
| --- | --- |
| Upload | 1 |
| Search | 10 |
| Chat | 1 |
| Video Transcription | 5 |
| Audio Transcription | 5 |
| Summary | 5 |
| List Videos | 5 |
| List Sessions | 5 |
| Delete Videos | 5 |

## Exceeding Rate Limits [​](https://memories.ai/docs/rate-limits/\#exceeding-rate-limits "Direct link to Exceeding Rate Limits")

If you exceed a rate limit, the API will return a `0429` error response. For example:

```codeBlockLines_e6Vv
{
  "code": "0429",
  "msg": "Request has exceeded the limit."
}

```

## Upgrade your plan [​](https://memories.ai/docs/rate-limits/\#upgrade-your-plan "Direct link to Upgrade your plan")

Each newly registered user receives $10 in free API credit. Once this credit is used up, your service will be paused.
To continue using the API, simply recharge your account — service will automatically resume upon successful payment.

- [Rate-Limited Interfaces](https://memories.ai/docs/rate-limits/#rate-limited-interfaces)
- [Exceeding Rate Limits](https://memories.ai/docs/rate-limits/#exceeding-rate-limits)
- [Upgrade your plan](https://memories.ai/docs/rate-limits/#upgrade-your-plan)