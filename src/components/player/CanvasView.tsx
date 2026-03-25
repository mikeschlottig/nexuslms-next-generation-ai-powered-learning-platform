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
import { CheckCircle2, RefreshCcw, Info } from 'lucide-react';
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
    // In a real app, we'd validate the diagram logic here
    completeModule(courseId, moduleId);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-4 bg-muted/50 border-none flex items-center gap-3">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-sm">
          <p className="font-semibold">Interactive Challenge</p>
          <p className="text-muted-foreground">Arrange and connect the nodes below to visualize the system flow. Submit when you're finished.</p>
        </div>
      </Card>
      <div className="h-[600px] w-full rounded-3xl overflow-hidden border bg-card shadow-inner relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-slate-50/50"
        >
          <Background color="#cbd5e1" gap={20} />
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
        </ReactFlow>
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <Button variant="secondary" size="sm" onClick={handleReset} className="bg-white/80 backdrop-blur-md">
            <RefreshCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
          <Button 
            size="sm" 
            onClick={handleSubmit} 
            disabled={isCompleted}
            className={isCompleted ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}
          >
            {isCompleted ? (
              <><CheckCircle2 className="w-4 h-4 mr-2" /> Completed</>
            ) : (
              "Check Solution"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}