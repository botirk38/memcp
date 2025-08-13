---
url: "https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/"
title: "Refresh Access Token | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Refresh the `accessToken` using the `refreshToken`. If the current token has expired, this API allows you to obtain a new `accessToken` using the `refreshToken`, eliminating the need to repeat the entire authentication process.

## Host URL [​](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

## Endpoint [​](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/\#endpoint "Direct link to Endpoint")

**POST** `auth/api/token/refreshAccessToken`

- Rate limit: 500 requests per day.

## Request Body [​](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/\#request-body "Direct link to Request Body")

```codeBlockLines_e6Vv
{
  "refreshToken": "xxxxxxxxxx"
}

```

## Request Parameters [​](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/\#request-parameters "Direct link to Request Parameters")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | Yes | Request payload |
| » refreshToken | body | string | Yes | Refresh token |

## Response Example [​](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/\#response-example "Direct link to Response Example")

Status code **200 OK**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "accessToken": "string",
    "expiresIn": 0,
    "type": "string"
  }
}

```

## Response Structure [​](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/\#response-structure "Direct link to Response Structure")

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| code | string | Yes | Status code |
| msg | string | Yes | Message |
| data | object | Yes | Data object |
| » accessToken | string | Yes | New access token |
| » expiresIn | integer | Yes | Token expiration time |
| » type | string | Yes | Token type |

- [Host URL](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/#host-url)
- [Endpoint](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/#endpoint)
- [Request Body](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/#response-example)
- [Response Structure](https://memories.ai/docs/v1.0/Authentication-API/Refresh-Access-Token/#response-structure)