# A2UI Protocol API Reference (v0.8)

## Core Messages

### `BeginRendering`
Sent by the agent to initiate a UI session.
- `catalogId`: The ID of the component library to use.
- `surfaceId`: Target location in the host app.

### `SurfaceUpdate`
The primary message for changing the UI state.
- `componentName`: The string ID of the component to render (e.g., "Standard/Card").
- `data`: A JSON object matching the component's expected schema.
- `updateId`: Unique identifier for the specific update.

### `EndRendering`
Sent by the agent to close the UI session or clear a surface.

## Data Binding & Types

A2UI uses a strict type system to ensure agents can only send valid data:
- **String**: Simple text nodes.
- **Image**: URLs or base64 assets.
- **Action**: Event triggers (e.g., "button_click" -> agent intent).
- **List/Map**: Nested structures for repeating elements.

## Security
- **Catalog Sandboxing**: Clients ONLY render components defined in their local registry.
- **Opaque UI**: The agent cannot see exactly how the client renders the component, only that it *has* rendered.
