/**
 * MCP Prompts for Memories.ai workflows
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerPrompts(server: McpServer) {
	// Video Analysis Prompt
	server.registerPrompt(
		"analyze-video-content",
		{
			title: "Analyze Video Content",
			description:
				"Generate focused prompts for analyzing specific aspects of video content",
			argsSchema: {
				analysis_type: z
					.enum([
						"summary",
						"emotions",
						"objects",
						"activities",
						"transcript",
						"technical",
						"educational",
					])
					.describe("Type of analysis to perform"),
				focus_area: z
					.string()
					.optional()
					.describe(
						"Specific area to focus on (e.g., 'facial expressions', 'background music', 'camera movements')",
					),
				detail_level: z
					.enum(["brief", "detailed", "comprehensive"])
					.optional()
					.describe("Level of detail required in the analysis"),
			},
		},
		({ analysis_type, focus_area, detail_level }) => {
			const prompts = {
				summary: {
					brief:
						"Provide a concise summary of this video's main content and key points.",
					detailed:
						"Provide a comprehensive summary of the video content, highlighting key scenes, actions, important moments, and overall narrative or message.",
					comprehensive:
						"Provide an in-depth analysis and summary covering the video's content, structure, key scenes, character interactions, visual elements, audio components, and overall impact or message.",
				},
				emotions: {
					brief: "Identify the main emotions expressed in this video.",
					detailed:
						"Analyze the emotional content of this video. Identify emotional expressions, mood changes, and overall emotional tone throughout the video.",
					comprehensive:
						"Conduct a thorough emotional analysis including facial expressions, body language, vocal tone, music mood, color psychology, and how emotions evolve throughout the video timeline.",
				},
				objects: {
					brief: "List the main objects and items visible in this video.",
					detailed:
						"Identify and describe all significant objects, items, and visual elements present in this video. Include their locations and interactions.",
					comprehensive:
						"Provide a detailed inventory of all objects, tools, equipment, furniture, natural elements, and visual components, including their relationships, movements, and significance to the video's purpose.",
				},
				activities: {
					brief: "Describe the main activities happening in this video.",
					detailed:
						"Describe all activities, actions, and behaviors occurring in this video. Focus on what people are doing and how they interact.",
					comprehensive:
						"Analyze all human activities, interactions, processes, workflows, and behaviors, including their sequence, purpose, effectiveness, and social dynamics.",
				},
				transcript: {
					brief: "Provide a basic transcript of the spoken content.",
					detailed:
						"Provide a detailed transcript of all spoken content in this video, including speaker identification if multiple people are present.",
					comprehensive:
						"Create a complete transcript with speaker identification, timing information, emotional tone indicators, background sounds, and any text visible on screen.",
				},
				technical: {
					brief: "Analyze the technical aspects of this video.",
					detailed:
						"Analyze technical elements including camera work, lighting, editing, sound quality, and production values.",
					comprehensive:
						"Provide a comprehensive technical analysis covering cinematography, audio engineering, editing techniques, visual effects, color grading, and overall production quality.",
				},
				educational: {
					brief: "Extract the main learning points from this video.",
					detailed:
						"Identify educational content, key concepts taught, and learning objectives covered in this video.",
					comprehensive:
						"Analyze the educational structure, teaching methods, concept progression, examples used, and assess the video's effectiveness as a learning resource.",
				},
			};

			const basePrompt = prompts[analysis_type][detail_level || "detailed"];
			const focusArea = focus_area
				? ` Pay special attention to: ${focus_area}.`
				: "";

			// Add context-specific instructions
			const contextInstructions = {
				transcript:
					" Include timestamps where possible and note any unclear audio.",
				emotions:
					" Consider both explicit emotional expressions and subtle emotional cues.",
				technical:
					" Focus on professional production techniques and quality assessment.",
				educational:
					" Evaluate the clarity of explanations and effectiveness of teaching methods.",
				summary: "",
				objects: "",
				activities: "",
			};

			const prompt =
				basePrompt + focusArea + contextInstructions[analysis_type];

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: prompt,
						},
					},
				],
			};
		},
	);

	// Video Search Query Builder
	server.registerPrompt(
		"build-search-query",
		{
			title: "Video Search Query Builder",
			description:
				"Help construct effective search queries for finding specific video content",
			argsSchema: {
				search_intent: z
					.string()
					.describe("What you're looking for in the videos"),
				search_context: z
					.string()
					.optional()
					.describe(
						"Additional context about the search (location, time period, people, etc.)",
					),
				search_type: z
					.enum(["visual", "audio", "combined"])
					.optional()
					.describe("Type of content to prioritize in search"),
				specificity: z
					.enum(["broad", "specific", "precise"])
					.optional()
					.describe("How specific vs. broad the search should be"),
			},
		},
		({ search_intent, search_context, search_type, specificity }) => {
			const typeInstructions = {
				visual:
					"Focus on visual elements, objects, scenes, colors, actions, people, and visual content when searching.",
				audio:
					"Focus on spoken words, sounds, music, audio content, dialogue, and auditory elements when searching.",
				combined:
					"Search across both visual and audio content comprehensively to find the most relevant matches.",
			};

			const specificityInstructions = {
				broad:
					"Use general terms that will capture a wide range of related content.",
				specific:
					"Use focused terms that target particular aspects while maintaining reasonable scope.",
				precise:
					"Use very specific terminology to find exact matches for particular content.",
			};

			const selectedSearchType = search_type || "combined";
			const selectedSpecificity = specificity || "specific";

			const baseText = `I want to search for videos containing: ${search_intent}\n\n`;
			const searchApproach = `Search approach: ${typeInstructions[selectedSearchType]}\n`;
			const searchSpecificity = `Search specificity: ${specificityInstructions[selectedSpecificity]}\n\n`;

			const contextSection = search_context
				? `Additional context: ${search_context}\n\n`
				: "";

			const instructionsSection = `Please help me craft an effective search query that will find the most relevant videos in my Memories.ai library. Consider:`;

			const prompt =
				baseText +
				searchApproach +
				searchSpecificity +
				contextSection +
				instructionsSection +
				`

1. The most important keywords that describe what I'm looking for
2. Alternative terms or synonyms that might be used
3. Whether to use broad categories or specific details
4. How to balance precision with recall

Provide the optimized search query and explain why it should be effective.`;

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: prompt,
						},
					},
				],
			};
		},
	);

	// Video Workflow Assistant
	server.registerPrompt(
		"video-workflow-helper",
		{
			title: "Video Workflow Helper",
			description:
				"Get step-by-step guidance for common Memories.ai workflows and best practices",
			argsSchema: {
				workflow: z
					.enum([
						"upload",
						"search",
						"analyze",
						"manage",
						"integrate",
						"troubleshoot",
					])
					.describe("Type of workflow you need help with"),
				specific_goal: z
					.string()
					.optional()
					.describe("Your specific goal or use case"),
				experience_level: z
					.enum(["beginner", "intermediate", "advanced"])
					.optional()
					.describe("Your experience level with Memories.ai"),
			},
		},
		({ workflow, specific_goal, experience_level }) => {
			const workflows = {
				upload: {
					beginner:
						"Guide me through the complete process of uploading videos to Memories.ai, including account setup, API key configuration, file preparation, and monitoring upload status.",
					intermediate:
						"Help me optimize my video upload workflow, including best practices for file formats, batch uploads, callback configurations, and status monitoring.",
					advanced:
						"Show me advanced upload strategies including automation, error handling, format optimization, and integration with existing systems.",
				},
				search: {
					beginner:
						"Teach me how to effectively search through my video library using Memories.ai's natural language search capabilities.",
					intermediate:
						"Help me master advanced search techniques and optimize my search queries for better results and efficiency.",
					advanced:
						"Show me how to implement sophisticated search workflows and integrate search capabilities into applications.",
				},
				analyze: {
					beginner:
						"Show me how to use AI to analyze video content for insights, summaries, and information extraction.",
					intermediate:
						"Help me develop effective analysis workflows for different types of video content and use cases.",
					advanced:
						"Guide me in building comprehensive video analysis systems and automating content processing.",
				},
				manage: {
					beginner:
						"Help me organize and manage my video library, including basic organization and deletion of content.",
					intermediate:
						"Show me efficient strategies for organizing large video collections and maintaining clean libraries.",
					advanced:
						"Guide me in implementing automated video management systems with metadata handling and lifecycle management.",
				},
				integrate: {
					beginner:
						"Help me understand how to integrate Memories.ai into my existing workflows and applications.",
					intermediate:
						"Guide me in building robust integrations with proper error handling and optimization.",
					advanced:
						"Show me how to architect scalable systems that leverage Memories.ai effectively in production environments.",
				},
				troubleshoot: {
					beginner:
						"Help me identify and resolve common issues with video processing and API usage.",
					intermediate:
						"Guide me through systematic troubleshooting of complex problems and optimization issues.",
					advanced:
						"Show me advanced debugging techniques and how to diagnose system-level integration problems.",
				},
			};

			const selectedExperience = experience_level || "intermediate";
			const baseWorkflowPrompt = workflows[workflow][selectedExperience];

			const goalSection = specific_goal
				? `\n\nMy specific goal is: ${specific_goal}`
				: "";

			const finalInstructions = `\n\nPlease provide:
1. Step-by-step guidance tailored to my experience level
2. Best practices and common pitfalls to avoid
3. Practical examples and use cases
4. Troubleshooting tips for common issues
5. Next steps for advancing my skills

Make the guidance actionable and include specific tool recommendations where appropriate.`;

			const prompt = baseWorkflowPrompt + goalSection + finalInstructions;

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: prompt,
						},
					},
				],
			};
		},
	);
}
