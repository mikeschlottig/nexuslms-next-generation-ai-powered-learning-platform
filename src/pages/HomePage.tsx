import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLMSStore } from '@/store/lmsStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen, Star, TrendingUp } from 'lucide-react';
export function HomePage() {
  const courses = useLMSStore(s => s.courses);
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in">
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-4xl p-8 md:p-12 text-white shadow-glow-lg">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold">Welcome back, Explorer!</h1>
            <p className="text-lg text-white/80 text-pretty">
              Your learning journey is 45% complete. You're doing great! Ready to dive back into "Advanced React Architecture"?
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 font-semibold rounded-full">
                Resume Learning
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 hover:bg-white/20 text-white rounded-full">
                View Schedule
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <TrendingUp className="w-full h-full rotate-12" />
          </div>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Enrolled Courses</h2>
              <Button variant="link">See all</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden border-none shadow-soft">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                       <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                         <Clock className="w-3 h-3" /> 4h 20m
                       </span>
                    </div>
                  </div>
                  <CardHeader className="p-4 space-y-1">
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                    <CardDescription className="text-xs">{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full rounded-xl">
                      <Link to={`/course/${course.id}`}>
                        <PlayCircle className="mr-2 w-4 h-4" /> Continue
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Learning Stats</h2>
            <Card className="rounded-2xl shadow-soft border-none">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Courses Completed</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Skill Points</p>
                    <p className="text-2xl font-bold">2,450</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Today's Goal</h3>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Watching: 45m / 60m</span>
                  </div>
                  <Progress value={75} className="h-1 bg-muted" />
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}