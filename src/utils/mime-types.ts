/**
 * MIME type utilities for video files
 */

/**
 * Get video MIME type from file extension
 */
export function getVideoMimeType(extension: string): string {
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

/**
 * Check if file extension is supported by Memories.ai
 * Based on documentation: h264, h265, vp9, hevc formats
 */
export function isSupportedVideoFormat(extension: string): boolean {
	const supportedExtensions = [".mp4", ".mov", ".webm", ".mkv", ".m4v", ".ts"];

	return supportedExtensions.includes(extension.toLowerCase());
}
