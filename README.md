# Omi Memories MCP Server

This is a Model Context Protocol (MCP) server that provides access to Omi memories for a specific user through a tool interface.

## Features

- Tool to fetch all memories for the specified user ID (ALX0HDv53IenBBiUJhy1TrOy6r22)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

## Available Tools

### fetch-memories
Fetches all memories for the configured user ID.

Example usage with MCP Client:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

await client.connect(transport);

// Fetch memories using the tool
const result = await client.callTool({
  name: "fetch-memories",
  arguments: {}
});
console.log(result.content[0].text);
```

## Configuration

The server expects:
1. The Express API to be running at `http://localhost:3000`
2. The user ID should configured : Update the `SPECIFIC_USER_ID` constant in `src/server.ts` to your user ID which you could get from the Account section of the Omira App. 

## Claude Desktop Integration

To integrate with Claude Desktop, update your Claude Desktop configuration (`claude_desktop_config.json`) to include:

```json
{
  "mcpServers": {
    "omi-mcp": {
      "command": "node",
      "args": [
        "/path/to/your/mcp-server/dist/server.js"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
} 