---
url: "https://memories.ai/docs/overview/"
title: "API Overview | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/overview/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

This section provides an overview and key concepts of the memories.ai API platform:

- **Two Authentication Methods**:
  - **API Key**: Easily call the memories.ai API using your personal API key, available in your memories.ai account.
  - **OAuth2 Authentication (O2O)**: A two-step verification process better suited for business use cases that require enhanced security.
- **REST-Centric Design**:

Memories.ai APIs follow REST principles and are compatible with most modern programming languages.

- **Callback Mechanism**:

Video processing can take time. To streamline workflow, developers can provide a callback URL. Memories.ai will notify this endpoint once video processing is complete — improving automation and efficiency.


## Architecture Overview [​](https://memories.ai/docs/overview/\#architecture-overview "Direct link to Architecture Overview")

The diagram below illustrates the architecture of memories.ai’s backend video processing pipeline:

![Architecture overview](https://memories.ai/docs/assets/images/l_architecture_overview-bf06baac0c3f0bd9b8157616767df763.png)

## Encoding [​](https://memories.ai/docs/overview/\#encoding "Direct link to Encoding")

Encoding refers to the process of transcoding your uploaded video and generating an index for efficient retrieval. It preserves key information from the video and links all your content into a structured knowledge graph. This one-time process optimizes downstream tasks such as semantic search, retrieval, and interaction.

## Multimodality [​](https://memories.ai/docs/overview/\#multimodality "Direct link to Multimodality")

Memories.ai uses a cutting-edge multimodal approach to analyze videos comprehensively. It integrates information from visual, audio, text, and metadata sources to build a richer, more human-like understanding of the content.

## Callback Mechanism [​](https://memories.ai/docs/overview/\#callback-mechanism "Direct link to Callback Mechanism")

When creating your memories.ai API key, you can optionally register a public callback URL (such as a server or test endpoint). This allows your application or server to automatically receive status updates on tasks like video indexing or processing.

To try this feature, you can use tools like [Beeceptor](https://beeceptor.com/) to quickly create a temporary test endpoint.

- [Architecture Overview](https://memories.ai/docs/overview/#architecture-overview)
- [Encoding](https://memories.ai/docs/overview/#encoding)
- [Multimodality](https://memories.ai/docs/overview/#multimodality)
- [Callback Mechanism](https://memories.ai/docs/overview/#callback-mechanism)