/**
 * Upload-related MCP tools
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { MemoriesAiClient } from "../clients/memories.js";
import { getApiKey } from "../utils/api-key.js";
import {
	getVideoMimeType,
	isSupportedVideoFormat,
} from "../utils/mime-types.js";

export function registerUploadTools(
	server: McpServer,
	client: MemoriesAiClient,
) {
	// Upload Video from File
	server.registerTool(
		"upload-video-file",
		{
			title: "Upload Video from File",
			description: "Upload a video file to Memories.ai from local storage",
			inputSchema: {
				file_path: z.string().describe("Path to the video file to upload"),
				unique_id: z
					.string()
					.describe("Unique ID for workspace/namespace/user identification"),
				callback: z
					.string()
					.url()
					.optional()
					.describe("Optional callback URL for status notifications"),
				video_name: z
					.string()
					.optional()
					.describe("Optional custom name for the video"),
				api_key: z
					.string()
					.optional()
					.describe(
						"Optional Memories.ai API key (takes precedence over environment variable)",
					),
			},
		},
		async ({ file_path, unique_id, callback, video_name, api_key }) => {
			try {
				// Validate API key
				const resolvedApiKey = getApiKey(api_key);

				// Check if file exists
				if (!fs.existsSync(file_path)) {
					throw new Error(`File not found: ${file_path}`);
				}

				// Get file stats
				const stats = fs.statSync(file_path);
				if (!stats.isFile()) {
					throw new Error(`Path is not a file: ${file_path}`);
				}

				// Check file format
				const fileExtension = path.extname(file_path);
				if (!isSupportedVideoFormat(fileExtension)) {
					throw new Error(
						`Unsupported video format: ${fileExtension}. Supported formats: h264, h265, vp9, hevc (typically .mp4, .mov, .webm, .mkv)`,
					);
				}

				// Read file as buffer
				const fileBuffer = fs.readFileSync(file_path);
				const fileName = video_name || path.basename(file_path);

				// Create a Blob from the buffer
				const blob = new Blob([fileBuffer], {
					type: getVideoMimeType(fileExtension),
				});

				// Upload using the type-safe client
				const response = await client.uploadFromFile(blob, unique_id, {
					callback,
					apiKey: resolvedApiKey,
				});

				const videoNo = response.data.videoNo;
				const videoStatus = response.data.videoStatus;

				return {
					content: [
						{
							type: "text",
							text: `File upload completed successfully!

File: ${file_path}
Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB
Name: ${fileName}
Unique ID: ${unique_id}
Video No: ${videoNo}
Status: ${videoStatus}

Response:
${JSON.stringify(response, null, 2)}`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: "text",
							text: `Error uploading file: ${error instanceof Error ? error.message : "Unknown error"}

Troubleshooting:
- Ensure the file path is correct and accessible
- Check that the file is a supported video format (h264, h265, vp9, hevc)
- Verify the file isn't corrupted or too large
- Ensure you have a valid API key
- Consider using upload-video-url if the file is accessible via URL`,
						},
					],
					isError: true,
				};
			}
		},
	);

	// Upload Video from URL
	server.registerTool(
		"upload-video-url",
		{
			title: "Upload Video from URL",
			description: "Upload a video to Memories.ai from a public or signed URL",
			inputSchema: {
				url: z
					.string()
					.url()
					.describe("Public or signed URL of the video to upload"),
				unique_id: z
					.string()
					.describe("Unique ID for workspace/namespace/user identification"),
				callback: z
					.string()
					.url()
					.optional()
					.describe("Optional callback URL for status notifications"),
				video_name: z
					.string()
					.optional()
					.describe("Optional custom name for the video"),
				api_key: z
					.string()
					.optional()
					.describe(
						"Optional Memories.ai API key (takes precedence over environment variable)",
					),
			},
		},
		async ({ url, unique_id, callback, video_name, api_key }) => {
			try {
				// Validate API key
				const resolvedApiKey = getApiKey(api_key);

				const request = {
					video_url: url,
					unique_id,
					...(callback && { callback }),
					...(video_name && { video_name }),
				};

				const response = await client.uploadFromUrl(request, resolvedApiKey);

				const videoNo = response.data.videoNo;
				const videoName = response.data.videoName;
				const videoStatus = response.data.videoStatus;

				return {
					content: [
						{
							type: "text",
							text: `Video upload initiated successfully!

URL: ${url}
Unique ID: ${unique_id}
Video No: ${videoNo}
Video Name: ${videoName}
Status: ${videoStatus}

Response:
${JSON.stringify(response, null, 2)}`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: "text",
							text: `Error uploading video from URL: ${error instanceof Error ? error.message : "Unknown error"}

Troubleshooting:
- Ensure the URL is publicly accessible or properly signed
- Check that the video format is supported (h264, h265, vp9, hevc)
- Verify the URL points to a valid video file
- Ensure you have a valid API key`,
						},
					],
					isError: true,
				};
			}
		},
	);
}
