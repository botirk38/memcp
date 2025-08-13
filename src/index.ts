/**
 * MCP Server Skeleton using Bun
 *
 * This is a template/skeleton for building Model Context Protocol servers.
 * It demonstrates the basic patterns for resources, tools, and prompts.
 *
 * Usage:
 *   bun run src/index.ts
 *   bun run dev (with --watch)
 */

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Server configuration
const SERVER_INFO = {
  name: "memcp-skeleton",
  version: "1.0.0",
} as const;

// Create the MCP server instance
const server = new McpServer({
  name: SERVER_INFO.name,
  version: SERVER_INFO.version,
});

/**
 * RESOURCES
 * Resources are data that can be read by the LLM (like GET endpoints)
 * They should not perform significant computation or have side effects
 */

// Static resource example
server.registerResource(
  "server-info",
  "info://server",
  {
    title: "Server Information",
    description: "Basic information about this MCP server",
    mimeType: "application/json",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify(
          {
            name: SERVER_INFO.name,
            version: SERVER_INFO.version,
            description: "A skeleton MCP server built with Bun",
            timestamp: new Date().toISOString(),
            capabilities: ["resources", "tools", "prompts"],
          },
          null,
          2,
        ),
      },
    ],
  }),
);

// Dynamic resource example with templates
server.registerResource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  {
    title: "Personal Greeting",
    description: "Generate a personalized greeting for any name",
  },
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/plain",
        text: `Hello, ${name}! Welcome to the MCP Skeleton Server. 👋`,
      },
    ],
  }),
);

/**
 * TOOLS
 * Tools perform actions and can have side effects (like POST endpoints)
 * They can call external APIs, modify state, or perform computations
 */

// Simple calculation tool
server.registerTool(
  "calculate",
  {
    title: "Calculator",
    description: "Perform basic mathematical calculations",
    inputSchema: {
      expression: z
        .string()
        .describe(
          "Mathematical expression to evaluate (e.g., '2 + 2', '10 * 5')",
        ),
      operation: z
        .enum(["add", "subtract", "multiply", "divide"])
        .optional()
        .describe("Specific operation type"),
    },
  },
  async ({ expression, operation }) => {
    try {
      // Simple expression evaluation (in production, use a proper math parser)
      const sanitizedExpression = expression.replace(/[^0-9+\-*/().\s]/g, "");
      const result = Function(
        '"use strict"; return (' + sanitizedExpression + ")",
      )();

      return {
        content: [
          {
            type: "text",
            text: `${expression} = ${result}${operation ? ` (${operation} operation)` : ""}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error evaluating expression "${expression}": ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);

// Tool that returns resource links
server.registerTool(
  "list-examples",
  {
    title: "List Examples",
    description: "Get a list of example resources and their descriptions",
    inputSchema: {
      category: z
        .enum(["all", "greetings", "info"])
        .default("all")
        .describe("Category of examples to list"),
    },
  },
  async ({ category }) => {
    const examples = [
      {
        uri: "info://server",
        name: "Server Info",
        description: "Basic server information and capabilities",
        category: "info",
      },
      {
        uri: "greeting://Alice",
        name: "Greeting for Alice",
        description: "A personalized greeting",
        category: "greetings",
      },
      {
        uri: "greeting://Bob",
        name: "Greeting for Bob",
        description: "Another personalized greeting",
        category: "greetings",
      },
    ];

    const filtered =
      category === "all"
        ? examples
        : examples.filter((ex) => ex.category === category);

    return {
      content: [
        {
          type: "text",
          text: `Found ${filtered.length} examples in category "${category}":`,
        },
        ...filtered.map((example) => ({
          type: "resource" as const,
          resource: {
            uri: example.uri,
            text: `${example.name}: ${example.description}`,
          },
        })),
      ],
    };
  },
);

/**
 * PROMPTS
 * Prompts are reusable templates that help structure LLM interactions
 * They define common patterns for how to interact with your server
 */

server.registerPrompt(
  "explain-server",
  {
    title: "Explain Server",
    description: "Generate an explanation of what this MCP server can do",
    argsSchema: {
      detail_level: z
        .enum(["basic", "detailed", "technical"])
        .optional()
        .describe("Level of detail in explanation"),
    },
  },
  ({ detail_level }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text:
            (detail_level || "basic") === "basic"
              ? "Please explain what this MCP server can do in simple terms."
              : detail_level === "detailed"
                ? "Please provide a detailed explanation of this MCP server's capabilities, including examples of how to use each feature."
                : "Please provide a technical explanation of this MCP server's architecture, capabilities, and implementation details.",
        },
      },
    ],
  }),
);

server.registerPrompt(
  "troubleshoot",
  {
    title: "Troubleshooting Helper",
    description: "Help troubleshoot issues with the MCP server",
    argsSchema: {
      issue_description: z
        .string()
        .describe("Description of the issue you're experiencing"),
      error_message: z
        .string()
        .optional()
        .describe("Any error message you received"),
    },
  },
  ({ issue_description, error_message }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `I'm having trouble with the MCP server. Here's the issue: ${issue_description}${error_message ? `\n\nError message: ${error_message}` : ""}\n\nCan you help me troubleshoot this?`,
        },
      },
    ],
  }),
);

/**
 * SERVER STARTUP
 */

async function main() {
  try {
    console.error(`🚀 Starting ${SERVER_INFO.name} v${SERVER_INFO.version}`);

    // Connect to stdio transport (for command-line usage)
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("✅ MCP Server running on stdio");
    console.error("📖 Resources available:", [
      "server-info",
      "greeting://{name}",
    ]);
    console.error("🔧 Tools available:", ["calculate", "list-examples"]);
    console.error("💬 Prompts available:", ["explain-server", "troubleshoot"]);
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.error("\n🛑 Shutting down MCP server...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.error("\n🛑 Shutting down MCP server...");
  process.exit(0);
});

// Start the server
if (import.meta.main) {
  main().catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  });
}

