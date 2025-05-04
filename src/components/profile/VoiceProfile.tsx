
import React, { useState, useRef } from 'react';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import { 
  Mic,
  MicOff,
  Play,
  Pause,
  Delete,
  Save,
  Check
} from 'lucide-react';

const VoiceProfile = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [recordingTips] = useState([
    "Introduce yourself clearly and confidently",
    "Mention your key skills and experience",
    "Share what type of work you're looking for",
    "Keep it brief - 30-60 seconds is ideal",
    "Speak in a natural, conversational tone"
  ]);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxDuration = 60; // Maximum recording duration in seconds
  
  const startRecording = () => {
    // In a real app, this would initialize the MediaRecorder API
    setIsRecording(true);
    setRecordingDuration(0);
    setHasRecording(false);
    
    // Simulate recording duration counter
    timerRef.current = setInterval(() => {
      setRecordingDuration(prev => {
        if (prev >= maxDuration) {
          stopRecording();
          return maxDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };
  
  const stopRecording = () => {
    // In a real app, this would stop the MediaRecorder
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Check if recording has actual content
    if (recordingDuration > 0) {
      setHasRecording(true);
      
      toast({
        title: "Recording saved!",
        description: `${formatTime(recordingDuration)} voice introduction recorded.`,
      });
    }
  };
  
  const playRecording = () => {
    // In a real app, this would play the audio file
    setIsPlaying(true);
    
    // Simulate playback progress
    let position = 0;
    timerRef.current = setInterval(() => {
      position += 1;
      setPlaybackPosition(position);
      
      if (position >= recordingDuration) {
        stopPlayback();
      }
    }, 1000);
  };
  
  const stopPlayback = () => {
    setIsPlaying(false);
    setPlaybackPosition(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const deleteRecording = () => {
    // In a real app, this would delete the audio file
    setHasRecording(false);
    setRecordingDuration(0);
    setPlaybackPosition(0);
    
    toast({
      title: "Recording deleted",
      description: "Your voice introduction has been removed."
    });
  };
  
  const saveToProfile = () => {
    // In a real app, this would upload the audio file to the server
    toast({
      title: "Voice profile saved!",
      description: "Your voice introduction is now visible to employers."
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <Card className="border-2 border-muted">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Voice Introduction
        </CardTitle>
        <CardDescription>
          Record your voice to introduce yourself to potential employers
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Recording interface */}
        <div className="rounded-lg bg-muted/30 p-6">
          <div className="flex flex-col items-center justify-center">
            <div className={`relative rounded-full w-24 h-24 flex items-center justify-center bg-muted ${isRecording ? 'animate-pulse bg-red-500/10' : ''}`}>
              <div className={`absolute inset-0 rounded-full bg-primary/10 ${isRecording ? 'animate-ping opacity-75' : 'opacity-0'}`}></div>
              {hasRecording ? (
                isPlaying ? (
                  <Pause 
                    size={36} 
                    className={`text-primary cursor-pointer transition-all`}
                    onClick={stopPlayback}
                  />
                ) : (
                  <Play 
                    size={36} 
                    className={`text-primary cursor-pointer transition-all`}
                    onClick={playRecording}
                  />
                )
              ) : isRecording ? (
                <MicOff 
                  size={36} 
                  className="text-primary cursor-pointer" 
                  onClick={stopRecording}
                />
              ) : (
                <Mic 
                  size={36} 
                  className="text-primary cursor-pointer" 
                  onClick={startRecording}
                />
              )}
            </div>
            
            <div className="mt-4 text-center">
              {hasRecording ? (
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium">
                    {isPlaying ? 'Now playing' : 'Ready to play'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(isPlaying ? playbackPosition : recordingDuration)}
                  </span>
                </div>
              ) : isRecording ? (
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-red-500">Recording...</span>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(recordingDuration)} / {formatTime(maxDuration)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-lg font-medium">Tap to record</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share your introduction in your preferred language
                  </p>
                </div>
              )}
            </div>
            
            {hasRecording && (
              <div className="w-full mt-4">
                <Slider 
                  disabled={true}
                  value={[isPlaying ? playbackPosition : recordingDuration]} 
                  max={recordingDuration}
                  step={1}
                  className="cursor-not-allowed"
                />
              </div>
            )}
          </div>
          
          {hasRecording && (
            <div className="flex justify-center gap-3 mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={deleteRecording}
                className="text-red-500 hover:text-red-600"
              >
                <Delete className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <Button size="sm" onClick={saveToProfile}>
                <Save className="h-4 w-4 mr-1" />
                Save to Profile
              </Button>
            </div>
          )}
        </div>
        
        {/* Recording tips */}
        {!hasRecording && (
          <div>
            <h3 className="text-md font-medium mb-3">Tips for a great voice introduction</h3>
            <ul className="space-y-2">
              {recordingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Sample audio */}
        {!hasRecording && !isRecording && (
          <div>
            <h3 className="text-md font-medium mb-3">Listen to sample introductions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start" size="sm">
                <Play className="h-4 w-4 mr-2" /> 
                Sample: Construction Worker
              </Button>
              <Button variant="outline" className="justify-start" size="sm">
                <Play className="h-4 w-4 mr-2" /> 
                Sample: Electrical Technician
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t bg-muted/20">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Note:</span> Voice introductions help employers understand your communication skills
        </p>
      </CardFooter>
    </Card>
  );
};

export default VoiceProfile;
