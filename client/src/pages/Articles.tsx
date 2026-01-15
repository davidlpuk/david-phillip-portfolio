import { ArrowRight, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  thumbnail: string;
}

const articles: Article[] = [
  {
    id: "1",
    slug: "designing-for-accessibility",
    title: "Designing for Accessibility: A Comprehensive Guide",
    excerpt:
      "Exploring the fundamental principles of inclusive design and how they can enhance the experience for all users, regardless of ability.",
    category: "Design",
    readTime: "8 min read",
    date: "January 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    slug: "ux-principles-fintech",
    title: "UX Principles for Fintech Products",
    excerpt:
      "Key considerations when designing financial products that build trust, reduce friction, and drive user engagement.",
    category: "UX Design",
    readTime: "12 min read",
    date: "December 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    slug: "design-systems-scale",
    title: "Building Design Systems at Scale",
    excerpt:
      "Lessons learned from establishing and maintaining design systems across multiple teams and products in large organizations.",
    category: "Design Systems",
    readTime: "10 min read",
    date: "November 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    slug: "ai-ux-designers",
    title: "The Role of AI in Modern UX Design",
    excerpt:
      "How artificial intelligence is transforming the design process and what this means for the future of user experience design.",
    category: "AI & Design",
    readTime: "6 min read",
    date: "October 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  },
];

export default function Articles() {
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

          <section aria-label="Articles list" className="pb-24">
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
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {article.readTime}
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
        </div>
      </div>
    </>
  );
}
