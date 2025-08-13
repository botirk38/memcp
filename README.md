# Memories.ai MCP Server

A Model Context Protocol (MCP) server that enables AI agents to interact with the [Memories.ai](https://memories.ai) API, providing video upload, search, chat, and management capabilities for AI applications.

## Overview

This MCP server bridges AI agents with the Memories.ai platform, allowing agents to upload videos, perform semantic search, chat with video content, and manage video libraries through the standardized MCP interface.

## Features

- 🎥 **Video Upload** - Upload videos from URLs to Memories.ai
- 🔍 **Semantic Search** - Search through videos using natural language
- 💬 **AI Video Chat** - Have conversations about video content
- 📊 **Video Management** - List, delete, and check video status
- 🔌 **MCP Compatible** - Works with Claude Code and other MCP clients
- 🔐 **Secure Authentication** - API key-based authentication
- ⚡ **Real-time Processing** - Status callbacks and streaming responses

## Prerequisites

- Node.js 18+ or Bun runtime
- A Memories.ai API key ([Get one here](https://memories.ai/app/login))
- Claude Code or another MCP-compatible client

## Installation

### Local Development

```bash
git clone https://github.com/yourusername/memories-ai-mcp.git
cd memories-ai-mcp
bun install
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

The server exposes 7 tools for AI agents:

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

#### `search-videos`
Search through uploaded videos using natural language
```json
{
  "query": "people talking about AI",
  "unique_id": "user123", 
  "search_type": "BY_VIDEO"
}
```

#### `chat-with-videos`
Have an AI conversation about one or more videos
```json
{
  "video_nos": ["vid123", "vid456"],
  "prompt": "Summarize the main points discussed",
  "unique_id": "user123",
  "session_id": "session123"
}
```

#### `list-videos`
Get a list of all uploaded videos
```json
{
  "unique_id": "user123",
  "page": 1,
  "limit": 20
}
```

#### `list-sessions`
Get a list of all chat sessions
```json
{
  "unique_id": "user123",
  "page": 1,
  "limit": 20
}
```

#### `delete-videos`
Delete one or more videos
```json
{
  "video_nos": ["vid123", "vid456"],
  "unique_id": "user123"
}
```

#### `check-video-status`
Check the processing status of uploaded videos
```json
{
  "video_nos": ["vid123"],
  "unique_id": "user123"
}
```

### MCP Resources

#### `@memories-ai:memories://docs`
Access complete API documentation and capabilities

#### `@memories-ai:memories://video/{videoNo}`
Get detailed information about a specific video

### MCP Prompts (Slash Commands)

#### `/mcp__memories_ai__analyze_video_content`
Generate prompts for analyzing video content with AI
- Analysis types: summary, emotions, objects, activities, transcript
- Optional focus areas for targeted analysis

#### `/mcp__memories_ai__video_search_query`
Help build effective search queries for finding videos
- Supports visual, audio, and combined search approaches
- Context-aware query building

#### `/mcp__memories_ai__video_workflow_helper`
Get guidance for common Memories.ai workflows
- Upload, search, analyze, manage, and integrate workflows
- Step-by-step guidance and best practices

## Development

### Project Structure

```
memories-ai-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Built JavaScript files
├── package.json          # Project configuration
├── tsdown.config.ts      # Build configuration
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables
└── memories-ai-docs/     # API documentation
```

### Available Scripts

- `bun run dev` - Start development server with watch mode
- `bun run build` - Build the project using tsdown
- `bun run typecheck` - Run TypeScript type checking
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

- `@modelcontextprotocol/sdk` - MCP SDK for TypeScript
- `zod` - Schema validation
- `tsdown` - Modern TypeScript bundler

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