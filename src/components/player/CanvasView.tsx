import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  addEdge,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useLMSStore } from '@/store/lmsStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, RefreshCcw, Info, Save } from 'lucide-react';
import { toast } from 'sonner';
interface CanvasViewProps {
  courseId: string;
  moduleId: string;
  initialNodes: Node[];
  initialEdges: Edge[];
  isCompleted: boolean;
}
export function CanvasView({ courseId, moduleId, initialNodes, initialEdges, isCompleted }: CanvasViewProps) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const completeModule = useLMSStore(s => s.completeModule);
  const saveCanvasProject = useLMSStore(s => s.saveCanvasProject);
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, moduleId]);
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const handleReset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };
  const handleSubmit = () => {
    completeModule(courseId, moduleId);
    toast.success("Challenge completed! Progress updated.");
  };
  const handleSave = () => {
    const projectId = `project-${crypto.randomUUID()}`;
    const course = useLMSStore.getState().courses.find(c => c.id === courseId);
    const module = course?.modules.find(m => m.id === moduleId);
    saveCanvasProject(
      projectId, 
      `${module?.title || 'Canvas Project'} - Snapshot`, 
      moduleId, 
      nodes, 
      edges
    );
    toast.success("Snapshot saved to your Portfolio gallery.");
  };
  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <Card className="p-4 bg-indigo-500/5 border-indigo-500/10 flex items-center gap-4">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-sm">
          <p className="font-bold text-indigo-900">Interactive Visual Puzzle</p>
          <p className="text-indigo-700/70">Manipulate the diagram to represent the core architecture flow. You can save your work as a portfolio project at any time.</p>
        </div>
      </Card>
      <div className="flex-1 min-h-[600px] w-full rounded-4xl overflow-hidden border-2 border-slate-100 bg-slate-50 relative shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-slate-50/50"
        >
          <Background color="#94a3b8" gap={20} size={1} />
          <Controls className="bg-white shadow-xl border-none rounded-xl overflow-hidden" />
          <MiniMap 
            nodeStrokeWidth={3} 
            zoomable 
            pannable 
            className="rounded-2xl border-none shadow-lg bg-white/80 backdrop-blur-md" 
          />
        </ReactFlow>
        <div className="absolute bottom-6 right-6 flex gap-3 z-10">
          <Button variant="outline" size="lg" onClick={handleReset} className="bg-white shadow-lg rounded-2xl px-6 border-slate-200">
            <RefreshCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
          <Button variant="secondary" size="lg" onClick={handleSave} className="bg-indigo-100 text-indigo-700 shadow-lg rounded-2xl px-6 hover:bg-indigo-200">
            <Save className="w-4 h-4 mr-2" /> Save Snapshot
          </Button>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isCompleted}
            className={cn(
              "rounded-2xl px-8 shadow-glow font-bold",
              isCompleted ? "bg-emerald-500 hover:bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700"
            )}
          >
            {isCompleted ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Verified</>
            ) : (
              "Check Solution"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}