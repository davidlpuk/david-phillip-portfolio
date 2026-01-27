import React from "react";
import { motion } from "framer-motion";
import { EXECUTIVE_BLUEPRINTS } from "./blueprints";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { CheckCircle, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/shared/components/ui/table";
import { Separator } from "@/shared/components/ui/separator";

interface A2UIRendererProps {
    blueprintId: string | null;
}

export function A2UIRenderer({ blueprintId }: A2UIRendererProps) {
    if (!blueprintId) return null;

    const blueprint = EXECUTIVE_BLUEPRINTS[blueprintId];
    if (!blueprint) return <div>Blueprint not found</div>;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const renderContent = () => {
        switch (blueprint.type) {
            case "metrics-card":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        {blueprint.data.metrics.map((m: any, idx: number) => (
                            <div key={idx} className="bg-secondary/20 p-4 rounded-lg border border-border/50">
                                <p className="text-sm text-muted-foreground">{m.label}</p>
                                <p className="text-2xl font-bold text-foreground my-1">{m.value}</p>
                                <p className="text-xs text-primary">{m.sub}</p>
                            </div>
                        ))}
                        <div className="col-span-full mt-4">
                            <p className="text-sm font-semibold mb-2 text-muted-foreground">Key Methodologies:</p>
                            <div className="flex flex-wrap gap-2">
                                {blueprint.data.methodologies.map((method: string, idx: number) => (
                                    <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "impact-table":
                return (
                    <div className="mt-6 border border-border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Metric</TableHead>
                                    <TableHead>Outcome</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blueprint.data.rows.map((row: any, idx: number) => {
                                    const Icon = row.icon;
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">{row.project}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-primary font-bold">
                                                    <Icon size={16} />
                                                    {row.metric}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{row.outcome}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                );

            case "star-method":
                return (
                    <div className="mt-6 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Situation</h4>
                                <p className="text-muted-foreground">{blueprint.data.situation}</p>
                            </div>
                        </div>

                        <div className="pl-5 border-l-2 border-border ml-5 py-2 space-y-4">
                            <div>
                                <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">Task</h4>
                                <p className="text-muted-foreground">{blueprint.data.task}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-2">Action</h4>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 items-start text-sm text-muted-foreground">
                                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">1</span>
                                        {blueprint.data.action.step1}
                                    </li>
                                    <li className="flex gap-2 items-start text-sm text-muted-foreground">
                                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">2</span>
                                        {blueprint.data.action.step2}
                                    </li>
                                    <li className="flex gap-2 items-start text-sm text-muted-foreground">
                                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">3</span>
                                        {blueprint.data.action.step3}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Result</h4>
                                <p className="text-muted-foreground">{blueprint.data.result}</p>
                            </div>
                        </div>
                    </div>
                );

            case "diagram":
                return (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blueprint.data.columns.map((col: any, idx: number) => (
                            <div key={idx} className="bg-secondary/10 p-4 rounded-lg border border-border">
                                <h4 className="font-semibold text-center mb-4 pb-2 border-b border-border">{col.title}</h4>
                                <ul className="space-y-3">
                                    {col.items.map((item: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );

            case "portfolio-grid":
                return (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {blueprint.data.projects.map((p: any, idx: number) => (
                            <div key={idx} className="group relative bg-muted/30 rounded-xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/ffffff?text=${p.name}`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                                </div>
                                <div className="p-4 relative">
                                    <h4 className="font-bold text-foreground mb-0.5">{p.name}</h4>
                                    <p className="text-xs text-muted-foreground mb-2">{p.role}</p>
                                    <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        {p.impact}
                                    </div>
                                    <a href={`/case-study/${p.id}`} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={14} className="text-foreground" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case "credentials-card":
                return (
                    <div className="mt-6 space-y-6">
                        <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4">
                            "{blueprint.data.summary}"
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {blueprint.data.stats.map((s: any, idx: number) => (
                                <div key={idx} className="bg-secondary/20 p-3 rounded-lg border border-border/50 text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
                                    <p className="text-lg font-bold text-foreground">{s.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="pt-2">
                            <a
                                href={blueprint.data.link}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                View Interactive CV <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                );

            case "calendly":
                return (
                    <div className="mt-6 w-full h-[650px] bg-background rounded-lg overflow-hidden border border-border">
                        <iframe
                            src={`${blueprint.data.url}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=3b82f6`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Select a Date & Time"
                        ></iframe>
                    </div>
                );

            default:
                return <div>Unknown blueprint type</div>;
        }
    };

    return (
        <motion.div
            key={blueprintId}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">{blueprint.title}</CardTitle>
                            <CardDescription>Strategic Insight generated for recruiter query.</CardDescription>
                        </div>
                        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded border border-primary/20">
                            A2UI_RENDERED
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator className="mb-6" />
                    {renderContent()}
                </CardContent>
            </Card>
        </motion.div>
    );
}
