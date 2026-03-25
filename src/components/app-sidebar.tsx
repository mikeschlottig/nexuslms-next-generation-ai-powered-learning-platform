import React from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Terminal, 
  Settings, 
  LogOut,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useLMSStore } from "@/store/lmsStore";
import { cn } from "@/lib/utils";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const courses = useLMSStore(s => s.courses);
  const activeCourses = courses.filter(c => c.progress > 0 && c.progress < 100).slice(0, 3);
  const mainNav = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Course Catalog", icon: BookOpen, path: "/catalog" },
    { title: "My Portfolio", icon: Trophy, path: "/portfolio" },
    { title: "Content Builder", icon: Terminal, path: "/builder" },
  ];
  return (
    <Sidebar className="border-r border-indigo-500/10">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-glow">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground">NexusLMS</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Pro Edition</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Navigation</SidebarGroupLabel>
          <SidebarMenu className="px-2">
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                  className={cn(
                    "rounded-xl transition-all duration-200",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary hover:bg-primary/15" 
                      : "hover:bg-accent"
                  )}
                >
                  <Link to={item.path}>
                    <item.icon className="h-4 w-4" /> 
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {activeCourses.length > 0 && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Continue Learning</SidebarGroupLabel>
            <SidebarMenu className="px-2">
              {activeCourses.map((course) => (
                <SidebarMenuItem key={course.id}>
                  <SidebarMenuButton asChild className="rounded-xl group">
                    <Link to={`/course/${course.id}`} className="flex flex-col items-start h-auto py-2 gap-1">
                      <span className="text-xs font-semibold line-clamp-1">{course.title}</span>
                      <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full transition-all" 
                          style={{ width: `${course.progress}%` }} 
                        />
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3 shadow-lg">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Student Support</p>
          <p className="text-xs text-white/80">Need help with a module? Ask the Nexus AI Tutor!</p>
          <button className="text-[10px] font-bold flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">
            Help Center <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between px-2">
          <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent">
            <Settings className="w-4 h-4" />
          </button>
          <button className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/10">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}