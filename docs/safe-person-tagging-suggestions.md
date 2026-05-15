# Safe Person Tagging Suggestions

## What This Implements

This implementation supports neutral person suggestions when tagging a person, using only verified links from existing records.

It does not infer that someone is a suspect, dealer, drug user, thief or offender from free text. If sensitive allegation text is present, the text is ignored for ranking and the output records that the allegation was not used.

## Safe Behaviour

- Suggestions are limited to recent verified links, defaulting to the last 90 days.
- Location matching can use street, area or postcode.
- Each suggestion includes source type, source ID, source summary, linked date and reason.
- Labels are neutral, for example `reported_person`, `witness`, `victim`, `associate`, `linked_entity` or `previously_recorded`.
- Every suggestion states that it is not an allegation or suspect recommendation.

## Why This Matters

Free-text phrases such as "drug dealing", "drug users" or "thieves" must not be used to recommend named people. That would create a profiling system and could wrongly implicate someone in criminal activity.

The safe alternative is to show documented context:

- Who has a verified recent link to this location?
- Which record created the link?
- When was the link created?
- Why is the person being surfaced?
- What neutral role was recorded?

## Example Usage

```ts
import { getRelatedPersonSuggestions } from "@shared/person-tagging";

const suggestions = getRelatedPersonSuggestions(
  {
    freeText: "Report mentions drug dealing near the estate entrance",
    location: {
      street: "Example Road",
      area: "Example Estate",
    },
    recencyDays: 90,
  },
  verifiedLinks,
);
```

The returned suggestions should be displayed as "Known related entities" or "Recent verified links", never as "likely suspects".

## UI Recommendations

- Use the heading `Recent verified links`.
- Show `reason`, `sourceSummary`, `sourceId` and `linkedAt` beside each person.
- Require the user to manually select and confirm relevance.
- Add an audit event when a suggestion is selected.
- Provide a "not relevant" dismissal action to improve future ranking.
- Use access controls for sensitive records.
- Keep an explicit disclaimer: "Shown from verified records. Not an allegation or suspect recommendation."
