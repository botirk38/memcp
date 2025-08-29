/**
 * MCP Resources for Memories.ai
 */

import {
	type McpServer,
	ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";

const API_BASE_URL = "https://api.memories.ai";

export function registerResources(server: McpServer) {
	// Static resource for API documentation
	server.registerResource(
		"api-docs",
		"memories://docs",
		{
			title: "Memories.ai API Documentation",
			description: "Complete API documentation and capabilities",
			mimeType: "application/json",
		},
		async (uri) => ({
			contents: [
				{
					uri: uri.href,
					mimeType: "application/json",
					text: JSON.stringify(
						{
							name: "Memories.ai API",
							version: "v1.2",
							baseUrl: API_BASE_URL,
							capabilities: [
								"Video upload from files and URLs",
								"Semantic video search with natural language",
								"AI video chat with context and streaming responses",
								"Video transcription (audio/visual)",
								"Real-time status callbacks",
								"Video management and organization",
							],
							endpoints: {
								uploadFile: "/serve/api/v1/upload",
								uploadUrl: "/serve/api/v1/upload_url",
								search: "/serve/api/v1/search",
								chat: "/serve/api/v1/chat",
								listVideos: "/serve/api/v1/list_videos",
								deleteVideos: "/serve/api/v1/delete",
								checkStatus: "/serve/api/v1/status",
							},
							authentication:
								"API Key in Authorization header or query parameter",
							supportedFormats: [
								"h264 (.mp4, .mov)",
								"h265 (.mp4, .mov)",
								"vp9 (.webm)",
								"hevc (.mp4, .mov, .mkv)",
							],
							languages: ["English (prompts and chat only)"],
							searchTypes: [
								"BY_VIDEO: Search visual content, returns video numbers",
								"BY_AUDIO: Search audio content and transcripts",
								"BY_CLIP: Search and return specific video clips with timestamps",
							],
							videoStatuses: [
								"UNPARSE: Uploaded but not yet processed",
								"PARSE: Fully processed and ready for search/chat",
								"FAILED: Processing failed (check format/corruption)",
							],
							bestPractices: [
								"Always check video status before using search/chat features",
								"Use unique_id consistently across all operations",
								"Set up callback URLs for upload status notifications",
								"Use English-only prompts for search and chat",
								"Check supported video formats before uploading",
							],
						},
						null,
						2,
					),
				},
			],
		}),
	);

	// Dynamic resource for video details
	server.registerResource(
		"video",
		new ResourceTemplate("memories://video/{videoNo}", { list: undefined }),
		{
			title: "Video Details",
			description: "Get detailed information about a specific video",
		},
		async (uri, { videoNo }) => {
			try {
				return {
					contents: [
						{
							uri: uri.href,
							mimeType: "application/json",
							text: JSON.stringify(
								{
									videoNo,
									message:
										"Video details can be retrieved using the list-videos tool",
									note: "Use list-videos tool with video_no filter to get detailed information",
									usage: `Use: list-videos tool with video_no="${videoNo}" parameter`,
									relatedTools: [
										"list-videos: Get video metadata and status",
										"check-video-status: Check processing status",
										"search-videos: Find videos by content",
										"chat-with-videos: Ask questions about video content",
									],
								},
								null,
								2,
							),
						},
					],
				};
			} catch (error) {
				return {
					contents: [
						{
							uri: uri.href,
							mimeType: "application/json",
							text: JSON.stringify(
								{
									error:
										error instanceof Error ? error.message : "Unknown error",
									videoNo,
									suggestion:
										"Use the list-videos tool to get video information",
								},
								null,
								2,
							),
						},
					],
				};
			}
		},
	);

	// Resource for upload status information
	server.registerResource(
		"upload-status",
		"memories://upload-status",
		{
			title: "Upload Status Guide",
			description: "Information about video upload and processing statuses",
			mimeType: "text/markdown",
		},
		async (uri) => ({
			contents: [
				{
					uri: uri.href,
					mimeType: "text/markdown",
					text: `# Memories.ai Video Upload Status Guide

## Video Processing Statuses

### UNPARSE
- Video has been uploaded successfully
- Processing has not yet begun or is in progress
- Video is not yet available for search or chat operations
- Wait for status to change to PARSE before using AI features

### PARSE
- Video processing is complete
- Video is fully indexed and ready for use
- Available for search queries and chat interactions
- All AI features are accessible

### FAILED
- Video processing encountered an error
- Common causes:
  - Unsupported video format or codec
  - Corrupted video file
  - File too large or too short
  - Network interruption during processing

## Supported Video Formats
- **h264**: Most common format (.mp4, .mov)
- **h265**: High efficiency (.mp4, .mov) 
- **vp9**: Web optimized (.webm)
- **hevc**: High efficiency (.mp4, .mov, .mkv)

## Best Practices
1. Always check status before using AI features
2. Set up callback URLs for real-time status updates
3. Use supported formats to avoid FAILED status
4. Keep unique_id consistent across operations
5. Allow sufficient time for processing large videos

## Troubleshooting FAILED Status
1. Check video format compatibility
2. Verify file is not corrupted
3. Ensure video has both video and audio tracks (if using transcription)
4. Try re-uploading with a different format
5. Contact support if issues persist

## Status Checking
Use the \`check-video-status\` or \`list-videos\` tools to monitor processing progress.`,
				},
			],
		}),
	);
}
