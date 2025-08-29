/**
 * Memories.ai API Types
 * Based on v1.1 and v1.2 API documentation
 */

import { z } from "zod";

// Common response structure
export const BaseResponseSchema = z.object({
	code: z.string(),
	msg: z.string(),
});

// Video status enum
export const VideoStatusSchema = z.enum(["UNPARSE", "PARSE", "FAILED"]);

// Search types
export const SearchTypeSchema = z.enum(["BY_VIDEO", "BY_AUDIO", "BY_CLIP"]);

// Upload response
export const UploadResponseSchema = BaseResponseSchema.extend({
	data: z.object({
		videoNo: z.string(),
		videoName: z.string(),
		videoStatus: VideoStatusSchema,
		uploadTime: z.string(),
	}),
});

// Search response
export const SearchResponseSchema = BaseResponseSchema.extend({
	data: z.object({
		videos: z.array(
			z.object({
				videoNo: z.string(),
				videoName: z.string().optional(),
				videoStatus: VideoStatusSchema.optional(),
				uploadTime: z.string().optional(),
			}),
		),
	}),
});

// List videos response
export const ListVideosResponseSchema = BaseResponseSchema.extend({
	data: z.object({
		videos: z.array(
			z.object({
				videoNo: z.string(),
				videoName: z.string(),
				videoStatus: VideoStatusSchema,
				uploadTime: z.string(),
				duration: z.number().optional(),
				thumbnail: z.string().optional(),
			}),
		),
		totalCount: z.number().optional(),
		page: z.number().optional(),
		size: z.number().optional(),
	}),
});

// Video chat response types
export const ChatMessageSchema = z.object({
	type: z.enum(["thinking", "ref", "content"]),
	sessionId: z.string(),
	title: z.string().optional(),
	content: z.string().optional(),
	role: z.enum(["assistant", "user"]).optional(),
	ref: z.array(z.any()).optional(),
});

// Request schemas for API calls
export const UploadFromUrlRequestSchema = z.object({
	video_url: z.string().url(),
	unique_id: z.string(),
	callback: z.string().url().optional(),
	video_name: z.string().optional(),
});

export const SearchRequestSchema = z.object({
	search_param: z.string(),
	unique_id: z.string(),
	search_type: SearchTypeSchema.default("BY_VIDEO"),
	folder_id: z.number().default(-1),
});

export const ChatRequestSchema = z.object({
	video_nos: z.array(z.string()),
	prompt: z.string(),
	unique_id: z.string(),
	session_id: z.string().optional(),
});

export const ListVideosRequestSchema = z.object({
	unique_id: z.string(),
	page: z.number().min(1).default(1),
	size: z.number().min(1).max(100).default(20),
	video_name: z.string().optional(),
	video_no: z.string().optional(),
	status: VideoStatusSchema.optional(),
});

// Delete videos response
export const DeleteVideosResponseSchema = BaseResponseSchema.extend({
	data: z
		.object({
			deletedVideoIds: z.array(z.string()).optional(),
			message: z.string().optional(),
		})
		.optional(),
});

// Video status response
export const VideoStatusResponseSchema = BaseResponseSchema.extend({
	data: z
		.array(
			z.object({
				videoNo: z.string(),
				status: VideoStatusSchema,
				message: z.string().optional(),
			}),
		)
		.optional(),
});

// Type exports
export type VideoStatus = z.infer<typeof VideoStatusSchema>;
export type SearchType = z.infer<typeof SearchTypeSchema>;
export type UploadResponse = z.infer<typeof UploadResponseSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type ListVideosResponse = z.infer<typeof ListVideosResponseSchema>;
export type DeleteVideosResponse = z.infer<typeof DeleteVideosResponseSchema>;
export type VideoStatusResponse = z.infer<typeof VideoStatusResponseSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type UploadFromUrlRequest = z.infer<typeof UploadFromUrlRequestSchema>;
export type SearchRequest = z.infer<typeof SearchRequestSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ListVideosRequest = z.infer<typeof ListVideosRequestSchema>;
