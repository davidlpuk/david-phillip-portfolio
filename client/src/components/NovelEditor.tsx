import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// @ts-ignore
import TurndownService from "turndown";
// @ts-ignore
import { marked } from "marked";

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
});

interface NovelEditorProps {
    defaultValue?: string;
    onChange?: (content: string) => void;
    className?: string;
}

export default function NovelEditor({ defaultValue = "", onChange, className }: NovelEditorProps) {
    const [content, setContent] = useState(defaultValue);
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    console.log('NovelEditor render:', { defaultValue, content, className });

    // Initialize Quill editor
    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            const toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }]
            ];

            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
                placeholder: 'Start writing your article...',
                formats: ['bold', 'italic', 'underline', 'strike', 'header', 'list']
            });

            // Set initial content
            const preparedContent = prepareForNovel(defaultValue || '');
            if (preparedContent) {
                quillRef.current.root.innerHTML = preparedContent;
            }

            // Handle content changes
            quillRef.current.on('text-change', () => {
                if (quillRef.current) {
                    const html = quillRef.current.root.innerHTML;
                    console.log('Quill content changed:', html);
                    setContent(html);
                    onChange?.(html);
                }
            });
        }

        return () => {
            if (quillRef.current) {
                // Cleanup if needed
            }
        };
    }, []);

    // Update content when defaultValue changes
    useEffect(() => {
        if (quillRef.current && defaultValue !== content) {
            const preparedContent = prepareForNovel(defaultValue || '');
            quillRef.current.root.innerHTML = preparedContent;
            setContent(preparedContent);
        }
    }, [defaultValue]);

    return (
        <div className={className}>
            <div ref={editorRef} className="min-h-[400px]" />
        </div>
    );
}

// Utility function to convert editor content to Markdown
export function novelToMarkdown(content: string): string {
    // ReactQuill outputs HTML, convert to Markdown
    return turndownService.turndown(content);
}

// Utility function to prepare content for editor
export function prepareForNovel(content: string): string {
    // If content is already HTML-like, return as-is
    if (content.includes('<') || content.includes('>')) {
        return content;
    }
    // Otherwise, treat as markdown and convert to HTML
    try {
        return marked(content) as string;
    } catch (error) {
        console.error('Error converting markdown to HTML:', error);
        // Fallback: treat as plain text
        return content.replace(/&/g, '&')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/\n/g, '<br>');
    }
}