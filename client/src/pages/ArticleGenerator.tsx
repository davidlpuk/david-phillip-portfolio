import { useState, useEffect } from "react";
import { useSearchParams } from "wouter";
import { ArrowLeft, Download, Loader2, Save } from "lucide-react";
import Header from "@/components/Header";
import { getArticle } from "@/lib/articles";
import NovelEditor, { prepareForNovel } from "@/components/NovelEditor";

// @ts-ignore
import TurndownService from "turndown";

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
});

// Add custom rules for better formatting
turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement: (content) => `~~${content}~~`
});

turndownService.addRule('underline', {
    filter: (node) => node.style?.textDecoration === 'underline',
    replacement: (content) => `<u>${content}</u>`
});

turndownService.addRule('highlight', {
    filter: (node) => node.style?.backgroundColor || node.classList.contains('highlight'),
    replacement: (content) => `==${content}==`
});

// Handle font-weight bold
turndownService.addRule('fontWeightBold', {
    filter: (node) => {
        const style = node.getAttribute('style') || '';
        return style.includes('font-weight: bold') || style.includes('font-weight: 700') ||
            node.tagName === 'B' || node.classList.contains('bold');
    },
    replacement: (content) => `**${content}**`
});

// Handle font-style italic
turndownService.addRule('fontStyleItalic', {
    filter: (node) => {
        const style = node.getAttribute('style') || '';
        return style.includes('font-style: italic') || node.tagName === 'I' ||
            node.classList.contains('italic');
    },
    replacement: (content) => `*${content}*`
});

// Auto-detect headings based on content patterns
function enhanceMarkdown(markdown: string): string {
    const lines = markdown.split('\n');
    const enhanced: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // If line is short (less than 60 chars), all caps or title case, and not already a heading
        if (line.length > 0 && line.length < 60 && !line.startsWith('#') && !line.startsWith('-')) {
            const words = line.split(' ');
            const isTitleCase = words.every(word =>
                word.length > 0 && word[0] === word[0].toUpperCase()
            );
            const isAllCaps = line === line.toUpperCase() && line !== line.toLowerCase();

            if (isTitleCase || isAllCaps) {
                // Make it a heading
                line = `## ${line}`;
            }
        }

        // Add emphasis to important words
        line = line.replace(/\b(important|key|note|warning|tip)\b/gi, '**$1**');

        enhanced.push(line);
    }

    return enhanced.join('\n');
}

const categories = [
    "Design",
    "UX Design",
    "Development",
    "Design Systems",
    "Accessibility",
    "Product Management",
    "Research",
    "Case Studies"
];

export default function ArticleGenerator() {
    const [searchParams] = useSearchParams();
    const editSlug = searchParams.get('edit');

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
        readTime: 5,
        thumbnail: "",
        slug: "",
        featured: false,
        status: 'draft' as 'draft' | 'published',
        htmlContent: "",
    });
    const [generating, setGenerating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    // Load article for editing
    useEffect(() => {
        if (editSlug) {
            setLoading(true);
            setIsEdit(true);
            getArticle(editSlug)
                .then(article => {
                    if (article) {
                        setFormData({
                            title: article.title,
                            excerpt: article.excerpt,
                            category: article.category,
                            date: article.date,
                            readTime: article.readTime,
                            thumbnail: article.thumbnail,
                            slug: article.slug,
                            featured: article.featured,
                            status: article.status,
                            htmlContent: article.content, // Pass markdown content directly to editor
                        });
                    }
                })
                .catch(error => {
                    console.error('Failed to load article for editing:', error);
                    alert('Failed to load article for editing');
                })
                .finally(() => setLoading(false));
        }
    }, [editSlug]);

    // Auto-generate excerpt and read time when HTML content changes
    useEffect(() => {
        if (formData.htmlContent) {
            // Convert HTML to Markdown for excerpt
            const markdown = turndownService.turndown(formData.htmlContent);
            const paragraphs = markdown.split('\n\n').filter((p: string) => p.trim() && !p.startsWith('#'));
            const firstParagraph = paragraphs[0]?.replace(/\*\*.*?\*\*/g, '').trim() || '';
            const excerpt = firstParagraph.length > 150
                ? firstParagraph.substring(0, 150) + '...'
                : firstParagraph;

            // Calculate read time (average 200 words per minute)
            const wordCount = markdown.split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200));

            // Auto-detect category based on keywords
            let detectedCategory = "";
            const lowerMarkdown = markdown.toLowerCase();
            if (lowerMarkdown.includes('design system') || lowerMarkdown.includes('component')) {
                detectedCategory = "Design Systems";
            } else if (lowerMarkdown.includes('accessibility') || lowerMarkdown.includes('inclusive')) {
                detectedCategory = "Accessibility";
            } else if (lowerMarkdown.includes('ux') || lowerMarkdown.includes('user experience')) {
                detectedCategory = "UX Design";
            } else if (lowerMarkdown.includes('development') || lowerMarkdown.includes('code')) {
                detectedCategory = "Development";
            } else if (lowerMarkdown.includes('research') || lowerMarkdown.includes('study')) {
                detectedCategory = "Research";
            } else {
                detectedCategory = "Design";
            }

            setFormData(prev => ({
                ...prev,
                excerpt,
                readTime,
                category: detectedCategory
            }));
        }
    }, [formData.htmlContent]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, files } = target;
        const checked = target.checked;

        if (name === 'title') {
            // Auto-generate slug from title
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setFormData(prev => ({ ...prev, title: value, slug }));
        } else if (name === 'thumbnailFile' && files && files[0]) {
            // Handle file upload
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target?.result as string;
                setFormData(prev => ({ ...prev, thumbnail: dataUrl }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
            }));
        }
    };

    const generateMarkdown = async () => {
        setGenerating(true);

        try {
            // Novel outputs HTML, convert to Markdown
            let markdownContent = turndownService.turndown(formData.htmlContent);

            // Enhance with automatic formatting
            markdownContent = enhanceMarkdown(markdownContent);

            // Create frontmatter
            const frontmatter = `---
      title: "${formData.title}"
      excerpt: "${formData.excerpt}"
      category: "${formData.category}"
      date: "${formData.date}"
      readTime: ${formData.readTime}
      thumbnail: "${formData.thumbnail}"
      slug: "${formData.slug}"
      featured: ${formData.featured}
      status: "${formData.status}"
      ---
      
      # ${formData.title}
      
      ${markdownContent}`;

            // Save directly to server
            console.log('Sending save request...');
            const response = await fetch('http://localhost:3003/api/save-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: frontmatter,
                    filename: `${formData.slug}.md`
                })
            });
            console.log('Response received:', response.status);

            if (response.ok) {
                const result = await response.json();
                console.log('Save result:', result);
                alert(`Article saved successfully! ${result.message}`);
            } else {
                const errorText = await response.text();
                console.error('Save failed:', response.status, errorText);
                throw new Error(`Failed to save article: ${response.status} ${errorText}`);
            }

        } catch (error) {
            console.error('Error generating/saving article:', error);
            alert('Error generating or saving article. Please check your input.');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen pt-24 md:pt-32">
                <div className="container max-w-4xl mx-auto px-6">
                    <a
                        href="/articles"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Articles
                    </a>

                    <div className="mb-12">
                        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                            {isEdit ? 'Edit Article' : 'Article Generator'}
                        </h1>
                        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl">
                            {isEdit
                                ? 'Edit your article metadata and content.'
                                : 'Generate markdown articles from HTML content. Fill in the metadata and paste your HTML below.'
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Metadata Form */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    placeholder="Article title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Excerpt (auto-generated)</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    readOnly
                                    rows={3}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background/50"
                                    placeholder="Will be generated from content"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Category (auto-detected)</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Read Time (auto-calculated)</label>
                                    <input
                                        type="number"
                                        name="readTime"
                                        value={formData.readTime}
                                        readOnly
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background/50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Thumbnail</label>
                                <input
                                    type="file"
                                    name="thumbnailFile"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                />
                                {formData.thumbnail && (
                                    <p className="text-xs text-muted-foreground mt-1">Image selected and will be embedded in the MD file</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    placeholder="url-friendly-slug"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <label className="text-sm font-medium">Featured Article</label>
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Article Content</label>
                            <NovelEditor
                                defaultValue={prepareForNovel(formData.htmlContent)}
                                onChange={(content) => setFormData(prev => ({ ...prev, htmlContent: content }))}
                                className="min-h-[500px]"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={generateMarkdown}
                            disabled={generating || !formData.title || !formData.htmlContent}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {generating ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Generating & Saving...
                                </>
                            ) : (
                                <>
                                    <Download size={16} />
                                    Generate & Save Article
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}