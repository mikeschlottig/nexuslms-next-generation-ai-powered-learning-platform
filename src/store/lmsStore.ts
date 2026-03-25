import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
export type ModuleType = 'video' | 'audio' | 'markdown' | 'canvas';
export interface Module {
  id: string;
  title: string;
  type: ModuleType;
  content: string;
  duration?: string;
  isCompleted: boolean;
  canvasData?: {
    nodes: Node[];
    edges: Edge[];
  };
}
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  category: string;
  modules: Module[];
}
export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issueDate: number;
}
export interface UserProject {
  id: string;
  title: string;
  moduleId: string;
  nodes: Node[];
  edges: Edge[];
  timestamp: number;
}
interface LMSState {
  courses: Course[];
  certificates: Certificate[];
  userProjects: UserProject[];
  activeCourseId: string | null;
  activeModuleId: string | null;
  isAiSidebarOpen: boolean;
  setActiveCourse: (courseId: string) => void;
  setActiveModule: (moduleId: string) => void;
  toggleAiSidebar: (open?: boolean) => void;
  completeModule: (courseId: string, moduleId: string) => void;
  saveCanvasProject: (projectId: string, title: string, moduleId: string, nodes: Node[], edges: Edge[]) => void;
  addCourse: (course: Course) => void;
}
export const useLMSStore = create<LMSState>((set) => ({
  courses: [
    {
      id: 'course-1',
      title: 'Advanced React Architecture',
      description: 'Master the art of building scalable React applications with modern patterns.',
      instructor: 'Dr. Sarah Chen',
      category: 'Development',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
      progress: 45,
      modules: [
        { id: 'm1', title: 'Introduction to Atomic Design', type: 'video', content: 'vid-1', duration: '12:05', isCompleted: true },
        { id: 'm2', title: 'Zustand vs Redux: The Ultimate Guide', type: 'markdown', content: '# Comparison...', isCompleted: true },
        {
          id: 'm3',
          title: 'Interactive State Diagram',
          type: 'canvas',
          content: 'canvas-1',
          isCompleted: false,
          canvasData: {
            nodes: [
              { id: '1', position: { x: 0, y: 0 }, data: { label: 'User Action' }, type: 'input', style: { borderRadius: '12px', border: '2px solid #4F46E5', padding: '10px' } },
              { id: '2', position: { x: 0, y: 100 }, data: { label: 'Store Dispatch' }, style: { borderRadius: '12px', border: '2px solid #F97316', padding: '10px' } },
              { id: '3', position: { x: 0, y: 200 }, data: { label: 'View Update' }, type: 'output', style: { borderRadius: '12px', border: '2px solid #10B981', padding: '10px' } },
            ],
            edges: [{ id: 'e1-2', source: '1', target: '2', animated: true }]
          }
        },
        { id: 'm4', title: 'Performance Optimization Deep Dive', type: 'audio', content: 'aud-1', duration: '18:45', isCompleted: false },
      ]
    },
    {
      id: 'course-2',
      title: 'AI Engineering with Cloudflare',
      description: 'Leverage Workers, AI Gateway, and Vectorize to build next-gen AI apps.',
      instructor: 'Alex Rivera',
      category: 'AI/ML',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
      progress: 12,
      modules: [
        { id: 'c2-m1', title: 'Setting up the AI Gateway', type: 'video', content: 'vid-2', duration: '08:30', isCompleted: true },
        { id: 'c2-m2', title: 'MCP Protocol Basics', type: 'markdown', content: '# MCP...', isCompleted: false },
      ]
    },
    {
      id: 'course-3',
      title: 'Design Systems for Developers',
      description: 'Bridge the gap between design and code with robust token systems.',
      instructor: 'Emma Wilson',
      category: 'Design',
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop&q=60',
      progress: 0,
      modules: [
        { id: 'c3-m1', title: 'Tokens and Typography', type: 'video', content: 'vid-3', isCompleted: false },
      ]
    }
  ],
  certificates: [],
  userProjects: [],
  activeCourseId: null,
  activeModuleId: null,
  isAiSidebarOpen: false,
  setActiveCourse: (courseId) => set({ activeCourseId: courseId }),
  setActiveModule: (moduleId) => set({ activeModuleId: moduleId }),
  toggleAiSidebar: (open) => set((state) => ({ isAiSidebarOpen: open ?? !state.isAiSidebarOpen })),
  completeModule: (courseId, moduleId) => set((state) => {
    const newCourses = state.courses.map(course => {
      if (course.id !== courseId) return course;
      const newModules = course.modules.map(m => m.id === moduleId ? { ...m, isCompleted: true } : m);
      const allDone = newModules.every(m => m.isCompleted);
      const completedCount = newModules.filter(m => m.isCompleted).length;
      const progress = Math.round((completedCount / newModules.length) * 100);
      if (allDone && !state.certificates.some(c => c.courseId === courseId)) {
        const cert: Certificate = {
          id: `cert-${crypto.randomUUID()}`,
          courseId: course.id,
          courseTitle: course.title,
          issueDate: Date.now()
        };
        setTimeout(() => set(s => ({ certificates: [...s.certificates, cert] })), 0);
      }
      return { ...course, modules: newModules, progress };
    });
    return { courses: newCourses };
  }),
  saveCanvasProject: (id, title, moduleId, nodes, edges) => set((state) => ({
    userProjects: [...state.userProjects, { id, title, moduleId, nodes, edges, timestamp: Date.now() }]
  })),
  addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
}));