import React from 'react';
import { A2UIComponent } from './a2ui-types';
import { ExternalLink } from 'lucide-react';
import { MarkdownContent } from './MarkdownContent';

interface RendererProps {
    component: A2UIComponent;
    onAction: (action: string, payload: any) => void;
}

export const A2UIRenderer: React.FC<RendererProps> = ({ component, onAction }) => {
    switch (component.type) {
        case 'text':
            return (
                <div className="text-sm leading-relaxed" {...component.props}>
                    <MarkdownContent content={component.props?.content || ''} />
                </div>
            );

        case 'button':
            return (
                <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
                    onClick={() => onAction(component.props?.action, component.props?.payload)}
                    {...component.props}
                >
                    {component.props?.label}
                </button>
            );

        case 'link':
            return (
                <a
                    href={component.props?.url}
                    target={component.props?.external ? "_blank" : undefined}
                    rel={component.props?.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-1 rounded-sm"
                    {...component.props}
                >
                    {component.props?.label}
                    {component.props?.external && <ExternalLink size={12} />}
                </a>
            );

        case 'box':
            return (
                <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm" {...component.props}>
                    {component.children?.map((child, index) => (
                        <A2UIRenderer key={index} component={child} onAction={onAction} />
                    ))}
                </div>
            );

        case 'stack':
            const isRow = component.props?.direction === 'row';
            return (
                <div {...component.props} className={`flex ${isRow ? 'flex-row' : 'flex-col'} ${component.props?.className || 'gap-2'}`}>
                    {component.children?.map((child, index) => (
                        <A2UIRenderer key={index} component={child} onAction={onAction} />
                    ))}
                </div>
            );

        case 'image':
            return (
                <img
                    src={component.props?.src}
                    alt={component.props?.alt || ''}
                    className="rounded-lg max-w-full h-auto"
                    {...component.props}
                />
            );

        case 'card':
            return (
                <div {...component.props} className={`bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full min-h-[200px] ${component.props?.className || ''}`}>
                    {component.props?.image && (
                        <div className="h-32 w-full overflow-hidden bg-muted shrink-0">
                            <img src={component.props.image} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-4 flex flex-col gap-2 flex-grow">
                        {component.props?.title && <h4 className="font-semibold text-sm">{component.props.title}</h4>}
                        {component.props?.description && <p className="text-xs text-muted-foreground line-clamp-3">{component.props.description}</p>}

                        {component.children && component.children.length > 0 && (
                            <div className="mt-auto pt-3">
                                {component.children.map((child, index) => (
                                    <A2UIRenderer key={index} component={child} onAction={onAction} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );

        case 'carousel':
            return (
                <div className="w-full overflow-hidden" {...component.props}>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent snap-x">
                        {component.children?.map((child, index) => (
                            <div key={index} className="min-w-[260px] w-[260px] snap-center h-auto flex">
                                <A2UIRenderer component={child} onAction={onAction} />
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'input':
            return (
                <div className="flex flex-col gap-1.5 w-full">
                    {component.props?.label && <label className="text-xs font-medium text-muted-foreground">{component.props.label}</label>}
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        name={component.props?.name}
                        type={component.props?.inputType || 'text'}
                        placeholder={component.props?.placeholder}
                        {...component.props}
                    />
                </div>
            );

        case 'form':
            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                onAction(component.props?.action || 'submitForm', data);
            };

            return (
                <form
                    className="flex flex-col gap-4 p-4 border rounded-lg bg-card/50"
                    onSubmit={handleSubmit}
                    {...component.props}
                >
                    {component.props?.title && <h4 className="font-semibold text-sm">{component.props.title}</h4>}
                    {component.children?.map((child, index) => (
                        <A2UIRenderer key={index} component={child} onAction={onAction} />
                    ))}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
                    >
                        {component.props?.submitLabel || 'Submit'}
                    </button>
                </form>
            );

        default:
            return <div className="text-red-500 text-xs">Unknown component: {component.type}</div>;
    }
};

