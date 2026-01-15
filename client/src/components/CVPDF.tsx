import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

// Register Montserrat from GitHub raw files (more reliable than gstatic for react-pdf)
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-SemiBold.ttf",
      fontWeight: 600,
    },
    {
      src: "https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Medium.ttf",
      fontWeight: 500,
    },
    {
      src: "https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Italic.ttf",
      fontWeight: 400,
      fontStyle: "italic",
    },
  ],
});

const renderTextWithBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={i} style={{ fontWeight: "bold" }}>{part.slice(2, -2)}</Text>;
    }
    return <Text key={i}>{part}</Text>;
  });
};

const cleanContactItem = (item: string) => {
  const linkMatch = item.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (linkMatch) {
    const url = linkMatch[2];
    // Remove protocol and www
    let cleanUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    // Remove trailing slash
    cleanUrl = cleanUrl.replace(/\/$/, '');
    return cleanUrl.toUpperCase();
  }
  return item;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Montserrat",
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  role: {
    fontSize: 14,
    fontWeight: 700,
    color: "#444444",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 5,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  contactItem: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#666666",
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.4,
    marginTop: 10,
    color: "#000000",
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginRight: 10,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  sectionTag: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    backgroundColor: "#F5F5F5",
    padding: "2 5",
    borderRadius: 2,
    color: "#999999",
    marginLeft: 10,
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    flex: 1,
  },
  jobDate: {
    fontSize: 8,
    fontWeight: 700,
    color: "#666666",
  },
  jobCompanyInfo: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#666666",
    marginBottom: 6,
  },
  jobDescription: {
    fontSize: 9,
    lineHeight: 1.3,
    marginBottom: 8,
  },
  bulletPointContainer: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.3,
  },
  capabilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  capabilityBlock: {
    width: "46%",
  },
  capabilityTitle: {
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 2,
  },
  capabilityText: {
    fontSize: 8.5,
    lineHeight: 1.3,
  },
  table: {
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#666666",
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tableCell: {
    fontSize: 7,
    color: "#333333",
    flex: 1,
    lineHeight: 1.2,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolCategory: {
    width: "30%",
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 8,
    fontWeight: 700,
    marginBottom: 2,
    color: "#666666",
    textTransform: "uppercase",
  },
  toolItems: {
    fontSize: 8.5,
    color: "#000000",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 6,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#BBBBBB",
  },
});

export const CVPDF = ({ markdown }: { markdown: string }) => {
  if (!markdown) return null;

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
              if (linkMatch && linkMatch[1].toLowerCase().includes('linkedin')) {
                const url = linkMatch[2];
                // Clean URL for display
                let cleanUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
                cleanUrl = cleanUrl.replace(/\/$/, '');
                return (
                  <Link key={i} src={url} style={styles.contactItem as any} {...({} as any)}>
                    {cleanUrl.toUpperCase()}
                  </Link>
                );
              }
              return (
                <Text key={i} style={styles.contactItem as any} {...({} as any)}>
                  {cleanContactItem(item)}
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
          const content = section.replace(/^## .*?\n+/, "");

          if (title === "Core Capabilities") {
            const subBlocks = content.split(/\n\n(?=\*\*)/);
            return (
              <View
                key={idx}
                style={styles.section as any}
                keepTogether={true}
                {...({} as any)}
              >
                <View style={styles.sectionHeader as any} minPresenceAhead={60} keepTogether={true} {...({} as any)}>
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
                        <Text
                          style={styles.capabilityText as any}
                          {...({} as any)}
                        >
                          {renderTextWithBold(bText.replace(/- /g, ""))}
                        </Text>
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
              <View key={idx} style={styles.section as any} keepTogether={true} {...({} as any)}>
                <View style={styles.sectionHeader as any} minPresenceAhead={60} keepTogether={true} {...({} as any)}>
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
                  const jobTitle = headerParts[0] || "";
                  const jobComp = headerParts[1] || "";
                  const jobDate = headerParts[2] || "";

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
                                fontWeight: 700,
                                color: "#666666",
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
                          {...({} as any)}
                        >
                          <View style={styles.sectionHeader as any} minPresenceAhead={60} keepTogether={true} {...({} as any)}>
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
                    <View style={styles.sectionHeader as any} minPresenceAhead={60} {...({} as any)}>
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
                                {cell}
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
            const toolBlocks = content.split(/\n\n(?=\*\*)/);
            return (
              <View
                key={idx}
                style={styles.section as any}
                keepTogether={true}
                {...({} as any)}
              >
                <View style={styles.sectionHeader as any} minPresenceAhead={60} keepTogether={true} {...({} as any)}>
                  <Text style={styles.sectionTitle as any} {...({} as any)}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine as any} {...({} as any)} />
                  <Text style={styles.sectionTag as any} {...({} as any)}>
                    STACK
                  </Text>
                </View>
                <View style={styles.toolsGrid as any} {...({} as any)}>
                  {toolBlocks.map((block, i) => {
                    const bTitleMatch = block.match(/^\*\*(.*?)\*\*/);
                    const bTitle = bTitleMatch ? bTitleMatch[1] : "";
                    const bText = block.replace(/^\*\*(.*?)\*\*/, "").trim();
                    return (
                      <View
                        key={i}
                        style={styles.toolCategory as any}
                        {...({} as any)}
                      >
                        <Text style={styles.toolTitle as any} {...({} as any)}>
                          {bTitle}
                        </Text>
                        <Text style={styles.toolItems as any} {...({} as any)}>
                          {renderTextWithBold(bText)}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          }

          if (title === "Education & Development" || title === "Personal") {
            return (
              <View
                key={idx}
                style={styles.section as any}
                keepTogether={true}
                {...({} as any)}
              >
                <View style={styles.sectionHeader as any} minPresenceAhead={60} keepTogether={true} {...({} as any)}>
                  <Text style={styles.sectionTitle as any} {...({} as any)}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine as any} {...({} as any)} />
                </View>
                <Text style={styles.bulletText as any} {...({} as any)}>
                  {renderTextWithBold(content.replace(/- /g, "").trim())}
                </Text>
              </View>
            );
          }

          return null;
        })}

        {/* Footer */}
        <View style={styles.footer as any} fixed {...({} as any)}>
          <Text style={styles.footerText as any} {...({} as any)}>
            David Phillip • Portfolio: davidphillip.com
          </Text>
          <Text style={styles.footerText as any} {...({} as any)}>
            Updated Jan 2026
          </Text>
        </View>
      </Page>
    </Document>
  );
};
