export type NeutralPersonRole =
  | "reported_person"
  | "witness"
  | "victim"
  | "associate"
  | "linked_entity"
  | "previously_recorded";

export interface LocationReference {
  street?: string;
  area?: string;
  postcode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VerifiedPersonLink {
  personId: string;
  displayName: string;
  neutralRole: NeutralPersonRole;
  linkedAt: string;
  sourceId: string;
  sourceType:
    | "case"
    | "incident"
    | "intelligence_log"
    | "officer_report"
    | "verified_external_record";
  sourceSummary: string;
  location?: LocationReference;
}

export interface TaggingContext {
  freeText?: string;
  location?: LocationReference;
  now?: Date;
  recencyDays?: number;
}

export interface PersonSuggestion {
  personId: string;
  displayName: string;
  neutralRole: NeutralPersonRole;
  sourceId: string;
  sourceType: VerifiedPersonLink["sourceType"];
  sourceSummary: string;
  linkedAt: string;
  score: number;
  reason: string;
  matchedSignals: string[];
}

const sensitiveAllegationTerms = [
  "drug dealing",
  "dealer",
  "drug user",
  "drug users",
  "thief",
  "thieves",
  "robbery",
  "burglary",
  "assault",
  "suspect",
];

function normalise(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function daysBetween(a: Date, b: Date) {
  return Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
}

function hasSameLocation(a?: LocationReference, b?: LocationReference) {
  if (!a || !b) return false;

  const streetMatch =
    normalise(a.street).length > 0 &&
    normalise(a.street) === normalise(b.street);
  const areaMatch =
    normalise(a.area).length > 0 && normalise(a.area) === normalise(b.area);
  const postcodeMatch =
    normalise(a.postcode).length > 0 &&
    normalise(a.postcode) === normalise(b.postcode);

  return streetMatch || areaMatch || postcodeMatch;
}

function getMatchedLocationSignals(
  contextLocation?: LocationReference,
  linkLocation?: LocationReference,
) {
  const signals: string[] = [];
  if (!contextLocation || !linkLocation) return signals;

  if (
    normalise(contextLocation.street) &&
    normalise(contextLocation.street) === normalise(linkLocation.street)
  ) {
    signals.push(`same street: ${contextLocation.street}`);
  }

  if (
    normalise(contextLocation.area) &&
    normalise(contextLocation.area) === normalise(linkLocation.area)
  ) {
    signals.push(`same area: ${contextLocation.area}`);
  }

  if (
    normalise(contextLocation.postcode) &&
    normalise(contextLocation.postcode) === normalise(linkLocation.postcode)
  ) {
    signals.push(`same postcode: ${contextLocation.postcode}`);
  }

  return signals;
}

export function containsSensitiveAllegationText(text = "") {
  const normalisedText = normalise(text);
  return sensitiveAllegationTerms.some((term) => normalisedText.includes(term));
}

export function getRelatedPersonSuggestions(
  context: TaggingContext,
  verifiedLinks: VerifiedPersonLink[],
): PersonSuggestion[] {
  const now = context.now ?? new Date();
  const recencyDays = context.recencyDays ?? 90;
  const containsSensitiveText = containsSensitiveAllegationText(
    context.freeText,
  );

  return verifiedLinks
    .map((link) => {
      const linkedAt = new Date(link.linkedAt);
      if (Number.isNaN(linkedAt.getTime())) return null;

      const ageDays = daysBetween(now, linkedAt);
      if (ageDays > recencyDays) return null;

      const locationSignals = getMatchedLocationSignals(
        context.location,
        link.location,
      );
      const locationMatch = locationSignals.length > 0;
      if (context.location && !locationMatch) return null;

      const recencyScore = Math.max(0, 1 - ageDays / recencyDays);
      const locationScore = locationMatch ? 0.45 : 0;
      const sourceScore = 0.35;
      const score = Number(
        (sourceScore + locationScore + recencyScore * 0.2).toFixed(3),
      );

      const matchedSignals = [
        ...locationSignals,
        `verified ${link.sourceType.replaceAll("_", " ")}`,
        `linked ${Math.max(0, Math.round(ageDays))} days ago`,
      ];

      if (containsSensitiveText) {
        matchedSignals.push("free-text allegation ignored for ranking");
      }

      return {
        personId: link.personId,
        displayName: link.displayName,
        neutralRole: link.neutralRole,
        sourceId: link.sourceId,
        sourceType: link.sourceType,
        sourceSummary: link.sourceSummary,
        linkedAt: link.linkedAt,
        score,
        reason:
          "Shown because this person has a recent verified link to the selected location or record. This is not an allegation or suspect recommendation.",
        matchedSignals,
      };
    })
    .filter((suggestion): suggestion is PersonSuggestion => Boolean(suggestion))
    .sort((a, b) => b.score - a.score || b.linkedAt.localeCompare(a.linkedAt));
}
