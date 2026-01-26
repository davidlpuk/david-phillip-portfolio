import { ArrowRight, Clock, Calendar, ExternalLink } from "lucide-react";
import Header from "@/shared/components/Header";
import { linkedInArticles } from "@/shared/constants/linkedin-articles";
import { motion } from "framer-motion";

export default function LinkedInArticlesView() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen pt-24 md:pt-32 bg-[#FDFCF8] dark:bg-[#0A0A0A]">
                <div className="container max-w-6xl mx-auto px-6">
                    <header className="mb-20 md:mb-28 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center md:justify-start gap-2 mb-6"
                        >
                            <div className="h-px w-8 bg-accent-foreground/30"></div>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Thought Leadership</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl md:text-7xl font-extrabold tracking-tighter text-foreground mb-8"
                        >
                            Insights & <span className="highlighter-stroke">Perspectives.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0"
                        >
                            Exploring the intersection of AI, design leadership, and the future of product development. Originally published on LinkedIn.
                        </motion.p>
                    </header>

                    <motion.section
                        variants={container}
                        initial="hidden"
                        animate="show"
                        aria-label="Articles list"
                        className="pb-24"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {linkedInArticles.map((article) => (
                                <motion.article
                                    key={article.id}
                                    variants={item}
                                    className="group"
                                >
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block h-full"
                                    >
                                        <div className="relative h-full flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-500">
                                            {/* Image Container */}
                                            <div className="relative aspect-[16/9] overflow-hidden">
                                                <img
                                                    src={article.thumbnail}
                                                    alt=""
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                    <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                                        Read on LinkedIn <ExternalLink size={12} />
                                                    </span>
                                                </div>
                                                <div className="absolute top-4 left-4">
                                                    <span className="inline-block px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-full text-[10px] font-bold uppercase tracking-wider text-foreground">
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-8 flex-1 flex flex-col">
                                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={12} className="text-accent" />
                                                        {new Date(article.date).toLocaleDateString("en-US", { month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={12} className="text-accent" />
                                                        {article.readTime} min
                                                    </span>
                                                </div>

                                                <h2 className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight mb-4">
                                                    {article.title}
                                                </h2>

                                                <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                                                    {article.excerpt}
                                                </p>

                                                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent group-hover:gap-4 transition-all duration-300">
                                                    <span>View Article</span>
                                                    <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </motion.article>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    );
}
