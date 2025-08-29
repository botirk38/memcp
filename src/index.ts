/**
 * Memories.ai MCP Server
 *
 * A well-organized Model Context Protocol server for interacting with the Memories.ai API.
 * Provides video upload, search, chat, and management capabilities with type safety.
 *
 * Usage:
 *   MEMORIES_API_KEY=your_key bun run src/index.ts
 *   MEMORIES_API_KEY=your_key bun run dev (with --watch)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Import our organized modules
import { MemoriesAiClient } from "./clients/memories.js";
import { registerPrompts } from "./prompts/index.js";
import { registerResources } from "./resources/index.js";
import { registerChatTools } from "./tools/chat.js";
import { registerSearchTools } from "./tools/search.js";
import { registerUploadTools } from "./tools/upload.js";
import { registerUtilsTools } from "./tools/utils.js";
import { getApiKey } from "./utils/api-key.js";

// Server configuration
const SERVER_INFO = {
	name: "memories-ai-mcp",
	version: "2.0.0",
} as const;

// Create the MCP server instance
const server = new McpServer({
	name: SERVER_INFO.name,
	version: SERVER_INFO.version,
});

// Create the type-safe Memories.ai client
const memoriesClient = new MemoriesAiClient();

/**
 * Initialize and register all server components
 */
function setupServer() {
	// Register all tools organized by category
	registerUploadTools(server, memoriesClient);
	registerSearchTools(server, memoriesClient);
	registerChatTools(server, memoriesClient);
	registerUtilsTools(server, memoriesClient);

	// Register resources and prompts
	registerResources(server);
	registerPrompts(server);

	console.error("✅ All tools, resources, and prompts registered successfully");
}

/**
 * SERVER STARTUP
 */
async function main() {
	try {
		// Check for API key in environment (optional now since tools support per-request keys)
		try {
			const envApiKey = getApiKey();
			memoriesClient.setApiKey(envApiKey);
			console.error(
				"✅ Memories.ai API key found in environment and set as default",
			);
		} catch (_error) {
			console.error(
				"⚠️  No API key in environment - users can provide it per request",
			);
			console.error(
				"   To set globally: export MEMORIES_API_KEY=your_api_key_here",
			);
			console.error("   Or provide api_key parameter in each tool call");
		}

		console.error(`🚀 Starting ${SERVER_INFO.name} v${SERVER_INFO.version}`);

		// Set up all server components
		setupServer();

		// Connect to stdio transport
		const transport = new StdioServerTransport();
		await server.connect(transport);

		console.error("✅ Memories.ai MCP Server running on stdio");
		console.error("🎥 Memories.ai API Base: https://api.memories.ai");
		console.error("📖 Resources available:", [
			"api-docs (memories://docs)",
			"video/{videoNo} (memories://video/{videoNo})",
			"upload-status (memories://upload-status)",
		]);
		console.error("🔧 Tools available:", [
			"upload-video-file",
			"upload-video-url",
			"search-videos",
			"chat-with-videos",
			"list-videos",
			"delete-videos",
			"check-video-status",
		]);
		console.error("💬 Prompts available:", [
			"analyze-video-content",
			"build-search-query",
			"video-workflow-helper",
		]);
		console.error("🔑 API Key support:");
		console.error("   - Environment variable: MEMORIES_API_KEY");
		console.error("   - Per-request parameter: api_key in tool calls");
		console.error("   - Query parameter support: Coming soon");
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
}

// Handle graceful shutdown
process.on("SIGINT", () => {
	console.error("\n🛑 Shutting down Memories.ai MCP server...");
	process.exit(0);
});

process.on("SIGTERM", () => {
	console.error("\n🛑 Shutting down Memories.ai MCP server...");
	process.exit(0);
});

// Start the server
main().catch((error) => {
	console.error("💥 Fatal error:", error);
	process.exit(1);
});
