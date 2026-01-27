---
name: a2ui-expert
description: Specialized expertise in A2UI (Agent-to-User Interface) v0.8+. Use this skill to build, deploy, and troubleshoot agent-driven dynamic interfaces. It covers the A2A protocol, declarative UI blueprints, component vocabularies, and the Google Agent Development Kit (ADK).
---

# A2UI Expert

This skill guides you through the architecture, development, and deployment of A2UI applications. A2UI is a standardized protocol for AI agents to generate rich, native, and interactive user interfaces using declarative JSON objects.

## Core Concepts

- **Declarative UI**: Agents send "blueprints" (JSON) rather than code or static HTML.
- **Native Rendering**: Host applications render these blueprints using their own native component libraries (Web/Lit, Angular, Flutter).
- **A2A Protocol**: The Agent-to-Agent/App communication layer (often over gRPC or WebSockets).
- **Component Vocabulary**: A defined set of UI components (catalogs) that an agent is allowed to request.

## Workflows

### 1. Quickstart (From Scratch)
To get a demo running locally:
1.  **Clone**: `git clone https://github.com/google/a2ui.git`
2.  **Auth**: `export GEMINI_API_KEY="AI..."`
3.  **Run**: Navigate to `samples/client/lit` and run `npm install && npm run demo:all`.
    - This launches the Python agent and the Lit-based web client at `http://localhost:5173`.

### 2. Building Interfaces
- **Define Catalogs**: Create a JSON catalog of components your client supports.
- **Rendering Pipeline**:
    - **Init**: Client sends capabilities to the agent.
    - **Start**: Agent sends `beginRendering` with the chosen `catalogId`.
    - **Update**: Agent sends `surfaceUpdate` messages with the component name and state data.
- **Custom Components**: Implement complex widgets in your framework (e.g., Lit) and map them to A2UI IDs.

### 3. Deploying Agents
Use the **Google ADK (Agent Development Kit)**:
1.  **Install**: `pip install google-adk`
2.  **Scaffold**: `adk create my_agent`
3.  **Local Test**: `adk web` to preview the agent interface.
4.  **Production**: Wrap the Python agent in a container (Docker) and host on Cloud Run or Vertex AI. (Note: v0.8 is in public preview, so deployment flows are currently manual).

## Reference Material

- See [references/api_reference.md](references/api_reference.md) for protocol details and message schemas.
- See [references/components.md](references/components.md) for standard UI component definitions.

## Troubleshooting
- **Rendering Errors**: Check if the `catalogId` sent by the agent matches the client's registered catalogs.
- **Connection Issues**: Ensure gRPC or WebSocket ports are open (default varies by sample).
