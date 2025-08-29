/**
 * Chat-related MCP tools
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { MemoriesAiClient } from "../clients/memories.js";
import { getApiKey } from "../utils/api-key.js";

export function registerChatTools(server: McpServer, client: MemoriesAiClient) {
	// Video Chat
	server.registerTool(
		"chat-with-videos",
		{
			title: "Chat with Videos",
			description:
				"Have an AI conversation about one or more videos using streaming responses",
			inputSchema: {
				video_nos: z
					.array(z.string())
					.describe("Array of video IDs to chat about"),
				prompt: z
					.string()
					.describe("Your question or prompt about the videos (English only)"),
				unique_id: z
					.string()
					.describe("Unique ID for workspace/namespace/user identification"),
				session_id: z
					.string()
					.optional()
					.describe("Optional session ID to continue a conversation"),
				api_key: z
					.string()
					.optional()
					.describe(
						"Optional Memories.ai API key (takes precedence over environment variable)",
					),
			},
		},
		async ({ video_nos, prompt, unique_id, session_id, api_key }) => {
			try {
				// Validate API key
				const resolvedApiKey = getApiKey(api_key);

				const request = {
					video_nos,
					prompt,
					unique_id,
					...(session_id && { session_id }),
				};

				const response = await client.chatWithVideos(request, resolvedApiKey);

				return {
					content: [
						{
							type: "text",
							text: `Chat completed successfully!

Prompt: "${prompt}"
Videos: ${video_nos.join(", ")}
Session ID: ${response.sessionId}
Status: ${response.status}

AI Response:
${response.content}

${response.fullResponse ? `\nDebug Info (truncated):\n${response.fullResponse}` : ""}`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: "text",
							text: `Error chatting with videos: ${error instanceof Error ? error.message : "Unknown error"}

Troubleshooting:
- Ensure all videos are in PARSE status (fully processed)
- Check that video IDs are correct and exist in your account
- Verify API key has chat permissions
- Try with a simpler prompt in English only
- Make sure the unique_id matches the one used for uploading
- Note: Chat only supports English language prompts`,
						},
					],
					isError: true,
				};
			}
		},
	);
}
