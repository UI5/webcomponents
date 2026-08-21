---
sidebar_label: MCP Server
sidebar_class_name: sidebar-sparkle
title: MCP Server
---

# MCP Server

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server gives your AI assistant direct access to UI5 Web Components documentation, component APIs, and integration guides — no copy-pasting needed.

## Setup

Add the following entry to your MCP client configuration (e.g. `mcp.json`):

```json
{
  "mcpServers": {
    "@ui5/webcomponents-mcp-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@ui5/webcomponents-mcp-server"]
    }
  }
}
```

### One-Click Setup

**VS Code (GitHub Copilot)** — paste the JSON config above into your `.vscode/mcp.json`, or run:

```bash
code --add-mcp '{"name":"@ui5/webcomponents-mcp-server","type":"stdio","command":"npx","args":["-y","@ui5/webcomponents-mcp-server"]}'
```

**Claude Code**

```bash
claude mcp add \
  --transport "stdio" \
  --scope "user" \
  "ui5-webc-mcp-server" \
  -- npx -y "@ui5/webcomponents-mcp-server"
```

**Codex**

```bash
codex mcp add \
  --transport "stdio" \
  "ui5-webc-mcp-server" \
  -- npx -y "@ui5/webcomponents-mcp-server"
```

## Available Tools

| Tool | Description |
|------|-------------|
| `get_component_api` | Fetch API docs for any component — properties, slots, events, methods |
| `get_guidelines` | Get integration guides for React, Angular, or vanilla JavaScript |
| `list_docs` | List all available documentation with summaries |
| `get_doc` | Fetch full content of a specific documentation page |

## Example Prompts

Once the MCP server is configured, try asking your AI assistant:

- *"Show me the API for ui5-button"*
- *"How do I use UI5 Web Components with React?"*
- *"Show me the available documentation"*
- *"Get the theming documentation"*

[View on npm](https://www.npmjs.com/package/@ui5/webcomponents-mcp-server) · [GitHub](https://github.com/UI5/ui5-web-components-mcp-server)
