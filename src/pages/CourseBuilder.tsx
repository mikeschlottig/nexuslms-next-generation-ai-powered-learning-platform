import React, { useState, useRef, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLMSStore } from '@/store/lmsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Terminal as TerminalIcon, Play, Save, Trash2, Rocket, Info } from 'lucide-react';
import { toast } from 'sonner';
export function CourseBuilder() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>(['NexusLMS CLI Content Builder v1.0', 'Type "help" for a list of commands.']);
  const [draftCourse, setDraftCourse] = useState({
    id: `course-${Date.now()}`,
    title: 'Untitled Course',
    instructor: 'Admin',
    category: 'Draft',
    modules: [] as any[]
  });
  const addCourse = useLMSStore(s => s.addCourse);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    const input = command.trim();
    setHistory(prev => [...prev, `> ${input}`]);
    setCommand('');
    const parts = input.split(' ');
    const cmd = parts[0].toLowerCase();
    switch (cmd) {
      case 'help':
        setHistory(prev => [...prev, 'Available commands:', '  set-title [title] - Change course name', '  add-module [type] [title] - Types: video, audio, markdown, canvas', '  clear - Clear terminal', '  publish - Publish to catalog']);
        break;
      case 'set-title':
        const newTitle = parts.slice(1).join(' ') || 'Untitled Course';
        setDraftCourse(prev => ({ ...prev, title: newTitle }));
        setHistory(prev => [...prev, `Title updated to: ${newTitle}`]);
        break;
      case 'add-module':
        const type = parts[1] || 'markdown';
        const mTitle = parts.slice(2).join(' ') || 'New Lesson';
        setDraftCourse(prev => ({ 
          ...prev, 
          modules: [...prev.modules, { id: `m-${Date.now()}`, title: mTitle, type, content: 'Placeholder', isCompleted: false }] 
        }));
        setHistory(prev => [...prev, `Added ${type} module: ${mTitle}`]);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'publish':
        addCourse({
          ...draftCourse,
          description: 'Custom created via CLI Builder',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
          progress: 0
        });
        toast.success("Course published successfully!");
        setHistory(prev => [...prev, 'COURSE PUBLISHED TO CATALOG']);
        break;
      default:
        setHistory(prev => [...prev, `Command not recognized: ${cmd}`]);
    }
  };
  return (
    <AppLayout container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-[calc(100vh-200px)]">
        <div className="flex flex-col h-full bg-slate-950 rounded-4xl overflow-hidden shadow-2xl border border-white/10">
          <div className="p-4 border-b border-white/5 bg-slate-900 flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest">Interactive CLI</span>
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-1 text-emerald-400">
            {history.map((line, i) => (
              <div key={i} className={line.startsWith('>') ? "text-white" : ""}>{line}</div>
            ))}
            <div ref={terminalEndRef} />
          </div>
          <form onSubmit={handleCommand} className="p-4 bg-slate-900 border-t border-white/5 flex gap-3">
            <span className="text-emerald-400 font-mono self-center font-bold">{'>'}</span>
            <input 
              className="flex-1 bg-transparent border-none outline-none font-mono text-white text-sm"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              autoFocus
              placeholder="Enter command..."
            />
          </form>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-muted/30 p-8 rounded-4xl border-2 border-dashed border-muted flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Draft Preview</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setDraftCourse({...draftCourse, modules: []})}>
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 gap-2" onClick={() => toast.info("Draft saved locally")}>
                  <Save className="w-4 h-4" /> Save
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Course Title</label>
                <p className="text-xl font-bold">{draftCourse.title}</p>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Modules ({draftCourse.modules.length})</label>
                <div className="space-y-2 mt-2">
                  {draftCourse.modules.map((m, i) => (
                    <div key={m.id} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 w-6 h-6 flex items-center justify-center rounded-lg">{i + 1}</span>
                        <span className="font-medium">{m.title}</span>
                      </div>
                      <span className="text-[10px] px-2 py-1 bg-slate-100 rounded-full font-bold uppercase tracking-tighter">{m.type}</span>
                    </div>
                  ))}
                  {draftCourse.modules.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground italic text-sm">
                      No modules added yet. Use "add-module" command.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-auto pt-10">
              <Button className="w-full h-14 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-lg font-bold gap-3 shadow-lg" onClick={() => addCourse({...draftCourse, progress: 0, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', description: 'CLI created course'})}>
                <Rocket className="w-6 h-6" /> Publish to Marketplace
              </Button>
            </div>
          </div>
          <div className="bg-indigo-50 p-6 rounded-4xl border border-indigo-100 flex gap-4">
            <Info className="w-6 h-6 text-indigo-600 shrink-0" />
            <p className="text-sm text-indigo-900 leading-relaxed">
              <strong>Power Tip:</strong> The CLI Builder allows for mass-creation of modules. Great for bulk-importing syllabus structures before adding content in the visual editor.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}