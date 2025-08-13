---
url: "https://memories.ai/docs/v1.0/overview/"
title: "API Overview | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/v1.0/overview/#__docusaurus_skipToContent_fallback)

This is documentation for Memories.ai **v1.0**, which is no longer actively maintained.

For up-to-date documentation, see the **[latest version](https://memories.ai/docs/overview/)** (v1.2).

Version: v1.0

On this page

There are two main parts of our API platform:

- Authentication API: to provide safety usage of MAVI API and protect developers' video data, the platform requires every developer to follow an O2O authentication procedure to get tokens for calling MAVI-API. In this way, we minimize the risk of your personal data/token being stolen or hacked.
- MAVI API is REST-centric and compatible with most programming languages.
- MAVI utilizes a callback mechanism to improve developers' efficiency. While video processing takes time, developer could provide a callback endpoint for MAVI to notify developer of video processing status.

## Architecture overview [​](https://memories.ai/docs/v1.0/overview/\#architecture-overview "Direct link to Architecture overview")

This diagram illustrates the architecture of MAVI video processing pipeline in the backend:
![](https://storage.googleapis.com/openinterx-luci/oepnInterX.png)

- [Architecture overview](https://memories.ai/docs/v1.0/overview/#architecture-overview)