# Memories.ai MCP Server

A type-safe Model Context Protocol (MCP) server that enables AI agents to interact with the [Memories.ai](https://memories.ai) API, providing comprehensive video upload, search, chat, and management capabilities for AI applications.

## Overview

This MCP server bridges AI agents with the Memories.ai platform using a modular, type-safe architecture. It provides seamless integration with video upload from files or URLs, semantic search, AI-powered video chat, and comprehensive video library management through the standardized MCP interface.

## Features

- 🎥 **Video Upload** - Upload videos from local files or URLs with MIME type detection
- 🔍 **Semantic Search** - Advanced semantic search with multiple search types (BY_VIDEO, BY_AUDIO, BY_CLIP)
- 💬 **AI Video Chat** - Streaming conversations about video content with session management
- 📊 **Video Management** - List, delete, and check video status with pagination and filtering
- 🔌 **MCP Compatible** - Full MCP specification compliance with tools, resources, and prompts
- 🔐 **Secure Authentication** - Flexible API key authentication (environment or query parameter)
- ⚡ **Type-Safe Architecture** - Built with TypeScript, Zod validation, and better-fetch
- 🚀 **Streaming Responses** - Real-time Server-Sent Events for chat functionality
- 🎯 **Intelligent Prompts** - Pre-built prompt templates for video analysis workflows

## Prerequisites

- **Node.js 18+** or **Bun runtime** (recommended)
- **TypeScript 4.5+** for development
- A **Memories.ai API key** ([Get one here](https://memories.ai/app/login))
- **Claude Code** or another MCP-compatible client

## Installation

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/memories-ai-mcp.git
cd memcp

# Install dependencies (Bun recommended)
bun install

# Build the project
bun run build
```

### Environment Setup

Create a `.env` file:

```env
# Get your API key from: https://memories.ai/app/login (API Settings page)
MEMORIES_API_KEY=your_memories_ai_api_key_here

# Optional: Override the default API base URL
# MEMORIES_API_BASE_URL=https://api.memories.ai

# Optional: Set log level for debugging
# LOG_LEVEL=info
```

### API Key Configuration

API keys can be provided in two ways:

1. **Environment Variable (Recommended)**: Set `MEMORIES_API_KEY` in your `.env` file
2. **Per-Tool Parameter**: Include `api_key` as an optional parameter in individual tool calls

The per-tool parameter takes precedence over the environment variable, allowing for flexible multi-user scenarios.

## Usage

### Adding to Claude Code

Add the MCP server to Claude Code:

```bash
claude mcp add memories-ai --env MEMORIES_API_KEY=your_key_here -- node /path/to/memories-ai-mcp/dist/index.js
```

Or with the built executable:

```bash
claude mcp add memories-ai --env MEMORIES_API_KEY=your_key_here -- /path/to/memories-ai-mcp/dist/index.js
```

### Available MCP Tools

The server exposes 8 comprehensive tools for AI agents:

#### `upload-video-file`
Upload a video file from local storage to Memories.ai
```json
{
  "file_path": "/path/to/video.mp4",
  "unique_id": "user123",
  "callback": "https://callback.url/webhook",
  "video_name": "My Video"
}
```
*Note: API key can be provided as optional `api_key` parameter or via environment variable*

#### `upload-video-url`
Upload a video from a URL to Memories.ai
```json
{
  "url": "https://example.com/video.mp4",
  "unique_id": "user123",
  "callback": "https://callback.url/webhook",
  "video_name": "My Video"
}
```
*Note: API key can be provided as optional `api_key` parameter or via environment variable*

#### `search-videos`
Search through uploaded videos using natural language with advanced options
```json
{
  "query": "people talking about AI",
  "unique_id": "user123",
  "search_type": "BY_VIDEO",
  "folder_id": -1
}
```
*Note: API key can be provided as optional `api_key` parameter or via environment variable*

#### `chat-with-videos`
Have streaming AI conversations about one or more videos
```json
{
  "video_nos": ["vid123", "vid456"],
  "prompt": "Summarize the main points discussed",
  "unique_id": "user123",
  "session_id": "session123"
}
```
*Note: API key can be provided as optional `api_key` parameter or via environment variable*

#### `list-videos`
Get a paginated list of uploaded videos with filtering options
```json
{
  "unique_id": "user123",
  "page": 1,
  "size": 20,
  "video_name": "optional_filter",
  "video_no": "optional_id_filter",
  "status": "PARSE"
}
```
*Note: API key can be provided as optional `api_key` parameter or via environment variable*

#### `delete-videos`
Delete one or more videos from Memories.ai
```json
{
  "video_nos": ["vid123", "vid456"],
  "unique_id": "user123"
}
```
*Note: API key can be provided as optional `api_key` parameter or via environment variable*

#### `check-video-status`
Check the processing status of uploaded videos
```json
{
  "video_nos": ["vid123"],
  "unique_id": "user123"
}
```
*Note: API key can be provided as optional `api_key` parameter or via environment variable*

### MCP Resources

#### `memories://docs`
Comprehensive API documentation and platform capabilities
- Complete endpoint reference
- Authentication methods
- Rate limits and best practices
- Troubleshooting guides

#### `memories://video/{videoNo}`
Detailed information about specific videos
- Video metadata and status
- Processing information
- Usage examples

### MCP Prompts

#### `analyze-video-content`
Generate specialized prompts for video content analysis
- **Analysis types**: summary, emotions, objects, activities, transcript, technical, educational
- **Detail levels**: brief, detailed, comprehensive
- **Focus areas**: Customizable attention to specific aspects
- **Context instructions**: Specialized guidance per analysis type

#### `build-search-query`
Intelligent search query construction assistance
- **Search approaches**: visual, audio, combined content targeting
- **Specificity levels**: broad, specific, precise query scoping
- **Context integration**: Incorporates additional search parameters
- **Query optimization**: Balanced precision and recall strategies

#### `video-workflow-helper`
Step-by-step workflow guidance for common tasks
- **Workflow types**: upload, search, analyze, manage, integrate, troubleshoot
- **Experience levels**: beginner, intermediate, advanced guidance
- **Best practices**: Actionable recommendations and pitfall avoidance
- **Tool integration**: Specific MCP tool usage recommendations

## Development

### Project Structure

```
memcp/
├── src/
│   ├── index.ts              # Main MCP server entry point
│   ├── types/
│   │   └── memories.ts       # TypeScript types and Zod schemas
│   ├── clients/
│   │   └── memories.ts       # Type-safe Memories.ai API client
│   ├── tools/
│   │   ├── upload.ts         # Video upload tools
│   │   ├── search.ts         # Video search tools
│   │   ├── chat.ts           # Video chat tools
│   │   └── utils.ts          # Video management tools
│   ├── resources/
│   │   └── index.ts          # MCP resources (docs, video details)
│   ├── prompts/
│   │   └── index.ts          # MCP prompts for workflows
│   └── utils/
│       ├── api-key.ts        # API key management
│       └── mime-types.ts     # MIME type utilities
├── dist/                     # Built JavaScript files
├── memories-ai-docs/         # Local API documentation
├── package.json              # Project configuration
├── tsdown.config.ts          # Build configuration
├── tsconfig.json             # TypeScript configuration
├── biome.jsonc               # Code formatting configuration
└── .env                      # Environment variables
```

### Available Scripts

- `bun run dev` - Start development server with watch mode
- `bun run build` - Build the project using tsdown
- `bun run typecheck` - Run TypeScript type checking
- `bun run check` - Run Biome linter and formatter
- `bun run check:fix` - Run Biome with auto-fix
- `bun run start` - Start the built server

### Building

```bash
bun run build
```

This creates an executable `dist/index.js` file with proper shebang for direct execution.

## API Reference

### Memories.ai API Integration

The server integrates with Memories.ai API v1.2:

- **Base URL**: `https://api.memories.ai`
- **Authentication**: API key in Authorization header
- **Supported Formats**: h264, h265, vp9, hevc
- **Languages**: English (prompts and chat)

### Error Handling

The server returns standardized MCP error responses:
- Authentication failures
- API rate limits
- Invalid parameters
- Network errors

## Examples

### Basic Video Upload
```typescript
// AI agent can use this tool automatically
await upload_video_url({
  url: "https://example.com/presentation.mp4",
  unique_id: "user123",
  video_name: "Team Presentation"
});
```

### Semantic Video Search
```typescript
// Search for specific content in videos
const results = await search_videos({
  query: "discussion about quarterly goals",
  unique_id: "user123",
  search_type: "BY_VIDEO"
});
```

### AI Video Chat
```typescript
// Chat about video content
const response = await chat_with_videos({
  video_nos: ["vid123"],
  prompt: "What are the key action items mentioned?",
  unique_id: "user123"
});
```

## Troubleshooting

### Common Issues

**MCP server fails to connect**: 
- Ensure the server builds successfully with `bun run build`
- Check that the API key is set correctly in environment variables
- Verify Node.js version compatibility

**API authentication errors**: 
- Verify your Memories.ai API key is valid
- Check that the key is properly set in the MCP configuration

**Video upload failures**:
- Ensure video URLs are publicly accessible
- Check supported video formats (h264, h265, vp9, hevc)
- Verify rate limits aren't exceeded

### Debug Mode

Run with debug logging:
```bash
claude --debug
```

Check MCP server logs in:
```
/Users/[username]/Library/Caches/claude-cli-nodejs/[project-path]/
```

## Dependencies

### Runtime Dependencies
- `@modelcontextprotocol/sdk` - MCP SDK for TypeScript
- `@better-fetch/fetch` - Type-safe HTTP client with schema validation
- `zod` - Runtime type validation and schema parsing

### Development Dependencies
- `@biomejs/biome` - Fast formatter and linter
- `tsdown` - Modern TypeScript bundler
- `typescript` - TypeScript compiler

## Architecture

### Type Safety
- **Comprehensive Types**: Full TypeScript coverage with Zod runtime validation
- **Schema-Based Client**: Better-fetch integration with predefined API schemas
- **Request/Response Validation**: Automatic validation of all API interactions

### Error Handling
- **Graceful Degradation**: Comprehensive error messages with troubleshooting guidance
- **Retry Logic**: Exponential backoff for transient failures
- **Validation Errors**: Clear feedback for invalid parameters

### Performance
- **Streaming Support**: Server-Sent Events for real-time chat responses
- **Efficient Uploads**: Optimized file handling with MIME type detection
- **Connection Pooling**: Reusable HTTP connections with timeout management

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

- [Memories.ai API Documentation](https://memories.ai/api)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Claude Code MCP Guide](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)