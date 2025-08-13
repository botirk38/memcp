# MCP Skeleton Server

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
    tags: ["ui", "settings"],
  },
});
```

### Contextual Memory Retrieval

```javascript
// Search for relevant memories based on current context
const memories = await memories_search({
  query: "user preferences for UI",
  limit: 5,
});
```

### Programmatic Usage

```javascript
// You can also use memcp as a library
const MemcpServer = require("memcp");

const server = new MemcpServer({
  apiKey: process.env.MEMORIES_API_KEY,
  port: 3000,
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

# MIT License - see [LICENSE](LICENSE) file for details

A template/skeleton for building Model Context Protocol (MCP) servers using Bun runtime. This project demonstrates best practices for creating MCP servers with resources, tools, and prompts.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0

### Installation

1. Clone this repository:

```bash
git clone <your-repo-url>
cd memcp-skeleton
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun run dev
```

Or start the production server:

```bash
bun run start
```

## 📋 What's Included

This skeleton server demonstrates:

### 🗃️ Resources

- **Static Resource**: `info://server` - Server information and capabilities
- **Dynamic Resource**: `greeting://{name}` - Personalized greetings for any name

### 🔧 Tools

- **Calculator**: Perform basic mathematical calculations
- **List Examples**: Browse available resources by category

### 💬 Prompts

- **Explain Server**: Generate explanations about server capabilities
- **Troubleshoot**: Help troubleshoot issues with the server

## 🏗️ Project Structure

```
memcp-skeleton/
├── src/
│   └── index.ts          # Main server implementation
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
├── .gitignore           # Git ignore rules
├── README.md            # This file
└── memories-ai-docs/    # Documentation (can be removed)
```

## 🔨 Development

### Available Scripts

- `bun run dev` - Start development server with watch mode
- `bun run start` - Start production server
- `bun run build` - Build the project for production
- `bun run typecheck` - Run TypeScript type checking
- `bun run clean` - Clean build artifacts

### Adding New Features

#### Resources

Resources are read-only data that can be accessed by LLMs:

```typescript
server.registerResource(
  "my-resource",
  "my-scheme://my-resource",
  {
    title: "My Resource",
    description: "Description of my resource",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: "Resource content here",
      },
    ],
  }),
);
```

#### Tools

Tools perform actions and can have side effects:

```typescript
server.registerTool(
  "my-tool",
  {
    title: "My Tool",
    description: "What my tool does",
    inputSchema: {
      param: z.string().describe("Parameter description"),
    },
  },
  async ({ param }) => ({
    content: [
      {
        type: "text",
        text: `Result: ${param}`,
      },
    ],
  }),
);
```

#### Prompts

Prompts are reusable templates for LLM interactions:

```typescript
server.registerPrompt(
  "my-prompt",
  {
    title: "My Prompt",
    description: "What my prompt does",
    argsSchema: {
      input: z.string().describe("Input parameter"),
    },
  },
  ({ input }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Process this: ${input}`,
        },
      },
    ],
  }),
);
```

## 🧪 Testing

The server can be tested using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npx @modelcontextprotocol/inspector bun run src/index.ts
```

## 📚 Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Bun Documentation](https://bun.sh/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏷️ Customization

To customize this skeleton for your own project:

1. Update `package.json` with your project details
2. Modify the server name and version in `src/index.ts`
3. Replace the example resources, tools, and prompts with your own
4. Update this README with your project-specific information
5. Add your own dependencies as needed

## 🐛 Troubleshooting

### Common Issues

- **"Module not found"**: Make sure you've run `bun install`
- **TypeScript errors**: Run `bun run typecheck` to see detailed type errors
- **Server won't start**: Check that you have Bun >= 1.0.0 installed

### Getting Help

If you encounter issues:

1. Check the [MCP documentation](https://modelcontextprotocol.io/)
2. Look at the [TypeScript SDK examples](https://github.com/modelcontextprotocol/typescript-sdk)
3. Use the troubleshooting prompt included in this server
4. Open an issue in this repository
