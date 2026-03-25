import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLMSStore } from '@/store/lmsStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Layout, Share2, Download, ExternalLink, Calendar, Star } from "lucide-react";
import { format } from "date-fns";
export function Portfolio() {
  const certificates = useLMSStore(s => s.certificates);
  const userProjects = useLMSStore(s => s.userProjects);
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold tracking-tight">Student Portfolio</h1>
          <p className="text-muted-foreground text-lg">Showcase your achievements and interactive experiments.</p>
        </div>
        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="bg-muted/50 p-1 rounded-2xl mb-8">
            <TabsTrigger value="certificates" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Certificates ({certificates.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Project Gallery ({userProjects.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="certificates" className="space-y-6">
            {certificates.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed rounded-4xl space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                  <Trophy className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">No certificates yet</h3>
                  <p className="text-muted-foreground">Complete a course to earn your first credential.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 rounded-3xl border-none shadow-soft bg-gradient-to-br from-indigo-600/5 to-purple-600/5">
                    <div className="absolute top-0 right-0 p-4">
                      <Trophy className="w-12 h-12 text-indigo-500/20 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardHeader>
                      <Badge className="w-fit mb-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-100">Verified</Badge>
                      <CardTitle className="text-xl leading-tight">{cert.courseTitle}</CardTitle>
                      <CardDescription className="flex items-center gap-2 pt-2">
                        <Calendar className="w-3 h-3" /> Issued {format(cert.issueDate, 'PPP')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/50 border border-white flex items-center justify-between">
                         <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">ID: {cert.id.slice(0, 8)}...</div>
                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="rounded-xl h-10 gap-2 border-indigo-200">
                        <Download className="w-4 h-4" /> PDF
                      </Button>
                      <Button variant="outline" className="rounded-xl h-10 gap-2 border-indigo-200">
                        <Share2 className="w-4 h-4" /> Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="projects">
            {userProjects.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed rounded-4xl space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                  <Layout className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">No projects saved</h3>
                  <p className="text-muted-foreground">Save an Interactive Canvas module to see it here.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProjects.map((project) => (
                  <Card key={project.id} className="group hover:shadow-lg transition-all rounded-3xl overflow-hidden shadow-soft border-none">
                    <div className="aspect-video bg-slate-50 relative flex items-center justify-center border-b overflow-hidden">
                       <div className="p-4 opacity-20 group-hover:scale-110 transition-transform duration-700">
                         <Layout className="w-20 h-20 text-indigo-600" />
                       </div>
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                         <Button variant="secondary" className="scale-0 group-hover:scale-100 transition-transform rounded-full">
                           Open Editor
                         </Button>
                       </div>
                    </div>
                    <CardHeader className="p-5">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>Saved on {format(project.timestamp, 'PPp')}</CardDescription>
                    </CardHeader>
                    <CardFooter className="px-5 pb-5 pt-0">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> {project.nodes.length} Nodes</span>
                        <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> Shared</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}