/**
 * Type-safe Memories.ai API Client using better-fetch
 */

import { createFetch, createSchema } from "@better-fetch/fetch";
import { z } from "zod";
import {
	type ChatRequest,
	ChatRequestSchema,
	type DeleteVideosResponse,
	type ListVideosRequest,
	ListVideosRequestSchema,
	type ListVideosResponse,
	ListVideosResponseSchema,
	type SearchRequest,
	SearchRequestSchema,
	type SearchResponse,
	SearchResponseSchema,
	type UploadFromUrlRequest,
	UploadFromUrlRequestSchema,
	type UploadResponse,
	UploadResponseSchema,
	type VideoStatusResponse,
} from "../types/memories.js";

const API_BASE_URL = "https://api.memories.ai";

// Create schema for all Memories.ai endpoints with correct paths from documentation
const memoriesApiSchema = createSchema({
	// Upload endpoints
	"/serve/api/v1/upload": {
		input: z.object({
			file: z.instanceof(Blob),
			unique_id: z.string(),
			callback: z.string().optional(),
		}),
		output: UploadResponseSchema,
	},
	"/serve/api/v1/upload_url": {
		input: UploadFromUrlRequestSchema,
		output: UploadResponseSchema,
	},

	// Search endpoint
	"/serve/api/v1/search": {
		input: SearchRequestSchema,
		output: SearchResponseSchema,
	},

	// Chat endpoint - handles streaming response
	"/serve/api/v1/chat": {
		input: ChatRequestSchema,
		output: z.object({
			sessionId: z.string(),
			content: z.string(),
			status: z.string(),
		}),
	},

	// Utils endpoints
	"/serve/api/v1/list_videos": {
		input: ListVideosRequestSchema,
		output: ListVideosResponseSchema,
	},

	"/serve/api/v1/delete": {
		input: z.object({
			video_nos: z.array(z.string()),
			unique_id: z.string(),
		}),
		output: z.object({
			code: z.string(),
			msg: z.string(),
			data: z.any(),
		}),
	},

	"/serve/api/v1/status": {
		input: z.object({
			video_nos: z.array(z.string()),
			unique_id: z.string(),
		}),
		output: z.object({
			code: z.string(),
			msg: z.string(),
			data: z.any(),
		}),
	},
});

export class MemoriesAiClient {
	private $fetch;

	constructor(apiKey?: string) {
		this.$fetch = createFetch({
			baseURL: API_BASE_URL,
			schema: memoriesApiSchema,
			headers: apiKey ? { Authorization: apiKey } : {},
			timeout: 30000,
			retry: {
				type: "exponential",
				attempts: 3,
				baseDelay: 1000,
				maxDelay: 5000,
			},
		});
	}

	// Update API key
	setApiKey(apiKey: string) {
		this.$fetch = createFetch({
			baseURL: API_BASE_URL,
			schema: memoriesApiSchema,
			headers: { Authorization: apiKey },
			timeout: 30000,
			retry: {
				type: "exponential",
				attempts: 3,
				baseDelay: 1000,
				maxDelay: 5000,
			},
		});
	}

	// Upload video from file
	async uploadFromFile(
		file: Blob,
		uniqueId: string,
		options?: {
			callback?: string;
			apiKey?: string;
		},
	): Promise<UploadResponse> {
		const headers: Record<string, string> = {};
		if (options?.apiKey) {
			headers.Authorization = options.apiKey;
		}

		const { data, error } = await this.$fetch("/serve/api/v1/upload", {
			method: "POST",
			body: {
				file,
				unique_id: uniqueId,
				callback: options?.callback,
			},
			headers,
		});

		if (error) throw error;
		return data as UploadResponse;
	}

	// Upload video from URL
	async uploadFromUrl(
		request: UploadFromUrlRequest,
		apiKey?: string,
	): Promise<UploadResponse> {
		const headers: Record<string, string> = {};
		if (apiKey) {
			headers.Authorization = apiKey;
		}

		const { data, error } = await this.$fetch("/serve/api/v1/upload_url", {
			method: "POST",
			body: request,
			headers,
		});

		if (error) throw error;
		return data as UploadResponse;
	}

	// Search videos
	async searchVideos(
		request: SearchRequest,
		apiKey?: string,
	): Promise<SearchResponse> {
		const headers: Record<string, string> = {};
		if (apiKey) {
			headers.Authorization = apiKey;
		}

		const { data, error } = await this.$fetch("/serve/api/v1/search", {
			method: "POST",
			body: request,
			headers,
		});

		if (error) throw error;
		return data as SearchResponse;
	}

	// Chat with videos (streaming)
	async chatWithVideos(
		request: ChatRequest,
		apiKey?: string,
	): Promise<{
		sessionId: string;
		content: string;
		status: string;
		fullResponse?: string;
	}> {
		const _headers = apiKey ? { Authorization: apiKey } : {};

		// For streaming chat, we need to handle the response differently
		const requestHeaders: Record<string, string> = {
			"Content-Type": "application/json",
			Accept: "text/event-stream",
		};
		if (apiKey) {
			requestHeaders.Authorization = apiKey;
		}

		const response = await fetch(`${API_BASE_URL}/serve/api/v1/chat`, {
			method: "POST",
			headers: requestHeaders,
			body: JSON.stringify(request),
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		if (!response.body) {
			throw new Error("No response body for streaming request");
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let fullResponse = "";
		let chatContent = "";
		let sessionId = "";
		let lastError = "";

		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				fullResponse += chunk;

				// Process Server-Sent Events line by line
				const lines = chunk.split("\n");
				for (const line of lines) {
					if (line.trim().startsWith("data:")) {
						const dataContent = line.replace("data:", "").trim();

						// Check for completion
						if (dataContent === '"Done"' || dataContent === "Done") {
							return {
								sessionId,
								content: chatContent,
								status: "completed",
							};
						}

						// Check for errors
						if (
							dataContent.includes('"Error"') ||
							dataContent.includes("error") ||
							dataContent.includes("not parsed") ||
							dataContent.includes("not found") ||
							dataContent.includes("don't login")
						) {
							lastError = dataContent;
							continue;
						}

						// Try to parse JSON content
						try {
							if (dataContent.startsWith("{") && dataContent.endsWith("}")) {
								const parsed = JSON.parse(dataContent);

								if (parsed.sessionId) {
									sessionId = parsed.sessionId;
								}

								if (parsed.type === "content" && parsed.content) {
									chatContent += parsed.content;
								} else if (parsed.type === "thinking") {
									chatContent += `[Thinking: ${parsed.title || parsed.content}]\n`;
								} else if (parsed.type === "ref") {
									chatContent += `[Referenced video content]\n`;
								}
							}
						} catch (_parseError) {
							// If not JSON, might be plain text content
							if (
								dataContent &&
								!dataContent.includes("{") &&
								dataContent !== "null"
							) {
								chatContent += dataContent;
							}
						}
					}
				}
			}

			// If we get here without "Done", check for errors
			if (lastError) {
				throw new Error(`Chat API error: ${lastError}`);
			}

			return {
				sessionId,
				content: chatContent || "Response received but no content generated.",
				status: "completed",
				fullResponse: `${fullResponse.substring(0, 1000)}...`,
			};
		} finally {
			reader.releaseLock();
		}
	}

	// List videos
	async listVideos(
		request: ListVideosRequest,
		apiKey?: string,
	): Promise<ListVideosResponse> {
		const headers: Record<string, string> = {};
		if (apiKey) {
			headers.Authorization = apiKey;
		}

		const { data, error } = await this.$fetch("/serve/api/v1/list_videos", {
			method: "POST",
			body: request,
			headers,
		});

		if (error) throw error;
		return data as ListVideosResponse;
	}

	// Delete videos
	async deleteVideos(
		videoNos: string[],
		uniqueId: string,
		apiKey?: string,
	): Promise<DeleteVideosResponse> {
		const headers: Record<string, string> = {};
		if (apiKey) {
			headers.Authorization = apiKey;
		}

		const { data, error } = await this.$fetch("/serve/api/v1/delete", {
			method: "POST",
			body: {
				video_nos: videoNos,
				unique_id: uniqueId,
			},
			headers,
		});

		if (error) throw error;
		return data as DeleteVideosResponse;
	}

	// Check video status
	async checkVideoStatus(
		videoNos: string[],
		uniqueId: string,
		apiKey?: string,
	): Promise<VideoStatusResponse> {
		const headers: Record<string, string> = {};
		if (apiKey) {
			headers.Authorization = apiKey;
		}

		const { data, error } = await this.$fetch("/serve/api/v1/status", {
			method: "POST",
			body: {
				video_nos: videoNos,
				unique_id: uniqueId,
			},
			headers,
		});

		if (error) throw error;
		return data as VideoStatusResponse;
	}
}
