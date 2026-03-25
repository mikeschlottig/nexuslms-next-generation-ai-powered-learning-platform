import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLMSStore } from '@/store/lmsStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Search, Filter, BookOpen, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Catalog() {
  const courses = useLMSStore(s => s.courses);
  const [search, setSearch] = useState('');
  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <AppLayout container>
      <div className="space-y-12 animate-fade-in">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Expand Your Horizons</h1>
          <p className="text-muted-foreground text-lg text-pretty">
            Explore our curated library of high-impact courses designed for the modern tech landscape.
          </p>
        </div>
        <div className="flex flex-col md:row gap-4 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by skill, topic, or instructor..." 
              className="pl-10 h-12 rounded-2xl bg-secondary border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button size="lg" className="rounded-2xl h-12 gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((course) => (
            <Card key={course.id} className="group border-none shadow-soft rounded-4xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                </AspectRatio>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                    {course.category}
                  </span>
                </div>
              </div>
              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-2">
                   <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">{course.title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2 text-sm">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6h 30m</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules.length} Lessons</span>
                  <span className="flex items-center gap-1 text-orange-500 font-bold"><Star className="w-3.5 h-3.5 fill-current" /> 4.9</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 border-t flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + course.id}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    +1k
                  </div>
                </div>
                <Button asChild variant="ghost" className="gap-2 group/btn font-bold">
                  <Link to={`/course/${course.id}`}>
                    Preview <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}