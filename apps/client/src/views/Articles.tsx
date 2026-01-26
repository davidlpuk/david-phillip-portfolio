import { useEffect, useState, useMemo } from "react";
import { ArrowRight, Clock, Calendar, Loader2 } from "lucide-react";
import Header from "@/shared/components/Header";
import { getAllArticles } from "@/shared/lib/articles";
import type { ArticleMetadata } from "@/shared/types/article";
import { useLocation } from "wouter";

export default function Articles() {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      try {
        const data = await getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, [location]);

  const categories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category));
    return Array.from(cats);
  }, [articles]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 md:pt-32">
        <div className="container max-w-6xl mx-auto px-6">
          <header className="mb-20 md:mb-28">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
              Articles
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Thoughts on design, technology, and user experience. Sharing
              insights from years of building digital products.
            </p>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
              <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em] animate-pulse">
                Loading Articles...
              </p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-muted-foreground font-sans text-lg">
                No articles found. Add markdown files to{" "}
                <code>client/src/articles/</code>.
              </p>
            </div>
          ) : (
            <section aria-label="Articles list" className="pb-24">
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-12">
                  <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors"
                    disabled
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors"
                      disabled
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {articles.map((article) => (
                  <article key={article.id} className="group cursor-pointer">
                    <a href={`/articles/${article.slug}`} className="block">
                      <div className="rounded-2xl overflow-hidden bg-card border border-border/50 mb-5 group-hover:border-accent/50 transition-all duration-300">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={article.thumbnail}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-foreground">
                              {article.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {article.formattedDate}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {article.readTime} min read
                          </span>
                        </div>
                        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                          {article.title}
                        </h2>
                        <p className="font-sans text-muted-foreground leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
                          <span>Read Article</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
