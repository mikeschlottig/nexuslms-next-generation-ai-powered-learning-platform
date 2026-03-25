import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLMSStore } from '@/store/lmsStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, MessageSquare, Play, FileText, Music, Layout, Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { MarkdownView } from '@/components/player/MarkdownView';
import { CanvasView } from '@/components/player/CanvasView';
import { cn } from '@/lib/utils';
export function CoursePlayer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courses = useLMSStore(s => s.courses);
  const activeCourseId = useLMSStore(s => s.activeCourseId);
  const activeModuleId = useLMSStore(s => s.activeModuleId);
  const setActiveCourse = useLMSStore(s => s.setActiveCourse);
  const setActiveModule = useLMSStore(s => s.setActiveModule);
  const toggleAiSidebar = useLMSStore(s => s.toggleAiSidebar);
  const course = useMemo(() => courses.find(c => c.id === id), [courses, id]);
  const activeModule = useMemo(() =>
    course?.modules.find(m => m.id === activeModuleId) || course?.modules[0]
  , [course, activeModuleId]);
  useEffect(() => {
    if (id && (!activeCourseId || activeCourseId !== id)) {
      setActiveCourse(id);
      if (course && !activeModuleId) {
        setActiveModule(course.modules[0].id);
      }
    }
  }, [id, course, activeCourseId, activeModuleId, setActiveCourse, setActiveModule]);
  if (!course) return <div className="p-8">Course not found</div>;
  const currentIdx = course.modules.findIndex(m => m.id === (activeModule?.id || ''));
  const prevModule = course.modules[currentIdx - 1];
  const nextModule = course.modules[currentIdx + 1];
  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'markdown': return <FileText className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'canvas': return <Layout className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };
  const renderModuleContent = () => {
    if (!activeModule) return null;
    switch (activeModule.type) {
      case 'video': return <VideoPlayer courseId={course.id} moduleId={activeModule.id} />;
      case 'audio': return <AudioPlayer courseId={course.id} moduleId={activeModule.id} title={activeModule.title} instructor={course.instructor} />;
      case 'markdown': return <MarkdownView content={activeModule.content} courseId={course.id} moduleId={activeModule.id} isCompleted={activeModule.isCompleted} />;
      case 'canvas': return (
        <CanvasView 
          courseId={course.id} 
          moduleId={activeModule.id} 
          initialNodes={activeModule.canvasData?.nodes || []}
          initialEdges={activeModule.canvasData?.edges || []}
          isCompleted={activeModule.isCompleted}
        />
      );
      default: return <div className="p-12 text-center">Unknown module type</div>;
    }
  };
  const SyllabusList = () => (
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
          <div className="mt-0.5 shrink-0">
            {m.isCompleted ? <CheckCircle2 className={cn("w-4 h-4", activeModuleId === m.id ? "text-primary-foreground" : "text-green-500")} /> : getModuleIcon(m.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium line-clamp-2">{m.title}</p>
            {m.duration && <p className={cn("text-[10px] mt-1 opacity-70")}>{m.duration}</p>}
          </div>
        </button>
      ))}
    </div>
  );
  return (
    <AppLayout className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r bg-muted/30 hidden lg:flex flex-col">
          <div className="p-6 border-b bg-background">
            <h2 className="font-bold text-lg line-clamp-2">{course.title}</h2>
            <div className="mt-4 space-y-2">
               <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                 <span>Course Progress</span>
                 <span>{course.progress}%</span>
               </div>
               <Progress value={course.progress} className="h-1.5" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <SyllabusList />
          </ScrollArea>
        </aside>
        <main className="flex-1 flex flex-col min-w-0 bg-background relative">
          <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80">
                  <div className="p-6 border-b">
                    <h2 className="font-bold text-lg">{course.title}</h2>
                  </div>
                  <ScrollArea className="h-[calc(100vh-100px)]">
                    <SyllabusList />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="hidden sm:flex">
                <ChevronLeft className="w-4 h-4 mr-1" /> Dashboard
              </Button>
              <div className="h-4 w-[1px] bg-border mx-2 hidden sm:block" />
              <h3 className="font-semibold text-sm truncate max-w-[200px] md:max-w-md">{activeModule?.title}</h3>
            </div>
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="sm" onClick={() => toggleAiSidebar()} className="gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                 <MessageSquare className="w-4 h-4" />
                 <span className="hidden sm:inline">Ask AI Tutor</span>
               </Button>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-4 sm:p-8 md:p-12 space-y-8">
               {renderModuleContent()}
            </div>
          </div>
          <footer className="p-4 border-t bg-muted/20 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={!prevModule}
              onClick={() => prevModule && setActiveModule(prevModule.id)}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <div className="hidden md:flex flex-col items-center gap-1">
               <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Module {currentIdx + 1} of {course.modules.length}</span>
               <div className="flex gap-1">
                 {course.modules.map((m, i) => (
                   <div key={m.id} className={cn("w-6 h-1 rounded-full", i === currentIdx ? "bg-primary" : "bg-muted")} />
                 ))}
               </div>
            </div>
            <Button
              size="sm"
              disabled={!nextModule}
              onClick={() => nextModule && setActiveModule(nextModule.id)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </footer>
        </main>
      </div>
    </AppLayout>
  );
}