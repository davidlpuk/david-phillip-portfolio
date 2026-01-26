import { Zap, Brain, FileText, CheckCircle, ArrowRight } from "lucide-react";

/**
 * How I Use AI Section
 * Design: Clean, modern section explaining AI workflow integration
 */

const aiUseCases = [
    {
        icon: Brain,
        title: "Research synthesis",
        description: "Interview transcripts to actionable insights in hours, not weeks",
    },
    {
        icon: Zap,
        title: "Prototyping acceleration",
        description: "Functional prototypes from concept in days, not sprints",
    },
    {
        icon: FileText,
        title: "Documentation automation",
        description: "Specs, handoffs, and component docs generated as I design",
    },
    {
        icon: CheckCircle,
        title: "Design QA",
        description: "Automated accessibility and usability checks before handoff",
    },
];

export default function HowIUseAI() {
    return (
        <section className="py-20 md:py-32 bg-background border-t border-border">
            <div className="container max-w-5xl">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="font-sans text-sm font-medium text-accent-foreground tracking-wider uppercase mb-4 block">
                        AI as Workflow, Not Gimmick
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                        How I Use AI
                    </h2>
                    <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        I don't just use AI tools. I design systems that compress discovery-to-delivery cycles while maintaining quality and governance.
                    </p>
                </div>

                {/* AI Use Cases Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
                    {aiUseCases.map((useCase, idx) => {
                        const Icon = useCase.icon;
                        return (
                            <div
                                key={idx}
                                className="group p-6 md:p-8 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/50 flex items-center justify-center group-hover:bg-primary/60 transition-colors duration-300 flex-shrink-0">
                                        <Icon size={24} className="text-primary-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-accent-foreground transition-colors">
                                            {useCase.title}
                                        </h3>
                                        <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                                            {useCase.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Closer Statement */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-2xl border border-accent/20">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                            <Zap size={16} className="text-accent-foreground" />
                        </div>
                        <p className="font-serif text-lg md:text-xl font-bold text-foreground">
                            AI makes small teams dangerous. I've built lean functions that outpace teams twice their size.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}