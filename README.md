# memcp

An MCP (Model Context Protocol) server built with Node.js that enables AI agents to interact with the [Memories.ai](https://memories.ai) API, providing seamless memory management and retrieval capabilities for AI applications.

## Overview

memcp is a Node.js-based bridge between AI agents and the Memories.ai platform, allowing agents to store, retrieve, and manage contextual memories through the standardized MCP interface. This enables AI systems to maintain persistent memory across conversations and sessions.

## Features

- 🧠 **Memory Management** - Create, update, and delete memories through the Memories.ai API
- 🔍 **Smart Retrieval** - Search and retrieve relevant memories based on context
- 🔌 **MCP Compatible** - Works with any MCP-compatible AI client
- 🔐 **Secure Authentication** - API key-based authentication with Memories.ai
- ⚡ **Real-time Sync** - Instant synchronization with the Memories.ai platform
- 📝 **Structured Data** - Support for structured memory formats and metadata

## Prerequisites

- Node.js 18+ and npm
- A Memories.ai API key ([Get one here](https://memories.ai/api))
- An MCP-compatible client (e.g., Claude Desktop, Continue.dev)

## Installation

### Using npm (recommended)

```bash
npm install -g memcp
```

### From source

```bash
git clone https://github.com/yourusername/memcp.git
cd memcp
npm install
npm link  # To use globally
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
MEMORIES_API_KEY=your_api_key_here
MEMORIES_API_URL=https://api.memories.ai/v1  # Optional, defaults to production
MCP_PORT=3000  # Optional, defaults to 3000
```

### MCP Client Configuration

Add to your MCP client configuration (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "memcp": {
      "command": "node",
      "args": ["/path/to/memcp/index.js"],
      "env": {
        "MEMORIES_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "memcp": {
      "command": "memcp",
      "env": {
        "MEMORIES_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Usage

### Starting the Server

```bash
# Using default settings
memcp

# With custom port
memcp --port 8080

# With debug logging
memcp --debug

# If running from source
node index.js --port 3000
```

### Available MCP Tools

The server exposes the following tools to AI agents:

#### `memories_create`
Create a new memory entry
```json
{
  "content": "Important information to remember",
  "metadata": {
    "category": "personal",
    "tags": ["important", "todo"]
  }
}
```

#### `memories_search`
Search for relevant memories
```json
{
  "query": "project deadlines",
  "limit": 10,
  "filters": {
    "category": "work"
  }
}
```

#### `memories_update`
Update an existing memory
```json
{
  "id": "memory_123",
  "content": "Updated information",
  "metadata": {
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### `memories_delete`
Delete a memory
```json
{
  "id": "memory_123"
}
```

#### `memories_list`
List all memories with pagination
```json
{
  "page": 1,
  "limit": 20,
  "sort": "created_at"
}
```

## API Reference

### Memory Object Structure

```typescript
interface Memory {
  id: string;
  content: string;
  embedding?: number[];
  metadata?: {
    category?: string;
    tags?: string[];
    source?: string;
    created_at: string;
    updated_at: string;
    [key: string]: any;
  };
}
```

### Error Handling

The server returns standardized MCP error responses:

- `400` - Invalid request parameters
- `401` - Authentication failed
- `404` - Memory not found
- `429` - Rate limit exceeded
- `500` - Internal server error

## Development

### Project Structure

```
memcp/
├── index.js          # Main server entry point
├── package.json      # Project dependencies
├── .env.example      # Example environment configuration
├── src/
│   ├── server.js     # MCP server implementation
│   ├── memories.js   # Memories.ai API client
│   └── tools/        # MCP tool definitions
└── test/             # Test files
```

### Running Tests

```bash
npm test
```

### Running in Development

```bash
npm run dev  # Runs with nodemon for auto-reload
```

### Building and Publishing

```bash
npm run build  # If using TypeScript or build step
npm publish    # Publish to npm registry
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Examples

### Basic Memory Storage

```javascript
// AI agent can use these tools automatically
const memory = await memories_create({
  content: "User prefers dark mode in applications",
  metadata: {
    category: "preferences",
    tags: ["ui", "settings"]
  }
});
```

### Contextual Memory Retrieval

```javascript
// Search for relevant memories based on current context
const memories = await memories_search({
  query: "user preferences for UI",
  limit: 5
});
```

### Programmatic Usage

```javascript
// You can also use memcp as a library
const MemcpServer = require('memcp');

const server = new MemcpServer({
  apiKey: process.env.MEMORIES_API_KEY,
  port: 3000
});

server.start();
```

## Troubleshooting

### Common Issues

**Connection refused**: Ensure the MCP server is running and the port is not blocked

**Authentication error**: Verify your Memories.ai API key is valid and properly configured

**Rate limiting**: The Memories.ai API has rate limits; implement exponential backoff for retries

**Node version issues**: Ensure you're using Node.js 18 or higher (`node --version`)

## Dependencies

Key dependencies used in this project:

- `@modelcontextprotocol/sdk` - MCP SDK for Node.js
- `axios` or `node-fetch` - HTTP client for API requests
- `dotenv` - Environment variable management
- `winston` - Logging library

## License

MIT License - see [LICENSE](LICENSE) file for details
