/**
 * Utility MCP tools for video management
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { MemoriesAiClient } from "../clients/memories.js";
import { VideoStatusSchema } from "../types/memories.js";
import { getApiKey } from "../utils/api-key.js";

export function registerUtilsTools(
	server: McpServer,
	client: MemoriesAiClient,
) {
	// List Videos
	server.registerTool(
		"list-videos",
		{
			title: "List Videos",
			description:
				"Get a paginated list of uploaded videos with filtering options",
			inputSchema: {
				unique_id: z
					.string()
					.describe("Unique ID for workspace/namespace/user identification"),
				page: z
					.number()
					.min(1)
					.default(1)
					.describe("Page number for pagination"),
				size: z
					.number()
					.min(1)
					.max(100)
					.default(20)
					.describe("Number of videos per page (max 100)"),
				video_name: z
					.string()
					.optional()
					.describe("Optional filter by video name (partial match)"),
				video_no: z
					.string()
					.optional()
					.describe("Optional filter by specific video ID"),
				status: VideoStatusSchema.optional().describe(
					"Optional filter by video processing status",
				),
				api_key: z
					.string()
					.optional()
					.describe(
						"Optional Memories.ai API key (takes precedence over environment variable)",
					),
			},
		},
		async ({
			unique_id,
			page,
			size,
			video_name,
			video_no,
			status,
			api_key,
		}) => {
			try {
				// Validate API key
				const resolvedApiKey = getApiKey(api_key);

				const request = {
					unique_id,
					page,
					size,
					...(video_name && { video_name }),
					...(video_no && { video_no }),
					...(status && { status }),
				};

				const response = await client.listVideos(request, resolvedApiKey);

				let videosText = "";
				if (response.data?.videos && response.data.videos.length > 0) {
					videosText = response.data.videos
						.map((video, index) => {
							const videoName = video.videoName;
							const videoNo = video.videoNo;
							const videoStatus = video.videoStatus;
							const uploadTime = new Date(
								parseInt(video.uploadTime, 10),
							).toISOString();
							const duration = video.duration
								? `${video.duration}s`
								: "Unknown";
							const thumbnail = video.thumbnail || "None";
							const itemNumber = (page - 1) * size + index + 1;

							return `${itemNumber}. ${videoName}
   Video No: ${videoNo}
   Status: ${videoStatus}
   Upload Time: ${uploadTime}
   Duration: ${duration}
   Thumbnail: ${thumbnail}`;
						})
						.join("\n\n");
				} else {
					videosText = "No videos found with the specified criteria.";
				}

				const totalCount = response.data?.totalCount || 0;
				const totalPages = Math.ceil(totalCount / size);
				const videosOnPage = response.data?.videos?.length || 0;

				const nameFilter = video_name ? `Filter by name: "${video_name}"` : "";
				const idFilter = video_no ? `Filter by ID: "${video_no}"` : "";
				const statusFilter = status ? `Filter by status: "${status}"` : "";

				return {
					content: [
						{
							type: "text",
							text: `Videos list retrieved successfully!

Page: ${page} of ${totalPages}
Size: ${size}
Total Count: ${totalCount}
Unique ID: ${unique_id}
${nameFilter}
${idFilter}
${statusFilter}

Videos (${videosOnPage} on this page):
${videosText}`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: "text",
							text: `Error listing videos: ${error instanceof Error ? error.message : "Unknown error"}

Troubleshooting:
- Check that your unique_id is correct
- Verify your API key is valid
- Try reducing the page size or changing filters
- Ensure you have uploaded videos to list`,
						},
					],
					isError: true,
				};
			}
		},
	);

	// Delete Videos
	server.registerTool(
		"delete-videos",
		{
			title: "Delete Videos",
			description: "Delete one or more videos from Memories.ai",
			inputSchema: {
				video_nos: z.array(z.string()).describe("Array of video IDs to delete"),
				unique_id: z
					.string()
					.describe("Unique ID for workspace/namespace/user identification"),
				api_key: z
					.string()
					.optional()
					.describe(
						"Optional Memories.ai API key (takes precedence over environment variable)",
					),
			},
		},
		async ({ video_nos, unique_id, api_key }) => {
			try {
				// Validate API key
				const resolvedApiKey = getApiKey(api_key);

				const response = await client.deleteVideos(
					video_nos,
					unique_id,
					resolvedApiKey,
				);

				return {
					content: [
						{
							type: "text",
							text: `Video deletion request completed!

Requested video IDs: ${video_nos.join(", ")}
Unique ID: ${unique_id}
Count: ${video_nos.length} video${video_nos.length !== 1 ? "s" : ""}

Response:
${JSON.stringify(response, null, 2)}

Note: Deletion may take some time to process completely.`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: "text",
							text: `Error deleting videos: ${error instanceof Error ? error.message : "Unknown error"}

Troubleshooting:
- Ensure all video IDs exist and belong to your account
- Check that your unique_id matches the one used for uploading
- Verify your API key has delete permissions
- Note: Some videos may not be deletable if they're currently being processed`,
						},
					],
					isError: true,
				};
			}
		},
	);

	// Check Video Status
	server.registerTool(
		"check-video-status",
		{
			title: "Check Video Status",
			description: "Check the processing status of uploaded videos",
			inputSchema: {
				video_nos: z.array(z.string()).describe("Array of video IDs to check"),
				unique_id: z
					.string()
					.describe("Unique ID for workspace/namespace/user identification"),
				api_key: z
					.string()
					.optional()
					.describe(
						"Optional Memories.ai API key (takes precedence over environment variable)",
					),
			},
		},
		async ({ video_nos, unique_id, api_key }) => {
			try {
				// Validate API key
				const resolvedApiKey = getApiKey(api_key);

				const response = await client.checkVideoStatus(
					video_nos,
					unique_id,
					resolvedApiKey,
				);

				return {
					content: [
						{
							type: "text",
							text: `Video status check completed!

Requested video IDs: ${video_nos.join(", ")}
Unique ID: ${unique_id}
Count: ${video_nos.length} video${video_nos.length !== 1 ? "s" : ""}

Response:
${JSON.stringify(response, null, 2)}

Status meanings:
- UNPARSE: Video uploaded but not yet processed
- PARSE: Video fully processed and ready for search/chat
- FAILED: Video processing failed (check format/corruption)`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: "text",
							text: `Error checking video status: ${error instanceof Error ? error.message : "Unknown error"}

Troubleshooting:
- Ensure all video IDs exist and belong to your account
- Check that your unique_id matches the one used for uploading
- Verify your API key is valid`,
						},
					],
					isError: true,
				};
			}
		},
	);
}
