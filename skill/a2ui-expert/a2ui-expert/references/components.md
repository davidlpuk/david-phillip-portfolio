# Standard Component Vocabulary

These are the "out-of-the-box" components typically supported by A2UI compliant renderers.

## Layout Components
- **Standard/Container**: Flex-based wrapper.
- **Standard/Section**: Grouping with title/subtitle.
- **Standard/ColumnLayout**: grid-like layout.

## Display Components
- **Standard/Text**: Thematic text (H1, H2, Body).
- **Standard/Image**: Aspect-ratio controlled image.
- **Standard/Card**: Rounded container with shadow and padding.

## Interactive Components
- **Standard/Button**: Trigger for agent actions.
- **Standard/TextInput**: Captures user input for the agent.
- **Standard/ChoiceSet**: Radio or Checkbox list.

## Usage in Agent Logic (Python)

```python
# Example of an agent sending a card
await surface.update(
    component_name="Standard/Card",
    data={
        "title": "Booking Confirmed",
        "description": "Your table at The French Laundry is set for 7 PM.",
        "image_url": "https://example.com/restaurant.jpg"
    }
)
```
