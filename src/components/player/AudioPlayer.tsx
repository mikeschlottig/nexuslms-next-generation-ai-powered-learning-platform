import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, FastForward } from 'lucide-react';
import { useLMSStore } from '@/store/lmsStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
interface AudioPlayerProps {
  courseId: string;
  moduleId: string;
  title: string;
  instructor: string;
}
export function AudioPlayer({ courseId, moduleId, title, instructor }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const completeModule = useLMSStore(s => s.completeModule);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(current);
      if (current > 95) completeModule(courseId, moduleId);
    }
  };
  const handleSpeed = () => {
    const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    setSpeed(nextSpeed);
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
  };
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-card border shadow-soft rounded-4xl p-8 md:p-12 space-y-8 relative overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="flex flex-col items-center text-center space-y-6">
          <div className={cn(
            "w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow transition-all duration-1000",
            isPlaying ? "scale-105 rotate-12" : "scale-100 rotate-0"
          )}>
            <div className="w-40 h-40 rounded-full border-4 border-white/20 flex items-center justify-center overflow-hidden">
                <div className="flex items-end gap-1 h-12">
                   {[1,2,3,4,5,4,3,2,1].map((h, i) => (
                     <div 
                        key={i} 
                        className={cn(
                          "w-1.5 bg-white rounded-full transition-all duration-300",
                          isPlaying ? "animate-audio-wave" : "h-2"
                        )}
                        style={{ animationDelay: `${i * 0.1}s` }}
                     />
                   ))}
                </div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">with {instructor}</p>
          </div>
        </div>
        <div className="space-y-6">
          <Slider value={[progress]} max={100} onValueChange={(v) => {
            if (audioRef.current) audioRef.current.currentTime = (v[0] / 100) * audioRef.current.duration;
          }} />
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handleSpeed} className="w-16 rounded-full font-mono">
              {speed}x
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => {if(audioRef.current) audioRef.current.currentTime -= 10}}>
                <SkipBack className="w-6 h-6" />
              </Button>
              <Button size="icon" onClick={togglePlay} className="w-16 h-16 rounded-full bg-primary shadow-lg hover:scale-105 transition-transform">
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => {if(audioRef.current) audioRef.current.currentTime += 10}}>
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <audio 
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
      </div>
    </div>
  );
}