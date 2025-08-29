# Claude Assistant Configuration

## Documentation and Best Practices

When you're unsure about documentation, APIs, or best practices for any library, framework, or technology:

1. **First, check if Context7 MCP server is available** by using the `mcp__context7__resolve-library-id` and `mcp__context7__get-library-docs` tools
2. **Only use Context7 if available** - if the MCP server tools are not accessible, fall back to other research methods
3. **Use Context7 for up-to-date documentation** on any programming language, framework, or library when you need:
   - Current API documentation
   - Code examples and snippets
   - Best practices and patterns
   - Version-specific information

## When to Use Context7

- When implementing features with unfamiliar libraries
- When debugging issues with specific APIs
- When you need current documentation (your knowledge cutoff is January 2025)
- When looking for idiomatic code patterns
- When working with any technology stack

## Example Usage Pattern

```
1. Identify the library/technology you need help with
2. Use resolve-library-id to find the correct library identifier
3. Use get-library-docs with relevant topic/context
4. Apply the documentation to solve the problem
```

This ensures you always have access to the most current and accurate documentation when available.

## Common Commands

### Development Commands
- `bun run dev` - Start development server with watch mode
- `bun run build` - Build the project using tsdown
- `bun run typecheck` - Run TypeScript type checking
- `bun run check` - Run Biome linter and formatter
- `bun run check:fix` - Run Biome with auto-fix
- `bun run start` - Start the built server

### Code Quality Commands
- `bun run check` - Run Biome linter/formatter
- `bun run check:write` - Run Biome with auto-fix (alias for check:fix)
- `bun run typecheck` - Run TypeScript type checking

## Code Style Guidelines

### TypeScript/MCP Development
- **IMPORTANT**: Use ES modules (import/export) syntax, NOT CommonJS (require)
- Use Biome for consistent code formatting and linting
- Destructure imports when possible: `import { foo } from 'bar'`
- Use TypeScript strict mode - all types must be properly defined
- Prefer `interface` over `type` for object shapes
- Use `const` assertions for immutable data
- **NEVER use `let` declarations** - prefer `const` with functional composition
- **NO inline types** - define proper types in dedicated type files
- Organize imports: Node.js built-ins first, then third-party, then local

### MCP Server Development
- Use Zod schemas for all input/output validation
- Implement proper error handling with user-friendly messages
- Follow MCP SDK patterns for tools, resources, and prompts
- Use type-safe HTTP clients (better-fetch recommended)
- Provide comprehensive troubleshooting guidance in error responses
- Support flexible authentication (environment variables + parameters)

### Project Organization
- **Modular Architecture**: Separate concerns into logical modules
- **Type Safety**: Comprehensive TypeScript coverage with runtime validation
- **Error Handling**: Graceful degradation with helpful error messages
- **Documentation**: Inline JSDoc for complex functions and APIs

## Testing Instructions

### TypeScript/MCP Testing
- Run `bun run typecheck` before committing
- Use `bun run check` to ensure code style compliance
- Test MCP tools with Claude Code or compatible clients
- Validate API integrations with actual service endpoints

### Manual Testing Workflow
1. Build the project: `bun run build`
2. Test with MCP client (Claude Code)
3. Verify API authentication and responses
4. Check error handling with invalid inputs

## Developer Environment Setup

### Prerequisites
- **Node.js** 18+ and **Bun** runtime (recommended)
- **TypeScript** 4.5+ for development
- **Biome** for code formatting (installed as dev dependency)
- **MCP-compatible client** (Claude Code recommended)

### First-time Setup
1. Clone repository and install dependencies:
   ```bash
   cd memcp
   bun install
   ```

2. Set up environment file:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. Build and test:
   ```bash
   bun run build
   bun run typecheck
   bun run check
   ```

### Required Tools
- **Biome**: Code formatting and linting
- **tsdown**: Modern TypeScript bundler
- **better-fetch**: Type-safe HTTP client
- **Zod**: Runtime type validation
- **Context7 MCP**: For up-to-date documentation (when available)

## Project Structure - Memories.ai MCP Server

This is a type-safe MCP server that provides comprehensive integration with the Memories.ai API for video upload, search, chat, and management capabilities.

### Architecture Overview

```
memcp/
├── src/
│   ├── index.ts              # Main MCP server entry point
│   ├── types/
│   │   └── memories.ts       # Comprehensive TypeScript types and Zod schemas
│   ├── clients/
│   │   └── memories.ts       # Type-safe Memories.ai API client with better-fetch
│   ├── tools/
│   │   ├── upload.ts         # Video upload tools (file/URL)
│   │   ├── search.ts         # Video search tools  
│   │   ├── chat.ts           # Video chat tools with streaming
│   │   └── utils.ts          # Video management tools
│   ├── resources/
│   │   └── index.ts          # MCP resources (docs, video details)
│   ├── prompts/
│   │   └── index.ts          # MCP prompts for workflows
│   └── utils/
│       ├── api-key.ts        # API key management utilities
│       └── mime-types.ts     # MIME type detection utilities
```

### Key Features
- 🎯 **Type-Safe Architecture**: Full TypeScript coverage with Zod runtime validation
- 🚀 **Streaming Support**: Server-Sent Events for real-time chat responses
- 🔐 **Flexible Authentication**: Environment variables + per-tool API key parameters
- ⚡ **Performance Optimized**: Connection pooling, retry logic, timeout management
- 📊 **Comprehensive Tools**: 8 MCP tools covering all Memories.ai capabilities
- 🎨 **Intelligent Prompts**: Pre-built workflow templates for video analysis
- 📚 **Rich Resources**: Dynamic documentation and video detail resources

### Technology Stack

**Core Dependencies:**
- **MCP SDK**: `@modelcontextprotocol/sdk` - Official TypeScript MCP SDK
- **Better-Fetch**: `@better-fetch/fetch` - Type-safe HTTP client with schema validation
- **Zod**: Runtime type validation and schema parsing

**Development Tools:**
- **Biome**: Fast formatter and linter for consistent code style
- **tsdown**: Modern TypeScript bundler with ESM output
- **TypeScript**: Strict type checking and compilation

## Repository Workflow

### Git Workflow
- **Main branch**: `main` (production-ready code)
- Create feature branches: `feature/your-feature-name`
- Use conventional commit messages: `feat:`, `fix:`, `docs:`, `refactor:`
- Always run quality checks before committing

### Before Committing
**IMPORTANT**: Always run these checks before committing:

```bash
# Type checking (must pass)
bun run typecheck

# Code formatting and linting (must pass)  
bun run check

# Auto-fix issues where possible
bun run check:fix
```

### Pull Request Guidelines
- Write clear, descriptive PR titles
- Include testing steps in PR description
- Link related issues with `Fixes #123`
- Ensure all quality checks pass
- Test MCP integration with actual clients

## Core Files and Utilities

### Key Implementation Files
- `src/types/memories.ts` - Comprehensive type definitions and Zod schemas
- `src/clients/memories.ts` - Type-safe API client with retry logic and streaming
- `src/tools/*.ts` - Modular MCP tools organized by functionality
- `src/utils/api-key.ts` - Flexible API key resolution logic
- `src/index.ts` - Clean server initialization and registration

### Configuration Files
- `biome.jsonc` - Code style and linting configuration
- `tsdown.config.ts` - Build configuration for ESM output
- `tsconfig.json` - TypeScript compiler configuration
- `package.json` - Dependencies and script definitions

## Debugging and Common Issues

### TypeScript Issues
- **Type errors**: Run `bun run typecheck` to identify issues
- **Import errors**: Ensure proper ES module syntax
- **Missing types**: Add type definitions to `src/types/`

### MCP Integration Issues
- **Server startup**: Check build output with `bun run build`
- **Authentication**: Verify API keys in environment or tool parameters
- **Tool registration**: Check MCP client logs for registration errors

### API Issues  
- **Rate limiting**: Implement exponential backoff (already included)
- **Streaming errors**: Check Server-Sent Events handling in chat client
- **Upload failures**: Verify MIME types and file format support

### Performance Tips
- Use `bun` for faster dependency management and execution
- Build once, run multiple times for production usage  
- Monitor API usage and implement caching where appropriate
- Use streaming responses for real-time user experience

### Troubleshooting Checklist
1. **Build succeeds**: `bun run build` completes without errors
2. **Types validate**: `bun run typecheck` passes
3. **Code quality**: `bun run check` shows no issues
4. **Environment**: API keys properly configured
5. **MCP client**: Compatible client can discover and use tools

**IMPORTANT**: When encountering errors, always check:
1. TypeScript compilation output
2. Biome linting results
3. MCP client integration logs
4. API response validation errors

## Development Best Practices

### Code Organization
- Keep tool implementations focused and single-purpose
- Use proper TypeScript types - no `any` types allowed
- Implement comprehensive error handling with user guidance
- Provide detailed JSDoc for public APIs

### API Integration
- Always validate API responses with Zod schemas
- Implement proper retry logic for transient failures
- Handle streaming responses appropriately
- Support both environment and parameter-based authentication

### MCP Compliance
- Follow MCP specification exactly for tool definitions
- Provide rich error messages with troubleshooting guidance
- Implement resources for dynamic content discovery
- Create reusable prompts for common workflows

### Performance Considerations
- Use connection pooling for HTTP requests
- Implement appropriate timeouts and retry policies
- Stream large responses when possible
- Cache expensive operations where appropriate