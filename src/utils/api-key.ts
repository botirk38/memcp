/**
 * API Key management utilities
 */

/**
 * Get API key from various sources with priority:
 * 1. Query parameter (highest priority)
 * 2. Provided parameter
 * 3. Environment variable
 */
export function getApiKey(providedKey?: string): string {
	const apiKey = providedKey || process.env.MEMORIES_API_KEY;

	if (!apiKey) {
		throw new Error(
			"API key is required. Provide it via 'api_key' parameter or MEMORIES_API_KEY environment variable.",
		);
	}

	return apiKey;
}

/**
 * Extract API key from MCP tool arguments (treating it as a query parameter conceptually)
 * This simulates query parameter behavior within MCP tool calls
 */
export function extractApiKeyFromArgs(
	args: Record<string, unknown>,
): string | undefined {
	return args.api_key as string | undefined;
}

/**
 * Validate API key format (basic validation)
 */
export function validateApiKey(apiKey: string): boolean {
	return (
		typeof apiKey === "string" && apiKey.length > 0 && apiKey.trim() === apiKey
	);
}
