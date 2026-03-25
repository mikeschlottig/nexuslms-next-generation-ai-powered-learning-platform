import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { useLMSStore } from "@/store/lmsStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({ children, container = false, className, contentClassName }: AppLayoutProps): JSX.Element {
  const isAiSidebarOpen = useLMSStore(s => s.isAiSidebarOpen);
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <SidebarInset className={cn("relative flex flex-col min-w-0 flex-1 transition-all duration-300", className)}>
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md px-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="text-xs text-muted-foreground hidden sm:block">
              NexusLMS v1.0 • AI Agent Ready
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            {container ? (
              <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12", contentClassName)}>
                {children}
              </div>
            ) : (
              children
            )}
          </main>
        </SidebarInset>
        <AnimatePresence>
          {isAiSidebarOpen && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l shadow-2xl"
            >
              <AIAssistant />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </SidebarProvider>
  );
}