import { useState, useEffect, useCallback, useRef } from "react";
import {
  Save,
  Download,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Sparkles,
  Target,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  FolderOpen,
  FileText,
  Settings,
  History,
  Bell,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  Search,
  Filter,
  Star,
  Zap,
  Brain,
  RefreshCw,
  ChevronRight,
  Building,
  MapPin,
  Mail,
  Globe,
  Linkedin,
  Calendar,
  ArrowRight,
  Upload,
  File,
} from "lucide-react";

/**
 * 🔒 CAS CV Builder
 * AI-Optimized CV Builder for Modern Recruitment
 * Access: /admin/cv-builder
 */

interface CVData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    portfolio: string;
  };
  summary: string;
  capabilities: string[];
  experience: ExperienceItem[];
  skills: SkillsSection[];
  education: EducationItem[];
  interests: string[];
}

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  context: string;
  achievements: string[];
  scope: string;
}

interface SkillsSection {
  id: string;
  category: string;
  items: string[];
}

interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  year: string;
  details: string;
}

interface JobTarget {
  id: string;
  title: string;
  company: string;
  url: string;
  description: string;
  keywords: string[];
  matchScore: number;
  missingKeywords: string[];
  suggestions: string[];
}

const DEFAULT_CV: CVData = {
  personal: {
    name: "David Phillip",
    title: "Head of Design | AI-Native Design Leader",
    email: "david.phillip@gmail.com",
    phone: "",
    location: "London, UK",
    linkedin: "https://linkedin.com/in/davidphillip",
    website: "",
    portfolio: "davidphillip.com",
  },
  summary:
    "Design leader with 20+ years in financial services and SaaS, operating as an AI-native practitioner who orchestrates design, research, and engineering into unified delivery systems. I don't just use AI tools—I design workflows that compress discovery-to-delivery cycles.",
  capabilities: [
    "AI-Augmented Design Practice",
    "Leadership & Team Building",
    "Systems Thinking & Execution",
    "Business & Stakeholder Alignment",
  ],
  experience: [
    {
      id: "1",
      title: "Head of UX – Product Design",
      company: "Cognism",
      location: "London, UK",
      startDate: "Jul 2022",
      endDate: "Jun 2024",
      current: false,
      context: "B2B SaaS scale-up, sales intelligence platform",
      achievements: [
        "Drove $20M → $80M revenue growth with design enabling product-led expansion",
        "Built first Product Design team from scratch; modernised tools and processes",
        "Created cross-functional Design System in Figma",
        "Integrated AI tools into design workflows, accelerating ideation and prototyping",
      ],
      scope: "Team of UX Designers and DesignOps specialists",
    },
    {
      id: "2",
      title: "Director, Design Lead",
      company: "Coutts Private Bank (NatWest Group)",
      location: "London, UK",
      startDate: "Jun 2020",
      endDate: "Jun 2022",
      current: false,
      context: "Private banking for high-net-worth clients",
      achievements: [
        "Scaled team 200% (5→15 specialists), introduced dedicated UX Research practice",
        "Directed launch of new mobile banking app – 70% customer activation",
        "11% new client growth and £1.4bn net new flows attributed to digital sales",
        "Winner: Best Private Bank in UK for Digital Customer Experience",
      ],
      scope: "15 UX professionals across 4 brands",
    },
  ],
  skills: [
    {
      id: "s1",
      category: "Design & Prototyping",
      items: ["Figma (Advanced)", "Framer", "FigJam", "Adobe Creative Suite"],
    },
    {
      id: "s2",
      category: "AI Tools",
      items: [
        "ChatGPT",
        "Midjourney",
        "Claude Code",
        "AI-assisted prototyping",
      ],
    },
    {
      id: "s3",
      category: "Research & Testing",
      items: ["Maze", "Lookback", "UserTesting", "Dovetail"],
    },
    {
      id: "s4",
      category: "Frameworks",
      items: [
        "Design Sprints",
        "Jobs-to-be-Done",
        "Design Systems",
        "DesignOps",
      ],
    },
  ],
  education: [
    {
      id: "e1",
      qualification: "Accredited Spotlight Practitioner",
      institution: "",
      year: "2020",
      details: "Performance psychology and behavioural change",
    },
    {
      id: "e2",
      qualification: "CIM e-Marketing",
      institution: "",
      year: "",
      details: "Distinction",
    },
  ],
  interests: ["International cinema", "Photography", "Travel"],
};

const COMMON_KEYWORDS = {
  "design-leadership": [
    "leadership",
    "team building",
    "mentorship",
    "scale team",
    "design ops",
    "strategy",
    "roadmap",
    "stakeholder management",
  ],
  "ux-research": [
    "user research",
    "usability testing",
    "personas",
    "journey mapping",
    "user interviews",
    "a/b testing",
    "analytics",
  ],
  "design-systems": [
    "design system",
    "component library",
    "style guide",
    "Figma",
    "design tokens",
    "governance",
  ],
  "product-design": [
    "product design",
    "end-to-end",
    "prototyping",
    "wireframes",
    "high fidelity",
    "user flows",
  ],
  "agile-scrum": [
    "agile",
    "scrum",
    "sprint",
    "kanban",
    "jira",
    "cross-functional",
    "collaboration",
  ],
  "fintech-banking": [
    "fintech",
    "banking",
    "payments",
    "wealth management",
    "regulated",
    "compliance",
    "financial services",
  ],
  "ai-ml": [
    "AI",
    "machine learning",
    "generative AI",
    "AI-assisted",
    "AI-augmented",
    "automation",
  ],
};

export default function CVBuilder() {
  const [cv, setCv] = useState<CVData>(DEFAULT_CV);
  const [activeTab, setActiveTab] = useState<
    "personal" | "summary" | "experience" | "skills" | "education" | "preview"
  >("experience");
  const [showPreview, setShowPreview] = useState(true);
  const [showJobTarget, setShowJobTarget] = useState(false);
  const [jobTargets, setJobTargets] = useState<JobTarget[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobTarget | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzingJob, setAnalyzingJob] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["experience"]),
  );
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showAtsPanel, setShowAtsPanel] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [importMode, setImportMode] = useState<"paste" | "file">("paste");

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  // Add new experience item
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: true,
      context: "",
      achievements: [""],
      scope: "",
    };
    setCv((prev) => ({ ...prev, experience: [...prev.experience, newItem] }));
    setExpandedSections((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.add("experience");
      return newExpanded;
    });
  };

  // Add new skill section
  const addSkillSection = () => {
    const newSection: SkillsSection = {
      id: Date.now().toString(),
      category: "",
      items: [""],
    };
    setCv((prev) => ({ ...prev, skills: [...prev.skills, newSection] }));
  };

  // Add new education item
  const addEducation = () => {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      qualification: "",
      institution: "",
      year: "",
      details: "",
    };
    setCv((prev) => ({ ...prev, education: [...prev.education, newItem] }));
  };

  // Generate markdown from CV data
  const generateMarkdown = useCallback(() => {
    const lines: string[] = [];

    // Header
    lines.push(`# ${cv.personal.name}`);
    lines.push(`**${cv.personal.title}**`);
    const contactParts: string[] = [];
    if (cv.personal.location) contactParts.push(cv.personal.location);
    if (cv.personal.linkedin)
      contactParts.push(`[LinkedIn](${cv.personal.linkedin})`);
    if (cv.personal.email) contactParts.push(cv.personal.email);
    if (cv.personal.portfolio) contactParts.push(cv.personal.portfolio);
    lines.push(contactParts.join(" | "));
    lines.push("");

    // Summary
    if (cv.summary) {
      lines.push("## Professional Summary");
      lines.push(cv.summary);
      lines.push("");
    }

    // Capabilities
    if (cv.capabilities.length > 0) {
      lines.push("## Core Capabilities");
      cv.capabilities.forEach((cap) => {
        lines.push(`**${cap}**`);
      });
      lines.push("");
    }

    // Experience
    if (cv.experience.length > 0) {
      lines.push("## Professional Experience");
      cv.experience.forEach((exp) => {
        lines.push(
          `### ${exp.title} | ${exp.company} | ${exp.startDate} – ${exp.current ? "Present" : exp.endDate}`,
        );
        if (exp.location) lines.push(`*${exp.context}*`);
        else if (exp.context) lines.push(`*${exp.context}*`);
        if (exp.achievements.length > 0) {
          exp.achievements.forEach((ach) => {
            if (ach.trim()) lines.push(`- ${ach}`);
          });
        }
        if (exp.scope) {
          lines.push(`**Scope:** ${exp.scope}`);
        }
        lines.push("");
      });
    }

    // Skills
    if (cv.skills.length > 0) {
      lines.push("## Tools & Methods");
      cv.skills.forEach((section) => {
        if (section.category && section.items.length > 0) {
          lines.push(
            `**${section.category}:** ${section.items.filter((i) => i.trim()).join(", ")}`,
          );
        }
      });
      lines.push("");
    }

    // Education
    if (cv.education.length > 0) {
      lines.push("## Education & Development");
      cv.education.forEach((edu) => {
        const parts: string[] = [];
        if (edu.qualification) parts.push(edu.qualification);
        if (edu.institution) parts.push(edu.institution);
        if (edu.year) parts.push(`(${edu.year})`);
        if (parts.length > 0) lines.push(`- ${parts.join(" ")}`);
        if (edu.details) lines.push(`  ${edu.details}`);
      });
      lines.push("");
    }

    // Personal / Interests
    if (cv.interests.length > 0) {
      lines.push("## Personal");
      cv.interests.forEach((p) => {
        if (p.trim()) lines.push(`- ${p}`);
      });
    }

    return lines.join("\n");
  }, [cv]);

  // Analyze job description and calculate ATS score
  const analyzeJobDescription = useCallback(() => {
    if (!jobDescription.trim()) return;

    setAnalyzingJob(true);

    // Simulate analysis (in production, this would call an API)
    setTimeout(() => {
      const jobLower = jobDescription.toLowerCase();
      const allCvText = generateMarkdown().toLowerCase();

      // Extract keywords from job description
      const foundKeywords: string[] = [];
      const missingKeywords: string[] = [];

      Object.values(COMMON_KEYWORDS)
        .flat()
        .forEach((keyword) => {
          if (jobLower.includes(keyword)) {
            if (allCvText.includes(keyword)) {
              foundKeywords.push(keyword);
            } else {
              missingKeywords.push(keyword);
            }
          }
        });

      // Calculate match score
      const totalJobKeywords = foundKeywords.length + missingKeywords.length;
      const matchScore =
        totalJobKeywords > 0
          ? Math.round((foundKeywords.length / totalJobKeywords) * 100)
          : 0;

      // Generate suggestions
      const suggestions: string[] = [];
      if (missingKeywords.length > 0) {
        suggestions.push(
          `Add ${missingKeywords.slice(0, 3).join(", ")} to your skills or experience`,
        );
      }
      if (!jobLower.includes("design") && !jobLower.includes("ux")) {
        // Skip if not relevant
      } else {
        suggestions.push(
          "Quantify achievements with specific metrics where possible",
        );
        suggestions.push("Use action verbs at the start of bullet points");
      }

      const newJob: JobTarget = {
        id: Date.now().toString(),
        title: "Target Position",
        company: "Target Company",
        url: "",
        description: jobDescription,
        keywords: [...foundKeywords, ...missingKeywords],
        matchScore,
        missingKeywords: missingKeywords.slice(0, 10),
        suggestions,
      };

      setJobTargets((prev) => [newJob, ...prev]);
      setSelectedJob(newJob);
      setAnalyzingJob(false);
    }, 1500);
  }, [jobDescription, generateMarkdown]);

  // Generate PDF
  const handleDownloadPDF = useCallback(async () => {
    const markdown = generateMarkdown();
    setPdfLoading(true);
    try {
      // Lazy load PDF dependencies to reduce initial bundle size
      const [{ pdf }, { CVPDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../components/CVPDF")
      ]);

      const blob = await (pdf(
        (<CVPDF markdown={markdown} />) as any,
      ).toBlob() as Promise<Blob>);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `David_Phillip_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setPdfLoading(false);
    }
  }, [generateMarkdown]);

  // Copy markdown to clipboard
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
  };

  // Save CV
  const handleSave = () => {
    const blob = new Blob([generateMarkdown()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DP_CV_${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse imported text and convert to CV data
  const parseImportedCV = (text: string): Partial<CVData> => {
    const lines = text.split("\n").filter((l) => l.trim());
    const result: Partial<CVData> = {
      personal: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        portfolio: "",
      },
      summary: "",
      capabilities: [],
      experience: [],
      skills: [],
      education: [],
      interests: [],
    };

    let currentSection = "";
    let currentExperience: ExperienceItem | null = null;
    let currentSkillsCategory = "";
    let inAchievements = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Detect sections
      if (line.toLowerCase().startsWith("# ") && !line.includes("|")) {
        const name = line.replace(/^#\s*/, "").trim();
        if (name) result.personal!.name = name;
        currentSection = "header";
        continue;
      }

      if (
        line.toLowerCase().startsWith("## professional") ||
        line.toLowerCase().startsWith("## summary")
      ) {
        currentSection = "summary";
        continue;
      }

      if (
        line.toLowerCase().includes("capability") ||
        line.toLowerCase().includes("core ")
      ) {
        currentSection = "capabilities";
        continue;
      }

      if (
        line.toLowerCase().startsWith("## experience") ||
        line.toLowerCase().startsWith("## work") ||
        line.toLowerCase().startsWith("## professional experience")
      ) {
        currentSection = "experience";
        continue;
      }

      if (
        line.toLowerCase().startsWith("## skill") ||
        line.toLowerCase().startsWith("## tool") ||
        line.toLowerCase().startsWith("## tech")
      ) {
        currentSection = "skills";
        continue;
      }

      if (
        line.toLowerCase().startsWith("## education") ||
        line.toLowerCase().startsWith("## qualification")
      ) {
        currentSection = "education";
        continue;
      }

      if (
        line.toLowerCase().startsWith("## interest") ||
        line.toLowerCase().startsWith("## personal")
      ) {
        currentSection = "interests";
        continue;
      }

      // Parse content based on section
      if (currentSection === "header") {
        // Extract contact info
        if (
          line.toLowerCase().includes("@") ||
          line.toLowerCase().includes("email")
        ) {
          const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/);
          if (emailMatch) result.personal!.email = emailMatch[0];
        }
        if (line.toLowerCase().includes("linkedin")) {
          const linkedinMatch = line.match(/linkedin\.com\/in\/[\w-]+/);
          if (linkedinMatch)
            result.personal!.linkedin = `https://${linkedinMatch[0]}`;
        }
        if (
          line.toLowerCase().includes("london") ||
          line.toLowerCase().includes("uk") ||
          line.toLowerCase().includes("location")
        ) {
          const locationMatch = line
            .replace(/\|/g, "")
            .match(/(?:london|uk|united kingdom|england)[\w\s,]*/i);
          if (locationMatch)
            result.personal!.location = locationMatch[0].trim();
        }
        if (line.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)) {
          result.personal!.phone =
            line.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)?.[0] || "";
        }
        continue;
      }

      if (currentSection === "summary" && line.length > 20) {
        result.summary += (result.summary ? "\n" : "") + line;
        continue;
      }

      if (currentSection === "capabilities") {
        const cleanCap = line.replace(/\*\*/g, "").trim();
        if (
          cleanCap &&
          !cleanCap.startsWith("-") &&
          !cleanCap.startsWith("•")
        ) {
          result.capabilities!.push(cleanCap);
        }
        continue;
      }

      if (currentSection === "experience") {
        // Check for new experience entry (### Title | Company | Date)
        if (
          line.startsWith("### ") ||
          line.match(/^[A-Z][a-zA-Z\s]+.*\|.*\|.*\d{4}/)
        ) {
          if (currentExperience && currentExperience.title) {
            result.experience!.push(currentExperience);
          }
          const parts = line
            .replace(/^###\s*/, "")
            .split("|")
            .map((s) => s.trim());
          const titleCompany = parts[0].split("@").map((s) => s.trim());
          currentExperience = {
            id: Date.now().toString() + i,
            title: titleCompany[0] || "",
            company: titleCompany[1] || parts[1] || "",
            location: "",
            startDate: parts[2]?.split("–")[0]?.trim() || "",
            endDate: parts[2]?.includes("Present")
              ? ""
              : parts[2]?.split("–")[1]?.trim() || "",
            current: parts[2]?.includes("Present") || line.includes("Present"),
            context: "",
            achievements: [],
            scope: "",
          };
          inAchievements = false;
          continue;
        }

        // Check for achievements (bullets)
        if (
          (line.startsWith("- ") || line.startsWith("• ")) &&
          currentExperience
        ) {
          const achievement = line.replace(/^[-•]\s*/, "").trim();
          if (achievement) {
            currentExperience.achievements.push(achievement);
          }
          inAchievements = true;
          continue;
        }

        // Context/description lines
        if (
          line.startsWith("*") &&
          currentExperience &&
          !line.startsWith("**")
        ) {
          currentExperience.context = line.replace(/\*/g, "").trim();
          continue;
        }

        // Scope
        if (line.toLowerCase().includes("scope:") && currentExperience) {
          currentExperience.scope = line.replace(/scope:\s*/i, "").trim();
          continue;
        }
        continue;
      }

      if (currentSection === "skills") {
        if (line.startsWith("**") && line.includes(":")) {
          currentSkillsCategory = line
            .replace(/\*\*/g, "")
            .split(":")[0]
            .trim();
          const skillsLine = line.match(/:\s*(.+)/)?.[1] || "";
          const skills = skillsLine
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          if (currentSkillsCategory && skills.length > 0) {
            result.skills!.push({
              id: Date.now().toString() + result.skills!.length,
              category: currentSkillsCategory,
              items: skills,
            });
          }
          continue;
        }
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const skill = line.replace(/^[-•]\s*/, "").trim();
          if (skill) {
            if (currentSkillsCategory) {
              const existing = result.skills!.find(
                (s) => s.category === currentSkillsCategory,
              );
              if (existing) {
                existing.items.push(skill);
              } else {
                result.skills!.push({
                  id: Date.now().toString(),
                  category: currentSkillsCategory,
                  items: [skill],
                });
              }
            } else {
              result.skills!.push({
                id: Date.now().toString(),
                category: "Skills",
                items: [skill],
              });
            }
          }
        }
        continue;
      }

      if (currentSection === "education") {
        if (line.startsWith("- ")) {
          const eduLine = line.replace(/^-\s*/, "").trim();
          const parts = eduLine.split(/[\(\)]/).filter(Boolean);
          const qualification =
            parts[0].split(/at|from/).map((s) => s.trim())[0] || "";
          const institution = eduLine.match(/at\s+([^(]+)/i)?.[1] || "";
          const year = parts[1] || eduLine.match(/\b(19|20)\d{2}\b/)?.[0] || "";
          result.education!.push({
            id: Date.now().toString() + result.education!.length,
            qualification,
            institution,
            year,
            details: parts[1]
              ? parts[0]
                .split(/[\(\)]/)[0]
                .replace(institution, "")
                .trim()
              : "",
          });
        }
        continue;
      }

      if (currentSection === "interests") {
        if (line.startsWith("- ")) {
          const interest = line.replace(/^-\s*/, "").trim();
          if (interest) result.interests!.push(interest);
        }
        continue;
      }
    }

    // Push last experience if exists
    if (currentExperience && currentExperience.title) {
      result.experience!.push(currentExperience);
    }

    return result;
  };

  // Handle import
  const handleImport = () => {
    setImportError("");
    if (!importText.trim()) {
      setImportError("Please paste CV text or upload a file first");
      return;
    }

    try {
      const parsed = parseImportedCV(importText);

      setCv({
        personal: {
          name: parsed.personal?.name || "",
          title: parsed.personal?.title || "",
          email: parsed.personal?.email || "",
          phone: parsed.personal?.phone || "",
          location: parsed.personal?.location || "",
          linkedin: parsed.personal?.linkedin || "",
          website: parsed.personal?.website || "",
          portfolio: parsed.personal?.portfolio || "",
        },
        summary: parsed.summary || "",
        capabilities: parsed.capabilities || [],
        experience: parsed.experience || [],
        skills: parsed.skills || [],
        education: parsed.education || [],
        interests: parsed.interests || [],
      });

      setShowImportModal(false);
      setImportText("");
      setActiveTab("experience");
    } catch (error) {
      setImportError(
        "Failed to parse CV. Please check the format and try again.",
      );
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      !file.name.endsWith(".txt") &&
      !file.name.endsWith(".md") &&
      !file.name.endsWith(".text")
    ) {
      setImportError("Please upload a .txt or .md file");
      return;
    }

    try {
      const text = await file.text();
      setImportText(text);
      setImportError("");
    } catch (error) {
      setImportError("Failed to read file");
    }
  };

  // Generate markdown for preview
  const previewMarkdown = generateMarkdown();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
        <div className="container max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight">CV Builder</h1>
                <p className="text-xs text-zinc-500 font-mono">
                  AI-Optimized ATS Resume Builder
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Import */}
              <button
                onClick={() => setShowImportModal(true)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all flex items-center gap-2"
              >
                <Upload size={16} />
                Import
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              {/* Copy */}
              <button
                onClick={handleCopyMarkdown}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
                title="Copy Markdown"
              >
                <Copy size={16} />
              </button>

              {/* Save */}
              <button
                onClick={handleSave}
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>

              {/* Export PDF */}
              <button
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {pdfLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex container max-w-[1600px] mx-auto px-4 py-6 gap-6">
        {/* Main Editor */}
        <div className="flex-1 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: "personal", icon: FileText, label: "Personal" },
              { id: "summary", icon: Sparkles, label: "Summary" },
              { id: "experience", icon: Briefcase, label: "Experience" },
              { id: "skills", icon: Code, label: "Skills" },
              { id: "education", icon: GraduationCap, label: "Education" },
              { id: "preview", icon: Eye, label: "Preview" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300 bg-zinc-900/50"}`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Personal Info */}
          {activeTab === "personal" && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText size={18} className="text-violet-400" />
                Personal Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={cv.personal.name}
                    onChange={(e) =>
                      setCv((prev) => ({
                        ...prev,
                        personal: { ...prev.personal, name: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={cv.personal.title}
                    onChange={(e) =>
                      setCv((prev) => ({
                        ...prev,
                        personal: { ...prev.personal, title: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={cv.personal.email}
                    onChange={(e) =>
                      setCv((prev) => ({
                        ...prev,
                        personal: { ...prev.personal, email: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={cv.personal.phone}
                    onChange={(e) =>
                      setCv((prev) => ({
                        ...prev,
                        personal: { ...prev.personal, phone: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={cv.personal.location}
                    onChange={(e) =>
                      setCv((prev) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          location: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={cv.personal.linkedin}
                    onChange={(e) =>
                      setCv((prev) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          linkedin: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    Portfolio Website
                  </label>
                  <input
                    type="text"
                    value={cv.personal.portfolio}
                    onChange={(e) =>
                      setCv((prev) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          portfolio: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          {activeTab === "summary" && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles size={18} className="text-violet-400" />
                Professional Summary
              </h2>

              <div>
                <label className="block text-xs text-zinc-500 mb-1">
                  Summary (2-3 sentences recommended)
                </label>
                <textarea
                  value={cv.summary}
                  onChange={(e) =>
                    setCv((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  rows={5}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              {/* Capabilities */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs text-zinc-500">
                    Core Capabilities
                  </label>
                  <button
                    onClick={() =>
                      setCv((prev) => ({
                        ...prev,
                        capabilities: [...prev.capabilities, ""],
                      }))
                    }
                    className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {cv.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={cap}
                        onChange={(e) => {
                          const newCaps = [...cv.capabilities];
                          newCaps[i] = e.target.value;
                          setCv((prev) => ({ ...prev, capabilities: newCaps }));
                        }}
                        className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                      />
                      <button
                        onClick={() =>
                          setCv((prev) => ({
                            ...prev,
                            capabilities: prev.capabilities.filter(
                              (_, idx) => idx !== i,
                            ),
                          }))
                        }
                        className="p-2 text-zinc-500 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience */}
          {activeTab === "experience" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase size={18} className="text-violet-400" />
                  Work Experience
                </h2>
                <button
                  onClick={addExperience}
                  className="px-3 py-1.5 bg-violet-500 text-white text-sm rounded-lg hover:bg-violet-400 transition-all flex items-center gap-1"
                >
                  <Plus size={14} /> Add Role
                </button>
              </div>

              {cv.experience.map((exp, expIdx) => (
                <div
                  key={exp.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden"
                >
                  <div
                    className="px-4 py-3 bg-zinc-800/50 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection(`exp-${exp.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical size={16} className="text-zinc-600" />
                      <span className="font-medium">
                        {exp.title || "New Role"}
                      </span>
                      <span className="text-zinc-500">
                        @ {exp.company || "Company"}
                      </span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-sm text-zinc-500">
                        {exp.startDate} –{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedSections.has(`exp-${exp.id}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCv((prev) => ({
                            ...prev,
                            experience: prev.experience.filter(
                              (_, i) => i !== expIdx,
                            ),
                          }));
                        }}
                        className="p-1 text-zinc-500 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {expandedSections.has(`exp-${exp.id}`) && (
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-zinc-500 mb-1">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const newExp = [...cv.experience];
                              newExp[expIdx].title = e.target.value;
                              setCv((prev) => ({
                                ...prev,
                                experience: newExp,
                              }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-500 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...cv.experience];
                              newExp[expIdx].company = e.target.value;
                              setCv((prev) => ({
                                ...prev,
                                experience: newExp,
                              }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-500 mb-1">
                            Start Date
                          </label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newExp = [...cv.experience];
                              newExp[expIdx].startDate = e.target.value;
                              setCv((prev) => ({
                                ...prev,
                                experience: newExp,
                              }));
                            }}
                            placeholder="e.g., Jul 2022"
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-500 mb-1">
                            End Date
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => {
                                const newExp = [...cv.experience];
                                newExp[expIdx].endDate = e.target.value;
                                newExp[expIdx].current = false;
                                setCv((prev) => ({
                                  ...prev,
                                  experience: newExp,
                                }));
                              }}
                              disabled={exp.current}
                              className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500 disabled:opacity-50"
                            />
                            <label className="flex items-center gap-2 text-xs text-zinc-500 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => {
                                  const newExp = [...cv.experience];
                                  newExp[expIdx].current = e.target.checked;
                                  if (e.target.checked) {
                                    newExp[expIdx].endDate = "";
                                  }
                                  setCv((prev) => ({
                                    ...prev,
                                    experience: newExp,
                                  }));
                                }}
                                className="rounded"
                              />
                              Present
                            </label>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs text-zinc-500 mb-1">
                            Context / Description
                          </label>
                          <input
                            type="text"
                            value={exp.context}
                            onChange={(e) => {
                              const newExp = [...cv.experience];
                              newExp[expIdx].context = e.target.value;
                              setCv((prev) => ({
                                ...prev,
                                experience: newExp,
                              }));
                            }}
                            placeholder="e.g., B2B SaaS scale-up, sales intelligence platform"
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                          />
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs text-zinc-500">
                            Key Achievements
                          </label>
                          <button
                            onClick={() => {
                              const newExp = [...cv.experience];
                              newExp[expIdx].achievements = [
                                ...newExp[expIdx].achievements,
                                "",
                              ];
                              setCv((prev) => ({
                                ...prev,
                                experience: newExp,
                              }));
                            }}
                            className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
                          >
                            <Plus size={12} /> Add Achievement
                          </button>
                        </div>
                        <div className="space-y-2">
                          {exp.achievements.map((ach, achIdx) => (
                            <div
                              key={achIdx}
                              className="flex items-start gap-2"
                            >
                              <span className="mt-2 text-zinc-600">•</span>
                              <textarea
                                value={ach}
                                onChange={(e) => {
                                  const newExp = [...cv.experience];
                                  newExp[expIdx].achievements[achIdx] =
                                    e.target.value;
                                  setCv((prev) => ({
                                    ...prev,
                                    experience: newExp,
                                  }));
                                }}
                                rows={2}
                                placeholder="Describe your achievement with metrics..."
                                className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500 resize-none text-sm"
                              />
                              <button
                                onClick={() => {
                                  const newExp = [...cv.experience];
                                  newExp[expIdx].achievements = newExp[
                                    expIdx
                                  ].achievements.filter((_, i) => i !== achIdx);
                                  setCv((prev) => ({
                                    ...prev,
                                    experience: newExp,
                                  }));
                                }}
                                className="p-2 mt-1 text-zinc-500 hover:text-red-400"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Scope */}
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">
                          Scope / Team Size (optional)
                        </label>
                        <input
                          type="text"
                          value={exp.scope}
                          onChange={(e) => {
                            const newExp = [...cv.experience];
                            newExp[expIdx].scope = e.target.value;
                            setCv((prev) => ({ ...prev, experience: newExp }));
                          }}
                          placeholder="e.g., Team of 5 designers"
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Code size={18} className="text-violet-400" />
                  Skills & Tools
                </h2>
                <button
                  onClick={addSkillSection}
                  className="px-3 py-1.5 bg-violet-500 text-white text-sm rounded-lg hover:bg-violet-400 transition-all flex items-center gap-1"
                >
                  <Plus size={14} /> Add Category
                </button>
              </div>

              {cv.skills.map((section, idx) => (
                <div
                  key={section.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={section.category}
                      onChange={(e) => {
                        const newSkills = [...cv.skills];
                        newSkills[idx].category = e.target.value;
                        setCv((prev) => ({ ...prev, skills: newSkills }));
                      }}
                      placeholder="Category name (e.g., Design Tools)"
                      className="bg-transparent border-b border-zinc-700 pb-1 text-sm font-medium text-zinc-200 focus:outline-none focus:border-violet-500 w-48"
                    />
                    <button
                      onClick={() =>
                        setCv((prev) => ({
                          ...prev,
                          skills: prev.skills.filter((_, i) => i !== idx),
                        }))
                      }
                      className="p-1 text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-1">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newSkills = [...cv.skills];
                            newSkills[idx].items[itemIdx] = e.target.value;
                            setCv((prev) => ({ ...prev, skills: newSkills }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const newSkills = [...cv.skills];
                              newSkills[idx].items.splice(itemIdx + 1, 0, "");
                              setCv((prev) => ({ ...prev, skills: newSkills }));
                            }
                          }}
                          placeholder="Skill name"
                          className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-100 focus:outline-none focus:border-violet-500 w-28"
                        />
                        {section.items.length > 1 && (
                          <button
                            onClick={() => {
                              const newSkills = [...cv.skills];
                              newSkills[idx].items = newSkills[
                                idx
                              ].items.filter((_, i) => i !== itemIdx);
                              setCv((prev) => ({ ...prev, skills: newSkills }));
                            }}
                            className="text-zinc-600 hover:text-red-400"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSkills = [...cv.skills];
                        newSkills[idx].items.push("");
                        setCv((prev) => ({ ...prev, skills: newSkills }));
                      }}
                      className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {activeTab === "education" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap size={18} className="text-violet-400" />
                  Education & Development
                </h2>
                <button
                  onClick={addEducation}
                  className="px-3 py-1.5 bg-violet-500 text-white text-sm rounded-lg hover:bg-violet-400 transition-all flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              {cv.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() =>
                        setCv((prev) => ({
                          ...prev,
                          education: prev.education.filter((_, i) => i !== idx),
                        }))
                      }
                      className="p-1 text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={edu.qualification}
                      onChange={(e) => {
                        const newEdu = [...cv.education];
                        newEdu[idx].qualification = e.target.value;
                        setCv((prev) => ({ ...prev, education: newEdu }));
                      }}
                      placeholder="Qualification"
                      className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                    />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEdu = [...cv.education];
                        newEdu[idx].institution = e.target.value;
                        setCv((prev) => ({ ...prev, education: newEdu }));
                      }}
                      placeholder="Institution"
                      className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const newEdu = [...cv.education];
                        newEdu[idx].year = e.target.value;
                        setCv((prev) => ({ ...prev, education: newEdu }));
                      }}
                      placeholder="Year"
                      className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                    />
                    <input
                      type="text"
                      value={edu.details}
                      onChange={(e) => {
                        const newEdu = [...cv.education];
                        newEdu[idx].details = e.target.value;
                        setCv((prev) => ({ ...prev, education: newEdu }));
                      }}
                      placeholder="Details"
                      className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preview */}
          {activeTab === "preview" && (
            <div className="rounded-xl border border-zinc-800 bg-white overflow-hidden">
              <div className="p-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  Live Preview
                </span>
                <span className="text-xs text-zinc-400">A4 PDF Output</span>
              </div>
              <div className="p-8 max-h-[calc(100vh-350px)] overflow-auto">
                <div className="prose prose-sm max-w-none text-zinc-900">
                  {previewMarkdown.split("\n").map((line, i) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={i} className="text-2xl font-bold mb-1">
                          {line.replace("# ", "")}
                        </h1>
                      );
                    }
                    if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={i}
                          className="text-lg font-bold mt-6 mb-3 text-zinc-800 border-b border-zinc-200 pb-2"
                        >
                          {line.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (line.startsWith("### ")) {
                      return (
                        <h3
                          key={i}
                          className="text-sm font-bold mt-4 mb-1 text-zinc-700"
                        >
                          {line.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <li key={i} className="text-xs text-zinc-600 ml-4 mb-1">
                          {line.replace("- ", "")}
                        </li>
                      );
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p
                          key={i}
                          className="text-sm font-semibold text-zinc-700"
                        >
                          {line.replace(/\*\*/g, "")}
                        </p>
                      );
                    }
                    if (line.trim() === "") {
                      return <div key={i} className="h-3" />;
                    }
                    return (
                      <p
                        key={i}
                        className="text-xs text-zinc-600 leading-relaxed"
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Job Target & ATS Panel */}
        {(showJobTarget || showAtsPanel) && (
          <div className="w-96 flex-shrink-0 space-y-4">
            {/* Job Description Input */}
            {showJobTarget && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                    <Target size={14} />
                    Job Target
                  </span>
                  <button
                    onClick={() => setShowJobTarget(false)}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="p-3">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description here to analyze..."
                    className="w-full h-40 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 text-xs resize-none focus:outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={analyzeJobDescription}
                    disabled={analyzingJob || !jobDescription.trim()}
                    className="w-full mt-2 px-4 py-2 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {analyzingJob ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        Analyze & Optimize
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ATS Analysis Results */}
            {selectedJob && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="p-3 border-b border-zinc-800">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <TrendingUp size={14} className="text-green-400" />
                    ATS Analysis
                  </h3>
                </div>
                <div className="p-3 space-y-4">
                  {/* Match Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Match Score</span>
                    <span
                      className={`text-lg font-bold ${selectedJob.matchScore >= 70 ? "text-green-400" : selectedJob.matchScore >= 50 ? "text-yellow-400" : "text-red-400"}`}
                    >
                      {selectedJob.matchScore}%
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${selectedJob.matchScore >= 70 ? "bg-green-400" : selectedJob.matchScore >= 50 ? "bg-yellow-400" : "bg-red-400"}`}
                      style={{ width: `${selectedJob.matchScore}%` }}
                    />
                  </div>

                  {/* Missing Keywords */}
                  {selectedJob.missingKeywords.length > 0 && (
                    <div>
                      <span className="text-xs text-zinc-500 mb-2 block">
                        Missing Keywords
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedJob.missingKeywords
                          .slice(0, 8)
                          .map((kw, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-xs"
                            >
                              {kw}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {selectedJob.suggestions.length > 0 && (
                    <div>
                      <span className="text-xs text-zinc-500 mb-2 block">
                        Suggestions
                      </span>
                      <ul className="space-y-1">
                        {selectedJob.suggestions.map((s, i) => (
                          <li
                            key={i}
                            className="text-xs text-zinc-400 flex items-start gap-2"
                          >
                            <ArrowRight
                              size={12}
                              className="mt-0.5 text-violet-400 flex-shrink-0"
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-zinc-800 space-y-2">
                    <button className="w-full px-3 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-xs hover:bg-zinc-700 transition-all flex items-center justify-center gap-2">
                      <RefreshCw size={12} />
                      Optimize CV for this job
                    </button>
                    <button className="w-full px-3 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-xs hover:bg-zinc-700 transition-all flex items-center justify-center gap-2">
                      <Save size={12} />
                      Save as job-specific version
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" />
                AI ATS Tips
              </h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-violet-400">•</span>
                  Use exact keywords from job description
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400">•</span>
                  Quantify achievements ($%, numbers)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400">•</span>
                  Put most relevant skills first
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400">•</span>
                  Use standard section headings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400">•</span>
                  Avoid graphics and tables in ATS
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Upload size={18} className="text-violet-400" />
                Import CV
              </h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportText("");
                  setImportError("");
                }}
                className="p-1 text-zinc-500 hover:text-zinc-300"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Mode Selection */}
              <div className="flex gap-2">
                <button
                  onClick={() => setImportMode("paste")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${importMode === "paste" ? "bg-violet-500 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"}`}
                >
                  <FileText size={14} />
                  Paste Text
                </button>
                <button
                  onClick={() => setImportMode("file")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${importMode === "file" ? "bg-violet-500 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"}`}
                >
                  <File size={14} />
                  Upload File
                </button>
              </div>

              {importMode === "paste" ? (
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">
                    Paste CV text (supports Markdown, plain text formats)
                  </label>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    placeholder={`Paste your CV content here...\n\nExample format:\n# Your Name\nYour Title\n\n## Summary\nYour professional summary...\n\n## Experience\n### Senior Designer | Company | Jan 2020 – Present\n- Achievement 1\n- Achievement 2\n\n## Skills\n**Design:** Figma, Sketch\n**Tools:** Jira, Confluence`}
                    className="w-full h-64 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 text-sm focus:outline-none focus:border-violet-500 resize-none font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">
                    Upload a .txt or .md file
                  </label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-violet-500 transition-colors">
                    <Upload size={32} className="mx-auto text-zinc-500 mb-3" />
                    <p className="text-sm text-zinc-400 mb-2">
                      Drag and drop or click to upload
                    </p>
                    <input
                      type="file"
                      accept=".txt,.md,.text"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm cursor-pointer hover:bg-zinc-700"
                    >
                      Choose File
                    </label>
                    {importText && (
                      <p className="mt-3 text-xs text-green-400 flex items-center justify-center gap-1">
                        <Check size={12} />
                        File loaded: {importText.length} characters
                      </p>
                    )}
                  </div>
                </div>
              )}

              {importError && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  <AlertCircle size={14} />
                  {importError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportText("");
                    setImportError("");
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importText.trim()}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-violet-500 text-white hover:bg-violet-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Upload size={14} />
                  Import CV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm p-3">
        <div className="container max-w-[1600px] mx-auto flex items-center justify-between text-xs text-zinc-600">
          <span className="font-mono">🔒 CV Builder v1.0</span>
          <span className="font-mono">AI-Optimized ATS Resume Builder</span>
        </div>
      </footer>
    </div>
  );
}
