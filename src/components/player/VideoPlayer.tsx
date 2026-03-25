import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useLMSStore } from '@/store/lmsStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
interface VideoPlayerProps {
  courseId: string;
  moduleId: string;
}
export function VideoPlayer({ courseId, moduleId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const completeModule = useLMSStore(s => s.completeModule);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
      if (current > 95) {
        completeModule(courseId, moduleId);
      }
    }
  };
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const time = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };
  return (
    <div className="relative group rounded-3xl overflow-hidden bg-black shadow-2xl aspect-video border border-white/10">
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80"
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>
      {/* Glass Overlay Controls */}
      <div className={cn(
        "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
        isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
      )}>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={togglePlay}
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 hover:scale-110 transition-all"
        >
          {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
        </Button>
      </div>
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300",
        isPlaying ? "translate-y-full group-hover:translate-y-0" : "translate-y-0"
      )}>
        <div className="space-y-4">
          <Slider 
            value={[progress]} 
            max={100} 
            step={0.1} 
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={togglePlay} className="hover:bg-white/20">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20" onClick={() => {if(videoRef.current) videoRef.current.currentTime -= 10}}>
                <RotateCcw className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-white/20" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-white/20">
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}