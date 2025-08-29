/**
 * Search-related MCP tools
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { MemoriesAiClient } from "../clients/memories.js";
import { SearchTypeSchema } from "../types/memories.js";
import { getApiKey } from "../utils/api-key.js";

export function registerSearchTools(
	server: McpServer,
	client: MemoriesAiClient,
) {
	// Video Search
	server.registerTool(
		"search-videos",
		{
			title: "Search Videos",
			description:
				"Search through uploaded videos using natural language queries",
			inputSchema: {
				query: z.string().describe("Natural language search query"),
				unique_id: z
					.string()
					.describe("Unique ID for workspace/namespace/user identification"),
				search_type: SearchTypeSchema.default("BY_VIDEO").describe(
					"Type of search: BY_VIDEO (returns video numbers), BY_AUDIO (search audio content), BY_CLIP (returns exact clips)",
				),
				folder_id: z
					.number()
					.default(-1)
					.describe("Folder ID: -1 for Default folder, -2 for API folder"),
				api_key: z
					.string()
					.optional()
					.describe(
						"Optional Memories.ai API key (takes precedence over environment variable)",
					),
			},
		},
		async ({ query, unique_id, search_type, folder_id, api_key }) => {
			try {
				// Validate API key
				const resolvedApiKey = getApiKey(api_key);

				const request = {
					search_param: query,
					unique_id,
					search_type,
					folder_id,
				};

				const response = await client.searchVideos(request, resolvedApiKey);

				let resultsText = "";
				if (response.data?.videos && response.data.videos.length > 0) {
					resultsText = response.data.videos
						.map((video, index) => {
							const videoName = video.videoName || video.videoNo;
							const status = video.videoStatus || "Unknown";
							const uploadTime = video.uploadTime
								? new Date(parseInt(video.uploadTime, 10)).toISOString()
								: "Unknown";

							return `${index + 1}. ${videoName}
   Video No: ${video.videoNo}
   Status: ${status}
   Upload Time: ${uploadTime}`;
						})
						.join("\n\n");
				} else {
					resultsText = "No videos found matching your search query.";
				}

				const resultsCount = response.data?.videos?.length || 0;

				return {
					content: [
						{
							type: "text",
							text: `Search completed successfully!

Query: "${query}"
Search Type: ${search_type}
Unique ID: ${unique_id}
Folder ID: ${folder_id}

Results (${resultsCount} videos found):
${resultsText}

Full Response:
${JSON.stringify(response, null, 2)}`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: "text",
							text: `Error searching videos: ${error instanceof Error ? error.message : "Unknown error"}

Troubleshooting:
- Ensure you have uploaded and processed videos (status should be 'PARSE')
- Try a different search query or search type
- Check that your unique_id matches the one used for uploading
- Verify your API key is valid
- Note: Search only supports English language queries`,
						},
					],
					isError: true,
				};
			}
		},
	);
}
