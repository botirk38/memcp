/**
 * Memories.ai MCP Server
 *
 * A Model Context Protocol server for interacting with the Memories.ai API.
 * Provides video upload, search, chat, and management capabilities.
 *
 * Usage:
 *   MEMORIES_API_KEY=your_key bun run src/index.ts
 *   MEMORIES_API_KEY=your_key bun run dev (with --watch)
 */

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

// Server configuration
const SERVER_INFO = {
  name: "memories-ai-mcp",
  version: "1.0.0",
} as const;

const API_BASE_URL = "https://api.memories.ai";

// Create the MCP server instance
const server = new McpServer({
  name: SERVER_INFO.name,
  version: SERVER_INFO.version,
});

// Helper function to get API key from environment or parameter
function getApiKey(providedKey?: string): string {
  const apiKey = providedKey || process.env.MEMORIES_API_KEY;
  if (!apiKey) {
    throw new Error(
      "API key is required. Provide it via MEMORIES_API_KEY environment variable or as a parameter.",
    );
  }
  return apiKey;
}

// Helper function to get video MIME type from file extension
function getVideoMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    ".mp4": "video/mp4",
    ".avi": "video/x-msvideo",
    ".mov": "video/quicktime",
    ".wmv": "video/x-ms-wmv",
    ".flv": "video/x-flv",
    ".webm": "video/webm",
    ".mkv": "video/x-matroska",
    ".m4v": "video/x-m4v",
    ".3gp": "video/3gpp",
    ".ts": "video/mp2t",
  };

  return mimeTypes[extension.toLowerCase()] || "video/mp4";
}

// Helper function for making Memories.ai API requests
async function makeMemoriesRequest<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    isFormData?: boolean;
    apiKey?: string;
  } = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    isFormData = false,
    apiKey,
  } = options;

  const requestHeaders = {
    Authorization: getApiKey(apiKey),
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...headers,
  };

  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Memories.ai API request failed:", error);
    throw error;
  }
}

/**
 * RESOURCES
 * Resources provide read-only access to Memories.ai data
 */

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
              "Semantic video search",
              "AI video chat with context",
              "Video transcription (audio/visual)",
              "Real-time status callbacks",
            ],
            endpoints: {
              uploadFile: "/serve/api/v1/upload",
              uploadUrl: "/serve/api/v1/upload_url",
              search: "/serve/api/v1/search",
              chat: "/serve/api/v1/chat",
              listVideos: "/serve/api/v1/list_videos",
              listSessions: "/serve/api/v1/list_sessions",
              deleteVideos: "/serve/api/v1/delete",
              checkStatus: "/serve/api/v1/status",
            },
            authentication: "API Key in Authorization header",
            supportedFormats: ["h264", "h265", "vp9", "hevc"],
            languages: ["English (prompts and chat)"],
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
      // Note: This would require a specific API endpoint for video details
      // For now, we'll return a placeholder structure
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(
              {
                videoNo,
                message: "Video details endpoint would be implemented here",
                note: "Use the list-videos tool to get basic video information",
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
                error: error instanceof Error ? error.message : "Unknown error",
                videoNo,
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

/**
 * TOOLS
 * Tools perform actions with the Memories.ai API
 */

// Video Upload from File
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
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ file_path, unique_id, callback, video_name, api_key }) => {
    try {
      // Check if file exists
      if (!fs.existsSync(file_path)) {
        throw new Error(`File not found: ${file_path}`);
      }

      // Get file stats
      const stats = fs.statSync(file_path);
      if (!stats.isFile()) {
        throw new Error(`Path is not a file: ${file_path}`);
      }

      // Read file as buffer
      const fileBuffer = fs.readFileSync(file_path);
      const fileName = video_name || path.basename(file_path);

      // Create FormData for multipart upload
      const formData = new FormData();

      // Create a Blob from the buffer (Node.js compatible)
      const blob = new Blob([fileBuffer], {
        type: getVideoMimeType(path.extname(file_path)),
      });

      formData.append("file", blob, fileName);
      formData.append("unique_id", unique_id);
      if (callback) formData.append("callback", callback);

      const response = await makeMemoriesRequest("/serve/api/v1/upload", {
        method: "POST",
        body: formData,
        isFormData: true,
        apiKey: api_key,
      });

      return {
        content: [
          {
            type: "text",
            text: `File upload completed successfully!

File: ${file_path}
Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB
Name: ${fileName}
Unique ID: ${unique_id}

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
- Consider using upload-video-url if the file is accessible via URL`,
          },
        ],
        isError: true,
      };
    }
  },
);

// Video Upload from URL
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
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ url, unique_id, callback, video_name, api_key }) => {
    try {
      const body: any = {
        video_url: url,
        unique_id,
      };

      if (callback) body.callback = callback;
      if (video_name) body.video_name = video_name;

      const response = await makeMemoriesRequest("/serve/api/v1/upload_url", {
        method: "POST",
        body,
        apiKey: api_key,
      });

      return {
        content: [
          {
            type: "text",
            text: `Video upload initiated successfully!\n\nDetails:\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error uploading video: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);

// Video Search
server.registerTool(
  "search-videos",
  {
    title: "Search Videos",
    description: "Search through uploaded videos using natural language",
    inputSchema: {
      query: z.string().describe("Natural language search query"),
      unique_id: z
        .string()
        .describe("Unique ID for workspace/namespace/user identification"),
      search_type: z
        .enum(["BY_VIDEO", "BY_AUDIO", "BY_CLIP"])
        .default("BY_VIDEO")
        .describe("Type of search to perform"),
      api_key: z
        .string()
        .optional()
        .describe(
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ query, unique_id, search_type, api_key }) => {
    try {
      const response = await makeMemoriesRequest("/serve/api/v1/search", {
        method: "POST",
        body: {
          search_param: query,
          unique_id,
          search_type,
        },
        apiKey: api_key,
      });

      return {
        content: [
          {
            type: "text",
            text: `Search completed successfully!\n\nQuery: "${query}"\nType: ${search_type}\n\nResults:\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error searching videos: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);

// Video Chat
server.registerTool(
  "chat-with-videos",
  {
    title: "Chat with Videos",
    description: "Have an AI conversation about one or more videos",
    inputSchema: {
      video_nos: z
        .array(z.string())
        .describe("Array of video IDs to chat about"),
      prompt: z.string().describe("Your question or prompt about the videos"),
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
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ video_nos, prompt, unique_id, session_id, api_key }) => {
    try {
      const body: any = {
        video_nos,
        prompt,
        unique_id,
      };

      if (session_id) body.session_id = session_id;

      const response = await makeMemoriesRequest("/serve/api/v1/chat", {
        method: "POST",
        body,
        headers: {
          Accept: "text/event-stream",
        },
        apiKey: api_key,
      });

      return {
        content: [
          {
            type: "text",
            text: `Chat response:\n\n${JSON.stringify(response, null, 2)}\n\nNote: This is a simplified response. The actual API returns streaming data.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error chatting with videos: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);

// List Videos
server.registerTool(
  "list-videos",
  {
    title: "List Videos",
    description: "Get a list of all uploaded videos",
    inputSchema: {
      unique_id: z
        .string()
        .describe("Unique ID for workspace/namespace/user identification"),
      page: z.number().min(1).default(1).describe("Page number for pagination"),
      size: z
        .number()
        .min(1)
        .max(100)
        .default(20)
        .describe("Number of videos per page"),
      video_name: z
        .string()
        .optional()
        .describe("Optional filter by video name"),
      video_no: z
        .string()
        .optional()
        .describe("Optional filter by specific video ID"),
      status: z
        .enum(["processing", "completed", "failed", "queued"])
        .optional()
        .describe("Optional filter by video processing status"),
      api_key: z
        .string()
        .optional()
        .describe(
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ unique_id, page, size, video_name, video_no, status, api_key }) => {
    try {
      const body: any = {
        unique_id,
        page,
        size,
      };

      if (video_name) body.video_name = video_name;
      if (video_no) body.video_no = video_no;
      if (status) body.status = status;

      const response = await makeMemoriesRequest("/serve/api/v1/list_videos", {
        method: "POST",
        body,
        apiKey: api_key,
      });

      return {
        content: [
          {
            type: "text",
            text: `Videos list retrieved successfully!\n\nPage: ${page}, Size: ${size}\n\nResponse:\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing videos: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);

// List Sessions
server.registerTool(
  "list-sessions",
  {
    title: "List Chat Sessions",
    description:
      "Get a list of all chat sessions (endpoint may not be fully implemented)",
    inputSchema: {
      unique_id: z
        .string()
        .describe("Unique ID for workspace/namespace/user identification"),
      page: z.number().min(1).default(1).describe("Page number for pagination"),
      limit: z
        .number()
        .min(1)
        .max(100)
        .default(20)
        .describe("Number of sessions per page"),
      api_key: z
        .string()
        .optional()
        .describe(
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ unique_id, page, limit, api_key }) => {
    try {
      const response = await makeMemoriesRequest(
        `/serve/api/v1/sessions?unique_id=${unique_id}&page=${page}&limit=${limit}`,
        { apiKey: api_key },
      );

      return {
        content: [
          {
            type: "text",
            text: `Sessions list request completed!\n\nPage: ${page}, Limit: ${limit}\n\nResponse:\n${JSON.stringify(response, null, 2)}\n\nNote: This endpoint may not be fully implemented in the Memories.ai API yet.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing sessions: ${error instanceof Error ? error.message : "Unknown error"}\n\nNote: This endpoint may not be fully implemented in the Memories.ai API yet.`,
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
    description:
      "Delete one or more videos from Memories.ai (endpoint may not be fully implemented)",
    inputSchema: {
      video_nos: z.array(z.string()).describe("Array of video IDs to delete"),
      unique_id: z
        .string()
        .describe("Unique ID for workspace/namespace/user identification"),
      api_key: z
        .string()
        .optional()
        .describe(
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ video_nos, unique_id, api_key }) => {
    try {
      const response = await makeMemoriesRequest("/serve/api/v1/delete", {
        method: "POST",
        body: {
          video_nos,
          unique_id,
        },
        apiKey: api_key,
      });

      return {
        content: [
          {
            type: "text",
            text: `Video deletion request completed!\n\nRequested video IDs: ${video_nos.join(", ")}\n\nResponse:\n${JSON.stringify(response, null, 2)}\n\nNote: This endpoint may not be fully implemented in the Memories.ai API yet.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error deleting videos: ${error instanceof Error ? error.message : "Unknown error"}\n\nNote: This endpoint may not be fully implemented in the Memories.ai API yet.`,
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
    description:
      "Check the processing status of uploaded videos (endpoint may not be fully implemented)",
    inputSchema: {
      video_nos: z.array(z.string()).describe("Array of video IDs to check"),
      unique_id: z
        .string()
        .describe("Unique ID for workspace/namespace/user identification"),
      api_key: z
        .string()
        .optional()
        .describe(
          "Optional Memories.ai API key (overrides environment variable)",
        ),
    },
  },
  async ({ video_nos, unique_id, api_key }) => {
    try {
      const response = await makeMemoriesRequest("/serve/api/v1/status", {
        method: "POST",
        body: {
          video_nos,
          unique_id,
        },
        apiKey: api_key,
      });

      return {
        content: [
          {
            type: "text",
            text: `Video status check request completed!\n\nRequested video IDs: ${video_nos.join(", ")}\n\nResponse:\n${JSON.stringify(response, null, 2)}\n\nNote: This endpoint may not be fully implemented in the Memories.ai API yet.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error checking video status: ${error instanceof Error ? error.message : "Unknown error"}\n\nNote: This endpoint may not be fully implemented in the Memories.ai API yet.`,
          },
        ],
        isError: true,
      };
    }
  },
);

/**
 * PROMPTS
 * Prompts provide reusable templates for common Memories.ai workflows
 */

server.registerPrompt(
  "analyze-video-content",
  {
    title: "Analyze Video Content",
    description: "Generate prompts for analyzing video content with AI",
    argsSchema: {
      analysis_type: z
        .enum(["summary", "emotions", "objects", "activities", "transcript"])
        .describe("Type of analysis to perform"),
      focus_area: z
        .string()
        .optional()
        .describe(
          "Specific area to focus on (e.g., 'facial expressions', 'background music')",
        ),
    },
  },
  ({ analysis_type, focus_area }) => {
    const prompts = {
      summary:
        "Provide a comprehensive summary of the video content, highlighting key scenes, actions, and important moments.",
      emotions:
        "Analyze the emotional content of this video. Identify emotional expressions, mood changes, and overall emotional tone throughout the video.",
      objects:
        "Identify and describe all significant objects, items, and visual elements present in this video. Include their locations and interactions.",
      activities:
        "Describe all activities, actions, and behaviors occurring in this video. Focus on what people are doing and how they interact.",
      transcript:
        "Provide a detailed transcript of all spoken content in this video, including speaker identification if multiple people are present.",
    };

    let prompt = prompts[analysis_type];
    if (focus_area) {
      prompt += ` Pay special attention to: ${focus_area}.`;
    }

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: prompt,
          },
        },
      ],
    };
  },
);

server.registerPrompt(
  "video-search-query",
  {
    title: "Video Search Query Builder",
    description: "Help build effective search queries for finding videos",
    argsSchema: {
      search_intent: z
        .string()
        .describe("What you're looking for in the videos"),
      search_context: z
        .string()
        .optional()
        .describe("Additional context about the search"),
      search_type: z
        .enum(["visual", "audio", "combined"])
        .optional()
        .describe("Type of content to search"),
    },
  },
  ({ search_intent, search_context, search_type }) => {
    const typeInstructions = {
      visual:
        "Focus on visual elements, objects, scenes, colors, actions, and visual content when searching.",
      audio:
        "Focus on spoken words, sounds, music, audio content, and auditory elements when searching.",
      combined:
        "Search across both visual and audio content to find the most relevant matches.",
    };

    let prompt = `I want to search for videos containing: ${search_intent}\n\n`;
    prompt += `Search approach: ${typeInstructions[search_type || "combined"]}\n\n`;

    if (search_context) {
      prompt += `Additional context: ${search_context}\n\n`;
    }

    prompt +=
      "Please help me craft an effective search query that will find the most relevant videos in my Memories.ai library.";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: prompt,
          },
        },
      ],
    };
  },
);

server.registerPrompt(
  "video-workflow-helper",
  {
    title: "Video Workflow Helper",
    description: "Get guidance for common Memories.ai workflows",
    argsSchema: {
      workflow: z
        .enum(["upload", "search", "analyze", "manage", "integrate"])
        .describe("Type of workflow you need help with"),
      specific_goal: z
        .string()
        .optional()
        .describe("Your specific goal or use case"),
    },
  },
  ({ workflow, specific_goal }) => {
    const workflows = {
      upload:
        "Guide me through the process of uploading videos to Memories.ai, including best practices for file formats, naming conventions, and organization.",
      search:
        "Help me understand how to effectively search through my video library using Memories.ai's semantic search capabilities.",
      analyze:
        "Show me how to use AI to analyze video content for insights, summaries, and specific information extraction.",
      manage:
        "Help me organize and manage my video library, including deleting unwanted videos and organizing content.",
      integrate:
        "Guide me on how to integrate Memories.ai into my existing workflows and applications.",
    };

    let prompt = workflows[workflow];

    if (specific_goal) {
      prompt += `\n\nMy specific goal is: ${specific_goal}`;
    }

    prompt += "\n\nPlease provide step-by-step guidance and best practices.";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: prompt,
          },
        },
      ],
    };
  },
);

/**
 * SERVER STARTUP
 */

async function main() {
  try {
    // Check for API key in environment (optional now)
    try {
      getApiKey();
      console.error("✅ Memories.ai API key found in environment");
    } catch (error) {
      console.error(
        "⚠️  No API key in environment - users can provide it per request",
      );
      console.error(
        "   To set globally: export MEMORIES_API_KEY=your_api_key_here",
      );
    }

    console.error(`🚀 Starting ${SERVER_INFO.name} v${SERVER_INFO.version}`);

    // Connect to stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("✅ Memories.ai MCP Server running on stdio");
    console.error("🎥 Memories.ai API Base:", API_BASE_URL);
    console.error("📖 Resources available:", ["api-docs", "video/{videoNo}"]);
    console.error("🔧 Tools available:", [
      "upload-video-file",
      "upload-video-url",
      "search-videos",
      "chat-with-videos",
      "list-videos",
      "list-sessions",
      "delete-videos",
      "check-video-status",
    ]);
    console.error("💬 Prompts available:", [
      "analyze-video-content",
      "video-search-query",
      "video-workflow-helper",
    ]);
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
