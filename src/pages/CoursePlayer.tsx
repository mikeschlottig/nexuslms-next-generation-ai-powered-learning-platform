import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLMSStore } from '@/store/lmsStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, MessageSquare, Play, FileText, Music, Layout } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
export function CoursePlayer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courses = useLMSStore(s => s.courses);
  const setActiveCourse = useLMSStore(s => s.setActiveCourse);
  const activeModuleId = useLMSStore(s => s.activeModuleId);
  const setActiveModule = useLMSStore(s => s.setActiveModule);
  const toggleAiSidebar = useLMSStore(s => s.toggleAiSidebar);
  const course = courses.find(c => c.id === id);
  const activeModule = course?.modules.find(m => m.id === activeModuleId) || course?.modules[0];
  useEffect(() => {
    if (id) {
      setActiveCourse(id);
      if (course && !activeModuleId) {
        setActiveModule(course.modules[0].id);
      }
    }
  }, [id, course, setActiveCourse, activeModuleId, setActiveModule]);
  if (!course) return <div className="p-8">Course not found</div>;
  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'markdown': return <FileText className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'canvas': return <Layout className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };
  return (
    <AppLayout className="h-screen flex overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Course Syllabus Sidebar */}
        <aside className="w-80 border-r bg-muted/30 hidden lg:flex flex-col">
          <div className="p-6 border-b bg-background">
            <h2 className="font-bold text-lg line-clamp-2">{course.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">{course.progress}% Completed</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {course.modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group",
                    activeModuleId === m.id ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-accent"
                  )}
                >
                  <div className="mt-0.5">
                    {m.isCompleted ? <CheckCircle2 className={cn("w-4 h-4", activeModuleId === m.id ? "text-primary-foreground" : "text-green-500")} /> : getModuleIcon(m.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-2">{m.title}</p>
                    {m.duration && <p className={cn("text-[10px] mt-1 opacity-70")}>{m.duration}</p>}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>
        {/* Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-background relative">
          <header className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <h3 className="font-semibold hidden sm:block">{activeModule?.title}</h3>
            </div>
            <Button onClick={() => toggleAiSidebar()} size="sm" className="gap-2">
              <MessageSquare className="w-4 h-4" /> 
              <span className="hidden sm:inline">AI Tutor</span>
            </Button>
          </header>
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Module Content Placeholder */}
              <Card className="aspect-video w-full flex items-center justify-center bg-muted border-dashed border-2 rounded-3xl overflow-hidden relative">
                <div className="text-center space-y-4">
                   <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-sm">
                      {activeModule && getModuleIcon(activeModule.type)}
                   </div>
                   <div className="space-y-1">
                     <p className="font-semibold text-xl">{activeModule?.title}</p>
                     <p className="text-sm text-muted-foreground uppercase tracking-widest">{activeModule?.type} Module Placeholder</p>
                   </div>
                   <Button size="lg" className="rounded-full px-8">Start Module</Button>
                </div>
              </Card>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{activeModule?.title}</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    This module covers the core concepts of {activeModule?.title}. In the next phase, 
                    we'll implement the rich media players and the interactive canvas editor here.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer className="p-4 border-t bg-muted/20 flex items-center justify-between">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <div className="text-xs text-muted-foreground font-mono">
              NexusLMS Player Engine v0.1
            </div>
            <Button size="sm">
              Next Module <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </footer>
        </main>
      </div>
    </AppLayout>
  );
}