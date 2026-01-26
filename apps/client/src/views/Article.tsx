import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Clock, Calendar, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/shared/components/Header";
import { getArticle } from "@/shared/lib/articles";
import type { Article } from "@/shared/types/article";

// Custom component to skip the first h1 if it matches the article title
function CustomHeading({ level, children, ...props }: any) {
  if (level === 1 && typeof children === 'string' && children.trim() === props.articleTitle) {
    return null; // Skip rendering this heading
  }
  const Component = `h${level}`;
  return <Component {...props}>{children}</Component>;
}

export default function ArticlePage() {
  const [, params] = useRoute<{ slug: string }>("/articles/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Article not found");
      setLoading(false);
      return;
    }

    async function loadArticle() {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticle(slug!);
        if (data) {
          setArticle(data);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 md:pt-32">
          <div className="container max-w-3xl mx-auto px-6">
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
              <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em] animate-pulse">
                Loading Article...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 md:pt-32">
          <div className="container max-w-3xl mx-auto px-6">
            <div className="text-center py-32">
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Article Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                {error || "The article you're looking for doesn't exist."}
              </p>
              <a
                href="/articles"
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Articles
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  const MarkdownRenderer = ReactMarkdown as any;

  // Custom components to skip the first h1 if it matches the title
  const markdownComponents = {
    h1: ({ children }: any) => {
      if (typeof children === 'string' && children.trim() === article.title) {
        return null; // Skip the first h1 that matches the article title
      }
      return <h1 className="font-display text-3xl font-bold tracking-tight mt-12 mb-6">{children}</h1>;
    },
    h2: ({ children }: any) => <h2 className="font-display text-2xl font-bold tracking-tight mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-display text-xl font-bold tracking-tight mt-8 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="font-display text-lg font-bold tracking-tight mt-6 mb-2">{children}</h4>,
    h5: ({ children }: any) => <h5 className="font-display text-base font-bold tracking-tight mt-4 mb-2">{children}</h5>,
    h6: ({ children }: any) => <h6 className="font-display text-sm font-bold tracking-tight mt-4 mb-2 uppercase">{children}</h6>,
    p: ({ children }: any) => <p className="text-foreground leading-relaxed mb-4">{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
    li: ({ children }: any) => <li className="text-foreground leading-relaxed">{children}</li>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
    strong: ({ children }: any) => <strong className="text-foreground font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    a: ({ href, children }: any) => (
      <a href={href} className="text-accent no-underline hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    img: ({ src, alt }: any) => (
      <img src={src} alt={alt} className="rounded-xl my-8 w-full h-auto" />
    ),
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 md:pt-32">
        <article className="pb-24">
          <div className="container max-w-3xl mx-auto px-6">
            <a
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Articles
            </a>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1.5 bg-secondary rounded-full text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                  {article.category}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm font-medium uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-8">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {article.formattedDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {article.readTime} min read
                </span>
              </div>
            </header>

            {article.thumbnail && (
              <div className="mb-12 rounded-2xl overflow-hidden">
                <img src={article.thumbnail} alt="" className="w-full h-auto" />
              </div>
            )}

            <div
              className="prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h1:text-3xl prose-h1:tracking-tight prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-2xl prose-h2:tracking-tight prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:tracking-tight prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-bold
              prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
              prose-pre:bg-secondary/30 prose-pre:border prose-pre:border-border/50
              prose-li:text-foreground prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-img:rounded-xl prose-img:my-8
            "
            >
              <MarkdownRenderer remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {article.content}
              </MarkdownRenderer>
            </div>

            <footer className="mt-16 pt-8 border-t border-border/50">
              <div className="flex justify-between items-center">
                <a
                  href="/articles"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  <ArrowLeft size={16} />
                  More Articles
                </a>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </>
  );
}
