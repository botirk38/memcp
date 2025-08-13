---
url: "https://memories.ai/docs/API/Upload/"
title: "Upload Video | Memories.ai"
---

[Skip to main content](https://memories.ai/docs/API/Upload/#__docusaurus_skipToContent_fallback)

Version: v1.2

On this page

Easily upload your video to memories.ai. Once uploaded, the video enters memories.ai’s processing pipeline, where it is analyzed and prepared for further use. You can check the processing status at any time via the API.

A `unique_id` is required when uploading your video and you can use it as a unique id for workspace, namespace or user management.

Optionally, include a callback URI in your request body to receive automatic status updates—no need to wait around for the results!

![upload](https://memories.ai/docs/assets/images/l_upload_video-a620cb5fadcdfc274f2dfc40be2d4e1d.png)

## Upload Methods [​](https://memories.ai/docs/API/Upload/\#upload-methods "Direct link to Upload Methods")

- [Upload from Local File](https://memories.ai/docs/API/Upload/Upload-from-local/) – Upload a video directly from your device.
- [Upload from URL](https://memories.ai/docs/API/Upload/Upload-from-url/) – Upload a video using a direct download link (public or signed URL).

## FAQ [​](https://memories.ai/docs/API/Upload/\#faq "Direct link to FAQ")

- If your video status shows **"FAILED"** shortly after uploading, it is most likely due to an unsupported [video codecs](https://memories.ai/docs/API/Upload/Upload-from-local/#prerequisites).

- [Upload Methods](https://memories.ai/docs/API/Upload/#upload-methods)
- [FAQ](https://memories.ai/docs/API/Upload/#faq)