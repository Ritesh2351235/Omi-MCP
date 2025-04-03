import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

// Create an MCP server
const server = new McpServer({
  name: "OmiMemoriesServer",
  version: "1.0.0"
});

// Configuration
const EXPRESS_API_URL = "https://omira.riteshh.workers.dev";
const SPECIFIC_USER_ID = "Your User ID";

interface Conversation {
  id: string;
  created_at: string;
  started_at: string;
  finished_at: string;
  source: string;
  structured: {
    emoji: string;
    events: any[];
    overview: string;
    title: string;
    action_items: any[];
    category: string;
  };
  transcript_segments: {
    is_user: boolean;
    start: number;
    end: number;
    text: string;
    speaker_id: number;
    speaker: string;
    person_id: null;
  }[];
}

// Add a tool to fetch memories
server.tool(
  "fetch-memories",
  {},  // No parameters needed since we're using a specific user ID
  async () => {
    try {
      const response = await axios.get(`${EXPRESS_API_URL}/memories`, {
        params: { uid: SPECIFIC_USER_ID }
      });

      const conversations: Conversation[] = response.data.conversations;

      // Format conversations for better readability
      const formattedText = conversations.map(conv => {
        return `
Memory: ${conv.id}
Time: ${new Date(conv.created_at).toLocaleString()}
Title: ${conv.structured.title}
Overview: ${conv.structured.overview}
Category: ${conv.structured.category}
Emoji: ${conv.structured.emoji}
Transcript:
${conv.transcript_segments.map(segment => `  ${segment.speaker}: ${segment.text}`).join('\n')}
-------------------
        `.trim();
      }).join('\n\n');

      return {
        content: [{
          type: "text",
          text: formattedText
        }]
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{
            type: "text",
            text: `Error: Failed to fetch memories: ${error.message}`
          }],
          isError: true
        };
      }
      throw error;
    }
  }
);

// Start the server
async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 