import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLMSStore } from '@/store/lmsStore';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowUp } from 'lucide-react';
interface MarkdownViewProps {
  content: string;
  moduleId: string;
  courseId: string;
  isCompleted: boolean;
}
export function MarkdownView({ content, moduleId, courseId, isCompleted }: MarkdownViewProps) {
  const completeModule = useLMSStore(s => s.completeModule);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [moduleId]);
  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-12 pb-20 animate-fade-in">
      <article className="prose prose-slate dark:prose-invert max-w-none 
        prose-headings:font-display prose-headings:font-bold 
        prose-a:text-indigo-600 dark:prose-a:text-indigo-400 
        prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:shadow-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>
      <div className="flex flex-col items-center justify-center py-12 border-t border-dashed gap-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold">Finished reading?</h3>
          <p className="text-muted-foreground text-sm">Mark this module as complete to move forward.</p>
        </div>
        <Button 
          size="lg" 
          onClick={() => completeModule(courseId, moduleId)}
          disabled={isCompleted}
          className={`rounded-full px-8 h-14 text-lg transition-all duration-500 ${
            isCompleted 
            ? "bg-green-500 hover:bg-green-600 text-white" 
            : "bg-indigo-600 hover:bg-indigo-700 shadow-primary hover:shadow-glow"
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="mr-2 h-6 w-6" /> Completed
            </>
          ) : (
            "Mark as Finished"
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-muted-foreground hover:text-primary"
        >
          <ArrowUp className="mr-2 h-4 w-4" /> Back to Top
        </Button>
      </div>
    </div>
  );
}