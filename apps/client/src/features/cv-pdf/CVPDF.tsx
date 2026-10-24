import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

import { SITE_URL } from "@/rebuild/meta";

/**
 * Register the site's own typefaces, self-hosted in public/fonts/pdf. The
 * browser loads them from the site; the build passes a folder on disk.
 */
export function registerCvFonts(base: string) {
  Font.register({
    family: "Geist",
    fonts: [
      { src: `${base}Geist-Regular.ttf`, fontWeight: 400 },
      { src: `${base}Geist-Medium.ttf`, fontWeight: 500 },
      { src: `${base}Geist-SemiBold.ttf`, fontWeight: 600 },
      { src: `${base}Geist-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "Instrument Serif",
    fonts: [
      { src: `${base}InstrumentSerif-Regular.ttf` },
      { src: `${base}InstrumentSerif-Italic.ttf`, fontStyle: "italic" },
    ],
  });
  Font.register({
    family: "Geist Mono",
    src: `${base}GeistMono-Medium.ttf`,
    fontWeight: 500,
  });
}

if (typeof window !== "undefined") {
  registerCvFonts(`${window.location.origin}/fonts/pdf/`);
}

// Whole words only: hyphenated words break keyword matching in applicant
// tracking systems.
Font.registerHyphenationCallback((word) => [word]);

const colors = {
  ink: "#0c0e12",
  body: "#1f232b",
  stone: "#585c63",
  mist: "#8b919c",
  rule: "#e4e0d6",
  paper: "#f4f1ea",
  cobalt: "#2a4bd8",
};

const siteHost = SITE_URL.replace(/^https?:\/\//, "");

const renderTextWithBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={i} style={{ fontWeight: 600, color: colors.ink }}>{part.slice(2, -2)}</Text>;
    }
    return <Text key={i}>{part}</Text>;
  });
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 64,
    paddingHorizontal: 48,
    fontFamily: "Geist",
    backgroundColor: "#FFFFFF",
    color: colors.body,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  header: {
    marginBottom: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
  },
  name: {
    fontFamily: "Instrument Serif",
    fontSize: 34,
    color: colors.ink,
    letterSpacing: -0.4,
    marginBottom: 2,
  },
  role: {
    fontSize: 10.5,
    fontWeight: 500,
    color: colors.stone,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 14,
    rowGap: 4,
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 8.5,
    color: colors.stone,
    textDecoration: "none",
  },
  contactLink: {
    fontSize: 8.5,
    color: colors.cobalt,
    textDecoration: "none",
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.6,
    marginTop: 8,
    color: colors.body,
    orphans: 2,
    widows: 2,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  section: {
    marginTop: 18,
    marginBottom: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontFamily: "Instrument Serif",
    fontSize: 18,
    color: colors.ink,
    marginRight: 10,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.rule,
  },
  sectionTag: {
    fontFamily: "Geist Mono",
    fontSize: 6.5,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 1,
    backgroundColor: colors.paper,
    padding: "2 6",
    borderRadius: 8,
    color: colors.stone,
    marginLeft: 10,
  },
  experienceItem: {
    marginBottom: 18,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10.5,
    fontWeight: 600,
    color: colors.ink,
    flex: 1,
  },
  jobDate: {
    fontFamily: "Geist Mono",
    fontSize: 7.5,
    fontWeight: 500,
    color: colors.stone,
    marginLeft: 12,
  },
  jobCompanyInfo: {
    fontFamily: "Instrument Serif",
    fontSize: 10.5,
    fontStyle: "italic",
    color: colors.stone,
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 6,
    orphans: 2,
    widows: 2,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  bulletPointContainer: {
    flexDirection: "row",
    marginBottom: 3.5,
    paddingLeft: 2,
  },
  bulletPoint: {
    width: 10,
    fontSize: 9,
    color: colors.cobalt,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    orphans: 2,
    widows: 2,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  capabilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 24,
    rowGap: 12,
  },
  capabilityBlock: {
    width: "47%",
  },
  capabilityTitle: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.ink,
    marginBottom: 4,
  },
  capabilityText: {
    fontSize: 8.5,
    lineHeight: 1.4,
    orphans: 2,
    widows: 2,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  table: {
    width: "100%",
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.paper,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  tableHeaderCell: {
    fontFamily: "Geist Mono",
    fontSize: 6.5,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: colors.stone,
    flex: 1,
    paddingRight: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  tableCell: {
    fontSize: 7.5,
    color: colors.body,
    flex: 1,
    lineHeight: 1.4,
    paddingRight: 6,
    orphans: 2,
    widows: 2,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolCategory: {
    width: "46%",
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 8,
    fontWeight: 600,
    marginBottom: 2,
    color: colors.stone,
    textTransform: "uppercase",
  },
  toolItems: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: colors.body,
    orphans: 2,
    widows: 2,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontFamily: "Geist Mono",
    fontSize: 6.5,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: colors.mist,
  },
});

/** Characters the brand fonts don't have, spelled out so they print and parse. */
const normalise = (markdown: string) => markdown.replace(/★/g, "-star");

const monthYear = (date: Date) =>
  date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });

export const CVPDF = ({
  markdown: source,
  updated = new Date(),
}: {
  markdown: string;
  /** Shown in the footer; the build passes the build date. */
  updated?: Date;
}) => {
  if (!source) return null;
  const markdown = normalise(source);

  // Split into header and sections
  const parts = markdown.split(/\n(?=## )/);
  const headerPart = parts[0];
  const sections = parts.slice(1);

  // Extract header info
  const nameMatch = headerPart.match(/^# (.*)/);
  const name = nameMatch ? nameMatch[1].trim() : "David Phillip";

  const roleMatch = headerPart.match(/\n\*\*(.*)\*\*/);
  const role = roleMatch ? roleMatch[1].trim() : "";

  const contactLine = headerPart
    .split("\n")
    .find(
      (l) => l.includes("|") && (l.includes("LinkedIn") || l.includes("@")),
    );
  const contactItems = contactLine
    ? contactLine.split("|").map((s) => s.trim())
    : [];

  // Summary is everything after contact until the end of headerPart
  const headerLines = headerPart.split("\n");
  const contactIdx = headerLines.findIndex((l) => l === contactLine);
  const summaryText = headerLines
    .slice(contactIdx + 1)
    .join("\n")
    .trim();
  const summaryParagraphs = summaryText.split("\n\n").filter((p) => p.trim());

  return (
    <Document {...({} as any)}>
      <Page size="A4" style={styles.page as any} {...({} as any)}>
        {/* Header */}
        <View style={styles.header as any} {...({} as any)}>
          <Text style={styles.name as any} {...({} as any)}>
            {name}
          </Text>
          <Text style={styles.role as any} {...({} as any)}>
            {role}
          </Text>
          <View style={styles.contactRow as any} {...({} as any)}>
            {contactItems.map((item, i) => {
              const linkMatch = item.match(/\[([^\]]+)\]\(([^)]+)\)/);
              if (linkMatch) {
                const url = linkMatch[2];
                const label = url
                  .replace(/^https?:\/\//, "")
                  .replace(/^www\./, "")
                  .replace(/\/$/, "");
                return (
                  <Link key={i} src={url} style={styles.contactLink as any} {...({} as any)}>
                    {label}
                  </Link>
                );
              }
              if (item.includes("@")) {
                return (
                  <Link key={i} src={`mailto:${item}`} style={styles.contactLink as any} {...({} as any)}>
                    {item}
                  </Link>
                );
              }
              return (
                <Text key={i} style={styles.contactItem as any} {...({} as any)}>
                  {item}
                </Text>
              );
            })}
          </View>
          {summaryParagraphs.map((p, i) => (
            <Text key={i} style={styles.summary as any} {...({} as any)}>
              {renderTextWithBold(p)}
            </Text>
          ))}
        </View>

        {/* Sections */}
        {sections.map((section, idx) => {
          const titleMatch = section.match(/^## (.*?)\n/);
          const title = titleMatch ? titleMatch[1].trim() : "";
          const content = section.replace(/^## .*?\n+/, "").trim();

          if (title === "Core Capabilities") {
            const subBlocks = content.split(/\n\n(?=\*\*)/);
            return (
              <View
                key={idx}
                style={styles.section as any}
                {...({} as any)}
              >
                <View
                  style={styles.sectionHeader as any}
                  minPresenceAhead={120}
                  keepTogether={true}
                  {...({} as any)}
                >
                  <Text style={styles.sectionTitle as any} {...({} as any)}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine as any} {...({} as any)} />
                  <Text style={styles.sectionTag as any} {...({} as any)}>
                    EXPERTISE
                  </Text>
                </View>
                <View style={styles.capabilitiesGrid as any} {...({} as any)}>
                  {subBlocks.map((block, i) => {
                    const bTitleMatch = block.match(/^\*\*(.*?)\*\*/);
                    const bTitle = bTitleMatch ? bTitleMatch[1] : "";
                    const bText = block.replace(/^\*\*(.*?)\*\*\n/, "").trim();
                    const bulletPoints = bText
                      .split("\n")
                      .filter((line) => line.trim().startsWith("-"))
                      .map((line) => line.replace(/^- /, "").trim());
                    return (
                      <View
                        key={i}
                        style={styles.capabilityBlock as any}
                        {...({} as any)}
                      >
                        <Text
                          style={styles.capabilityTitle as any}
                          {...({} as any)}
                        >
                          {bTitle}
                        </Text>
                        {bulletPoints.map((point, j) => (
                          <View
                            key={j}
                            style={styles.bulletPointContainer as any}
                            {...({} as any)}
                          >
                            <Text
                              style={styles.bulletPoint as any}
                              {...({} as any)}
                            >
                              •
                            </Text>
                            <Text
                              style={styles.bulletText as any}
                              {...({} as any)}
                            >
                              {renderTextWithBold(point)}
                            </Text>
                          </View>
                        ))}
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          }

          if (title === "Professional Experience") {
            const earlierCareerIndex = content.indexOf("### Earlier Career");
            const jobsContent = earlierCareerIndex >= 0 ? content.substring(0, earlierCareerIndex) : content;
            const tableContent = earlierCareerIndex >= 0 ? content.substring(earlierCareerIndex) : "";

            const jobs = jobsContent.split(/\n(?=### )/);
            return (
              <View key={idx} style={styles.section as any} break="page" {...({} as any)}>
                <View
                  style={styles.sectionHeader as any}
                  minPresenceAhead={120}
                  keepTogether={true}
                  {...({} as any)}
                >
                  <Text style={styles.sectionTitle as any} {...({} as any)}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine as any} {...({} as any)} />
                  <Text style={styles.sectionTag as any} {...({} as any)}>
                    HISTORY
                  </Text>
                </View>
                {jobs.map((job, i) => {
                  if (!job.trim()) return null;
                  const jobHeaderMatch = job.match(/^### (.*?)\n/);
                  const jobHeader = jobHeaderMatch ? jobHeaderMatch[1] : "";
                  const headerParts = jobHeader.split("|").map((s) => s.trim());
                  // "Title | Company | Dates", or "Title | Dates" for the career break
                  const datesOnly = headerParts.length === 2 && /\d{4}/.test(headerParts[1]);
                  const jobTitle = headerParts[0] || "";
                  const jobComp = datesOnly ? "" : headerParts[1] || "";
                  const jobDate = datesOnly ? headerParts[1] : headerParts[2] || "";

                  const jobLines = job
                    .replace(/^### .*?\n/, "")
                    .split("\n")
                    .filter((l) => l.trim());
                  const context =
                    jobLines
                      .find((l) => l.startsWith("*"))
                      ?.replace(/\*/g, "") || "";
                  const bullets = jobLines
                    .filter((l) => l.trim().startsWith("-"))
                    .map((l) => l.replace(/^- /, ""));
                  const scope =
                    jobLines
                      .find((l) => l.startsWith("**Scope"))
                      ?.replace(/\*\*/g, "") || "";
                  const description =
                    jobLines.find(
                      (l) =>
                        !l.startsWith("*") &&
                        !l.startsWith("-") &&
                        !l.startsWith("**Impact") &&
                        !l.startsWith("**Scope"),
                    ) || "";

                  return (
                    <View
                      key={i}
                      style={styles.experienceItem as any}
                      wrap={false}
                      {...({} as any)}
                    >
                      <View
                        style={styles.experienceHeader as any}
                        {...({} as any)}
                      >
                        <Text style={styles.jobTitle as any} {...({} as any)}>
                          {jobTitle} {jobComp ? `| ${jobComp}` : ""}
                        </Text>
                        <Text style={styles.jobDate as any} {...({} as any)}>
                          {jobDate}
                        </Text>
                      </View>
                      {context && (
                        <Text
                          style={styles.jobCompanyInfo as any}
                          {...({} as any)}
                        >
                          {context}
                        </Text>
                      )}
                      {description && (
                        <Text
                          style={styles.jobDescription as any}
                          {...({} as any)}
                        >
                          {renderTextWithBold(description)}
                        </Text>
                      )}
                      {bullets.map((bullet, j) => (
                        <View
                          key={j}
                          style={styles.bulletPointContainer as any}
                          {...({} as any)}
                        >
                          <Text
                            style={styles.bulletPoint as any}
                            {...({} as any)}
                          >
                            •
                          </Text>
                          <Text
                            style={styles.bulletText as any}
                            {...({} as any)}
                          >
                            {renderTextWithBold(bullet)}
                          </Text>
                        </View>
                      ))}
                      {scope && (
                        <Text
                          style={
                            [
                              styles.bulletText as any,
                              {
                                marginTop: 4,
                                fontWeight: 500,
                                color: colors.stone,
                              },
                            ] as any
                          }
                          {...({} as any)}
                        >
                          {renderTextWithBold(scope)}
                        </Text>
                      )}
                    </View>
                  );
                })}
                {tableContent && (() => {
                  const tableTitleMatch = tableContent.match(/^### (.*?)\n/);
                  const tableTitle = tableTitleMatch ? tableTitleMatch[1] : "";
                  const tableBody = tableContent.replace(/^### .*?\n+/, "");

                  const tableLines = tableBody.split("\n");
                  const tableStartIndex = tableLines.findIndex(
                    (l) => l.trim().startsWith("|") && !l.includes("---"),
                  );
                  const tableEndIndex = tableLines.findIndex(
                    (l, i) => i > tableStartIndex && l.trim() === "",
                  );

                  if (tableStartIndex >= 0) {
                    const tableContentSlice =
                      tableEndIndex > 0
                        ? tableLines.slice(tableStartIndex, tableEndIndex)
                        : tableLines.slice(tableStartIndex);

                    const filteredLines = tableContentSlice.filter(
                      (l) =>
                        l.trim().startsWith("|") &&
                        !l.includes("---") &&
                        l.trim() !== "|",
                    );

                    if (filteredLines.length >= 1) {
                      const headerCells = filteredLines[0]
                        .split("|")
                        .map((s: string) => s.trim())
                        .filter((s: string) => s);
                      const dataRows = filteredLines.slice(1).map((row: string) =>
                        row
                          .split("|")
                          .map((s: string) => s.trim())
                          .filter((s: string) => s),
                      );

                      const dateRangeMatch = tableTitle.match(/\((\d{4}.*?)\)/);
                      const dateRange = dateRangeMatch ? dateRangeMatch[1] : "";
                      const displayTitle = tableTitle.replace(/\s*\(.*?\)\s*/, "").trim();

                      return (
                        <View
                          style={styles.section as any}
                          keepTogether={true}
                          break="page"
                          {...({} as any)}
                        >
                          <View
                            style={styles.sectionHeader as any}
                            minPresenceAhead={120}
                            keepTogether={true}
                            {...({} as any)}
                          >
                            <Text style={styles.sectionTitle as any} {...({} as any)}>
                              {displayTitle}
                            </Text>
                            <View
                              style={styles.sectionLine as any}
                              {...({} as any)}
                            />
                            {dateRange && (
                              <Text style={styles.sectionTag as any} {...({} as any)}>
                                {dateRange}
                              </Text>
                            )}
                          </View>
                          <View style={styles.table as any} wrap={true} {...({} as any)}>
                            <View style={styles.tableHeader as any} {...({} as any)}>
                              {headerCells.map((h: string, i: number) => {
                                let flexValue = 0.8;
                                if (h === "Period") flexValue = 0.6;
                                else if (h === "Highlights") flexValue = 1.8;
                                return (
                                  <Text
                                    key={i}
                                    style={
                                      [
                                        styles.tableHeaderCell as any,
                                        { flex: flexValue },
                                      ] as any
                                    }
                                    {...({} as any)}
                                  >
                                    {h}
                                  </Text>
                                );
                              })}
                            </View>
                            {dataRows.map((row: string[], i: number) => (
                              <View
                                key={i}
                                style={styles.tableRow as any}
                                wrap={true}
                                {...({} as any)}
                              >
                                {row.map((cell: string, j: number) => {
                                  let flexValue = 0.8;
                                  if (j === 0)
                                    flexValue = 0.6; // Period column
                                  else if (headerCells[j] === "Highlights")
                                    flexValue = 1.8;
                                  return (
                                    <Text
                                      key={j}
                                      style={
                                        [
                                          styles.tableCell as any,
                                          { flex: flexValue },
                                        ] as any
                                      }
                                      {...({} as any)}
                                    >
                                      {renderTextWithBold(cell)}
                                    </Text>
                                  );
                                })}
                              </View>
                            ))}
                          </View>
                        </View>
                      );
                    }
                  }
                  return null;
                })()}
              </View>
            );
          }

          // Check for table sections (Earlier Career, etc.)
          if (
            title.includes("Earlier Career") ||
            content.includes("| Period") ||
            content.includes("| Role")
          ) {
            // Extract just the table part (between first and last table rows)
            const tableLines = content.split("\n");
            const tableStartIndex = tableLines.findIndex(
              (l) => l.trim().startsWith("|") && !l.includes("---"),
            );
            const tableEndIndex = tableLines.findIndex(
              (l, i) => i > tableStartIndex && l.trim() === "",
            );

            if (tableStartIndex >= 0) {
              const tableContent =
                tableEndIndex > 0
                  ? tableLines.slice(tableStartIndex, tableEndIndex)
                  : tableLines.slice(tableStartIndex);

              // Filter out separator rows (---) and empty lines
              const filteredLines = tableContent.filter(
                (l) =>
                  l.trim().startsWith("|") &&
                  !l.includes("---") &&
                  l.trim() !== "|",
              );

              if (filteredLines.length >= 1) {
                // Extract header and data rows
                const headerCells = filteredLines[0]
                  .split("|")
                  .map((s: string) => s.trim())
                  .filter((s: string) => s);
                const dataRows = filteredLines.slice(1).map((row: string) =>
                  row
                    .split("|")
                    .map((s: string) => s.trim())
                    .filter((s: string) => s),
                );

                // Extract date range from title
                const dateRangeMatch = title.match(/\((\d{4}.*?)\)/);
                const dateRange = dateRangeMatch ? dateRangeMatch[1] : "";
                const displayTitle = title.replace(/\s*\(.*?\)\s*/, "").trim();

                return (
                  <View
                    key={idx}
                    style={styles.section as any}
                    keepTogether={true}
                    {...({} as any)}
                  >
                    <View
                      style={styles.sectionHeader as any}
                      minPresenceAhead={120}
                      keepTogether={true}
                      {...({} as any)}
                    >
                      <Text style={styles.sectionTitle as any} {...({} as any)}>
                        {displayTitle}
                      </Text>
                      <View
                        style={styles.sectionLine as any}
                        {...({} as any)}
                      />
                      {dateRange && (
                        <Text style={styles.sectionTag as any} {...({} as any)}>
                          {dateRange}
                        </Text>
                      )}
                    </View>
                    <View style={styles.table as any} wrap={true} {...({} as any)}>
                      <View style={styles.tableHeader as any} {...({} as any)}>
                        {headerCells.map((h: string, i: number) => {
                          let flexValue = 0.8;
                          if (h === "Period") flexValue = 0.6;
                          else if (h === "Highlights") flexValue = 1.8;
                          return (
                            <Text
                              key={i}
                              style={
                                [
                                  styles.tableHeaderCell as any,
                                  { flex: flexValue },
                                ] as any
                              }
                              {...({} as any)}
                            >
                              {h}
                            </Text>
                          );
                        })}
                      </View>
                      {dataRows.map((row: string[], i: number) => (
                        <View
                          key={i}
                          style={styles.tableRow as any}
                          wrap={true}
                          {...({} as any)}
                        >
                          {row.map((cell: string, j: number) => {
                            let flexValue = 0.8;
                            if (j === 0)
                              flexValue = 0.6; // Period column
                            else if (headerCells[j] === "Highlights")
                              flexValue = 1.8;
                            return (
                              <Text
                                key={j}
                                style={
                                  [
                                    styles.tableCell as any,
                                    { flex: flexValue },
                                  ] as any
                                }
                                {...({} as any)}
                              >
                                {renderTextWithBold(cell)}
                              </Text>
                            );
                          })}
                        </View>
                      ))}
                    </View>
                  </View>
                );
              }
            }
          }

          if (title === "Tools & Methods") {
            const toolBlocks = content
              .split("\n")
              .filter((line) => line.trim().startsWith("-"))
              .map((line) => line.replace(/^- /, "").trim());
            const midPoint = Math.ceil(toolBlocks.length / 2);
            const leftColumn = toolBlocks.slice(0, midPoint);
            const rightColumn = toolBlocks.slice(midPoint);

            return (
              <View
                key={idx}
                style={styles.section as any}
                keepTogether={true}
                {...({} as any)}
              >
                <View
                  style={styles.sectionHeader as any}
                  minPresenceAhead={120}
                  keepTogether={true}
                  {...({} as any)}
                >
                  <Text style={styles.sectionTitle as any} {...({} as any)}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine as any} {...({} as any)} />
                  <Text style={styles.sectionTag as any} {...({} as any)}>
                    STACK
                  </Text>
                </View>
                <View style={styles.capabilitiesGrid as any} {...({} as any)}>
                  <View style={styles.capabilityBlock as any} {...({} as any)}>
                    {leftColumn.map((block, i) => {
                      const colonIndex = block.indexOf(':');
                      const bTitle = colonIndex > 0 ? block.substring(0, colonIndex).replace(/^\*\*/, '').replace(/\*\*$/, '').trim() : block;
                      const bText = colonIndex > 0 ? block.substring(colonIndex + 1).replace(/\*\*/g, '').trim() : '';
                      return (
                        <View
                          key={i}
                          style={styles.bulletPointContainer as any}
                          {...({} as any)}
                        >
                          <Text
                            style={styles.bulletPoint as any}
                            {...({} as any)}
                          >
                            •
                          </Text>
                          <Text
                            style={styles.bulletText as any}
                            {...({} as any)}
                          >
                            <Text style={{ fontWeight: 600, color: colors.ink } as any} {...({} as any)}>
                              {bTitle}
                            </Text>
                            {bText && `: ${bText}`}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.capabilityBlock as any} {...({} as any)}>
                    {rightColumn.map((block, i) => {
                      const colonIndex = block.indexOf(':');
                      const bTitle = colonIndex > 0 ? block.substring(0, colonIndex).replace(/^\*\*/, '').replace(/\*\*$/, '').trim() : block;
                      const bText = colonIndex > 0 ? block.substring(colonIndex + 1).replace(/\*\*/g, '').trim() : '';
                      return (
                        <View
                          key={i}
                          style={styles.bulletPointContainer as any}
                          {...({} as any)}
                        >
                          <Text
                            style={styles.bulletPoint as any}
                            {...({} as any)}
                          >
                            •
                          </Text>
                          <Text
                            style={styles.bulletText as any}
                            {...({} as any)}
                          >
                            <Text style={{ fontWeight: 600, color: colors.ink } as any} {...({} as any)}>
                              {bTitle}
                            </Text>
                            {bText && `: ${bText}`}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          }

          if (title === "Education & Development") {
            const bulletPoints = content
              .split("\n")
              .filter((line) => line.trim().startsWith("-") && !line.trim().match(/^-\s*-+$/))
              .map((line) => line.replace(/^- /, "").trim());
            return (
              <View
                key={idx}
                style={styles.section as any}
                keepTogether={true}
                {...({} as any)}
              >
                <View
                  style={styles.sectionHeader as any}
                  minPresenceAhead={120}
                  keepTogether={true}
                  {...({} as any)}
                >
                  <Text style={styles.sectionTitle as any} {...({} as any)}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine as any} {...({} as any)} />
                </View>
                {bulletPoints.map((point, i) => (
                  <View
                    key={i}
                    style={styles.bulletPointContainer as any}
                    {...({} as any)}
                  >
                    <Text
                      style={styles.bulletPoint as any}
                      {...({} as any)}
                    >
                      •
                    </Text>
                    <Text
                      style={styles.bulletText as any}
                      {...({} as any)}
                    >
                      {renderTextWithBold(point)}
                    </Text>
                  </View>
                ))}
              </View>
            );
          }

          if (title === "Personal") {
            return (
              <View
                key={idx}
                style={styles.section as any}
                keepTogether={true}
                {...({} as any)}
              >
                <View
                  style={styles.sectionHeader as any}
                  minPresenceAhead={120}
                  keepTogether={true}
                  {...({} as any)}
                >
                  <Text style={styles.sectionTitle as any} {...({} as any)}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine as any} {...({} as any)} />
                </View>
                <Text style={styles.bulletText as any} {...({} as any)}>
                  {renderTextWithBold(content.trim())}
                </Text>
              </View>
            );
          }

          return null;
        })}

        {/* Footer */}
        <View style={styles.footer as any} fixed {...({} as any)}>
          <Text style={styles.footerText as any} {...({} as any)}>
            David Phillip · {siteHost}
          </Text>
          <Text
            style={styles.footerText as any}
            render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
              `Updated ${monthYear(updated)} · ${pageNumber} / ${totalPages}`
            }
            {...({} as any)}
          />
        </View>
      </Page>
    </Document >
  );
};
