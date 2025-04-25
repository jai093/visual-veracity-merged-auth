
import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Camera, X } from 'lucide-react';
import { generateAnalysisResults } from '@/utils/analysisUtils';

interface WebcamAnalyzerProps {
  onAnalysisComplete: (results: any) => void;
}

const WebcamAnalyzer = ({ onAnalysisComplete }: WebcamAnalyzerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const webcamRef = useRef<Webcam>(null);

  const handleStartWebcam = () => {
    setIsActive(true);
  };

  const handleCloseWebcam = () => {
    setIsActive(false);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        handleAnalyzeWebcam(imageSrc);
      } else {
        toast({
          variant: "destructive",
          title: "Webcam error",
          description: "Could not capture image from webcam.",
        });
      }
    }
  }, [webcamRef]);

  const handleAnalyzeWebcam = (imageSrc: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Convert base64 to blob for analysis
    const byteString = atob(imageSrc.split(',')[1]);
    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], "webcam-capture.jpg", { type: mimeString });

    // Simulate analysis process with enhanced dataset-based detection
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        clearInterval(interval);
        setAnalysisProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          
          // Use the analysis results generator from our utility
          const results = generateAnalysisResults('image', file.name, file);
          
          onAnalysisComplete(results);
          toast({
            title: "Analysis complete",
            description: "Webcam image analysis has been completed.",
          });
        }, 500);
      } else {
        setAnalysisProgress(progress);
      }
    }, 300);
  };

  return (
    <div className="mt-6">
      {!isActive ? (
        <Button 
          variant="outline"
          className="w-full flex items-center justify-center gap-2" 
          onClick={handleStartWebcam}
        >
          <Camera size={18} />
          <span>Live Webcam Detection</span>
        </Button>
      ) : (
        <div className="border rounded-lg p-4 bg-background relative">
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-2 right-2 z-10" 
            onClick={handleCloseWebcam}
          >
            <X size={18} />
          </Button>
          
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-md mb-4 bg-muted w-full max-w-md aspect-video relative">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            </div>
            
            {isAnalyzing ? (
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing webcam feed...</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>▹ Analyzing facial features</p>
                  <p>▹ Checking for manipulation artifacts</p>
                  <p>▹ Comparing against DFDC dataset patterns</p>
                  <p>▹ Processing neural inconsistencies</p>
                </div>
              </div>
            ) : (
              <Button 
                className="w-full mt-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:opacity-90 transition-opacity"
                onClick={capture}
              >
                Analyze Current Frame
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamAnalyzer;
