[![MseeP.ai Security Assessment Badge](https://mseep.net/mseep-audited.png)](https://mseep.ai/app/ritesh2351235-omi-mcp)

# Omi Memories MCP Server

This is a Model Context Protocol (MCP) server that provides access to Omi memories for a specific user through a tool interface.

## Features

- Tool to fetch all memories for the specified user ID from the OMI App

## Setup

1. Install dependencies:
```bash
npm install
```
2. Configure your user ID:
   - Open `src/server.ts`
   - Update the `SPECIFIC_USER_ID` constant with your user ID from the Account section of the Omira App

3. Build the TypeScript code:
```bash
npm run build
```

1. Start the server:
```bash
npm start
```

## Available Tools

### fetch-memories
Fetches all memories for the configured user ID.

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
```
## Cursor IDE Integration

To integrate with Cursor IDE:

1. Open Cursor IDE settings
2. Navigate to "AI & Copilot" settings
3. Under "Model Context Protocol", add a new MCP server with these settings:
```json
{
  "name": "Omi Memories",
  "command": "node",
  "args": [
    "/path/to/your/mcp-server/dist/server.js"
  ],
  "cwd": "/path/to/your/mcp-server",
  "env": {
    "NODE_ENV": "development"
  }
}
```

Replace `/path/to/your/mcp-server` with the actual path to your MCP server installation directory.
