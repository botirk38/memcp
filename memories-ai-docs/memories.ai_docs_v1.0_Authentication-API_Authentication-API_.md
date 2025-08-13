---
url: "https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/"
title: "Authentication API | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/)** (v1.2).

Version: v1.0

On this page

Welcome to our API service. This guide will help you get started with using our API.

## 1\. Prerequisites [​](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/\#1-prerequisites "Direct link to 1. Prerequisites")

- A valid **Mavi account**
- API key (obtained after registration)

## 2\. Registering a Mavi Account [​](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/\#2-registering-a-mavi-account "Direct link to 2. Registering a Mavi Account")

To use our API, you first need a Mavi account. Follow these steps:

1. Go to the [Mavi Login Page](https://mavi.openinterx.com/login).
2. Sign in using Google login to automatically complete registration.
3. Follow the application process on our API developer page as outlined below.

### 3.1 Create an API Key [​](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/\#31-create-an-api-key "Direct link to 3.1 Create an API Key")

Once logged in, create an API key:

![mavi-key](https://memories.ai/docs/assets/images/mavi-key-71329974a42d094bc8701d728f1cfa41.png)

### 3.2 Authorize and Set Up the Callback URL [​](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/\#32-authorize-and-set-up-the-callback-url "Direct link to 3.2 Authorize and Set Up the Callback URL")

After creating the API key:

- Click **Authorize** and fill in the **callback URL**. This URL is used to notify you of the code.
- The `code` will be sent to the callback URL every 10 minutes in this format: [https://xxxx.com?code=XXXXX&clientId=XXX&state=xxxxx](https://xxxx.com/?code=XXXXX&clientId=XXX&state=xxxxx); when the next `code` arrives, the last one will expire to ensure safety.
- The `clientId` is a unique id for your MAVI account.
- The `state` is generated using `MD5(apikey)` to assist with authentication.

Images for reference:

![API key Step 1](https://memories.ai/docs/assets/images/mavi-key_token_1-70aafbdfc7974575d9fe848ebe914951.png)

![API key Step 2](https://memories.ai/docs/assets/images/mavi-key_token_2-f8581540084c16f203049621e17fa60e.png)

### 3.3 Retrieve and Refresh Access Token [​](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/\#33-retrieve-and-refresh-access-token "Direct link to 3.3 Retrieve and Refresh Access Token")

- Call the `getAccessToken` interface with the `code` and `clientId` to receive an `accessToken`.
- The **valid time** of the `accessToken` is specified in the returned parameters.
- You will also receive a `refreshToken`. When the `accessToken` expires, use the `refreshToken` to obtain a new one.
- If the `refreshToken` expires, **reauthorization is required**.

- [1\. Prerequisites](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/#1-prerequisites)
- [2\. Registering a Mavi Account](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/#2-registering-a-mavi-account)
  - [3.1 Create an API Key](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/#31-create-an-api-key)
  - [3.2 Authorize and Set Up the Callback URL](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/#32-authorize-and-set-up-the-callback-url)
  - [3.3 Retrieve and Refresh Access Token](https://memories.ai/docs/v1.0/Authentication-API/Authentication-API/#33-retrieve-and-refresh-access-token)