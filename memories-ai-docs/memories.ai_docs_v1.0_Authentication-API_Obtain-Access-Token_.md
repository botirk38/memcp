---
url: "https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/"
title: "Obtain Access Token | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Obtaining an `accessToken` for MAVI-API requests is essential. This API also provides a `refreshToken` to obtain a new `accessToken` if the current one expires. The default expiration time for `accessToken` is 4 hours. Both `accessToken` and `refreshToken ` will be sent through callback URI provided in the request.

## Host URL [​](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/\#host-url "Direct link to Host URL")

- [https://mavi-backend.memories.ai](https://mavi-backend.memories.ai/)

## Endpoint [​](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/\#endpoint "Direct link to Endpoint")

**POST** `auth/api/token/getAccessToken`

- Rate limit: 50 requests per day.
  - `accessToken`: Valid for 2 hours, used for API authentication.
  - `refreshToken`: Valid for 2 months, used to renew the `accessToken`.

## Request Body            [​](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/\#request-body "Direct link to Request Body            ")

```codeBlockLines_e6Vv
{
  "clientId": "myxjDRvjN+osYha2DxNAuVlYVnpY26BU2pPJdCyVzJU=",
  "code": "xxxxxx"
}

```

## Request Parameters            [​](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/\#request-parameters "Direct link to Request Parameters            ")

| Name | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | No | Request payload |
| » clientId | body | string | Yes | Client ID |
| » code | body | string | Yes | Callback code |

## Response Example            [​](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/\#response-example "Direct link to Response Example            ")

Status code **200 OK**

```codeBlockLines_e6Vv
{
  "code": "string",
  "msg": "string",
  "data": {
    "accessToken": "string",
    "type": "string",
    "expiresIn": 0,
    "refreshToken": "string",
    "refreshExpiresIn": 0
  }
}

```

## Response Structure            [​](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/\#response-structure "Direct link to Response Structure            ")

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| code | string | Yes | Status code |
| msg | string | Yes | Message |
| data | object | Yes | Data object |
| » accessToken | string | Yes | Access token |
| » type | string | Yes | Token type |
| » expiresIn | integer | Yes | Token expiration time |
| » refreshToken | string | Yes | Refresh token |
| » refreshExpiresIn | integer | Yes | Refresh token expiration time |

- [Host URL](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/#host-url)
- [Endpoint](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/#endpoint)
- [Request Body](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/#request-body)
- [Request Parameters](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/#request-parameters)
- [Response Example](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/#response-example)
- [Response Structure](https://memories.ai/docs/v1.0/Authentication-API/Obtain-Access-Token/#response-structure)