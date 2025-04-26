import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { AlertTriangle, Check, Download, Image, Mic, Video } from 'lucide-react';
import WebcamAnalyzer from '@/components/WebcamAnalyzer';
import { generateAnalysisResults, generateDownloadableReport } from '@/utils/analysisUtils';
import { useAuth } from "@/contexts/AuthContext";

interface SpecificMetrics {
  [key: string]: number | undefined;
}

interface VideoMetrics extends SpecificMetrics {
  faceConsistency?: number;
  audioSyncScore?: number;
  lightingConsistency?: number;
  backgroundNoise?: number;
  metadataAnalysis?: number;
}

type AnalysisResults = {
  isDeepfake: boolean;
  overallResult: string;
  confidenceInterval: string;
  baseMetrics: {
    authenticity: number;
    manipulationProbability: number;
    confidence: number;
  };
  specificMetrics: { [key: string]: number | undefined };
  detailedExplanation: string;
  downloadable: boolean;
};

// Export the type to be used in other files
export type { AnalysisResults, SpecificMetrics };

const Analyze = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedFile(null);
    setAnalysisResults(null);
    setAnalysisProgress(0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes: Record<string, string[]> = {
        video: ['video/mp4', 'video/webm', 'video/quicktime'],
        audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
        image: ['image/jpeg', 'image/png', 'image/gif'],
      };

      if (!validTypes[activeTab].includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `Please upload a valid ${activeTab} file.`,
        });
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis process
    const interval = setInterval(() => {
      setAnalysisProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.random() * 15;
        
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisProgress(100);
            
            // Use the enhanced analysis results generator
            const results = generateAnalysisResults(activeTab, selectedFile.name, selectedFile);
            // Filter out undefined values from specificMetrics
            const filteredSpecificMetrics = Object.fromEntries(
              Object.entries(results.specificMetrics)
                .map(([key, value]) => [key, Number(value)])
            );
            setAnalysisResults({ ...results, specificMetrics: filteredSpecificMetrics });
            
            toast({
              title: "Analysis complete",
              description: "Media analysis has been successfully completed.",
            });
          }, 500);
          return 100;
        }
        
        return nextProgress;
      });
    }, 600);
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleWebcamAnalysisComplete = (results: AnalysisResults) => {
    setAnalysisResults(results);
  };

  const handleDownloadReport = () => {
    if (!analysisResults) return;

    // Ensure specific metrics are included, especially for the 'image' tab
    const specificMetrics = {
      ...analysisResults.specificMetrics,
      metadataConsistency: analysisResults.specificMetrics.metadataConsistency !== undefined ? analysisResults.specificMetrics.metadataConsistency : 0,
      pixelAnomalies: analysisResults.specificMetrics.pixelAnomalies !== undefined ? analysisResults.specificMetrics.pixelAnomalies : 0,
      lightingConsistency: analysisResults.specificMetrics.lightingConsistency !== undefined ? analysisResults.specificMetrics.lightingConsistency : 0,
      textureAnalysis: analysisResults.specificMetrics.textureAnalysis !== undefined ? analysisResults.specificMetrics.textureAnalysis : 0,
      neuralInconsistency: analysisResults.specificMetrics.neuralInconsistency !== undefined ? analysisResults.specificMetrics.neuralInconsistency : 0,
    };

    // Generate text report
    const reportContent = generateDownloadableReport({
      ...analysisResults,
      specificMetrics: specificMetrics, // Use the modified specificMetrics
      mediaType: activeTab,
      fileName: selectedFile?.name || 'unknown',
      analysisDate: new Date().toLocaleDateString(),
      datasetReference: 'DFDC and DFD',
      analysisVersion: '1.0',
    });
    
    // Create blob and download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `deepfake-analysis-${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report downloaded",
      description: "Analysis report has been downloaded successfully.",
    });
  };

  const getMediaTypeIcon = () => {
    switch (activeTab) {
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'audio':
        return <Mic className="h-6 w-6" />;
      case 'image':
        return <Image className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Analyze Media for Deepfakes</h1>
            <p className="text-muted-foreground">
              Upload media files for comprehensive deepfake detection analysis
            </p>
          </div>
          
          <Card className="bg-card border border-border p-6">
            <Tabs 
              value={activeTab} 
              onValueChange={handleTabChange}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
              </TabsList>
              
              {/* Video Tab */}
              <TabsContent value="video" className="space-y-6">
                {!analysisResults ? (
                  <>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center border-muted hover:border-muted-foreground/50 transition-colors">
                        {selectedFile ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center">
                              <Video className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-foreground font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={resetAnalysis}
                              className="mt-2"
                            >
                              Change File
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center">
                              <Video className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-lg font-medium">Upload Video for Analysis</p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Supports MP4, WebM, MOV (max 100MB)
                              </p>
                              <Button
                                variant="secondary"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Select Video File
                              </Button>
                              <input
                                type="file"
                                accept="video/*"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Webcam Analysis Component */}
                      <WebcamAnalyzer onAnalysisComplete={handleWebcamAnalysisComplete} />
                      
                      {selectedFile && !isAnalyzing && (
                        <Button 
                          className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:opacity-90 transition-opacity"
                          onClick={handleAnalyze}
                        >
                          Start Analysis
                        </Button>
                      )}
                      
                      {isAnalyzing && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Analyzing video...</span>
                            <span>{Math.round(analysisProgress)}%</span>
                          </div>
                          <Progress value={analysisProgress} className="h-2" />
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>▹ Checking video frame consistency</p>
                            <p>▹ Analyzing facial expressions</p>
                            <p>▹ Examining audio-visual synchronization</p>
                            <p>▹ Comparing against DFDC dataset patterns</p>
                            <p>▹ Testing with DFD detection model</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Analysis Results</h3>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleDownloadReport}
                          className="flex items-center gap-1"
                        >
                          <Download size={16} />
                          <span>Download Report</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={resetAnalysis}>
                          New Analysis
                        </Button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${analysisResults.isDeepfake ? 'bg-cyber-danger/10 border border-cyber-danger/30' : 'bg-cyber-success/10 border border-cyber-success/30'}`}>
                      <div className="flex items-center gap-3">
                        {analysisResults.isDeepfake ? (
                          <AlertTriangle className="h-5 w-5 text-cyber-danger" />
                        ) : (
                          <Check className="h-5 w-5 text-cyber-success" />
                        )}
                        <span className={`font-medium ${analysisResults.isDeepfake ? 'text-cyber-danger' : 'text-cyber-success'}`}>
                          {analysisResults.overallResult}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground pl-8">
                        {analysisResults.isDeepfake 
                          ? 'Our DFDC-trained AI has detected potential signs of manipulation in this media.' 
                          : 'Our DFD-trained AI did not detect significant signs of manipulation in this media.'}
                      </p>
                      <div className="mt-2 text-xs pl-8">
                        <span className="text-muted-foreground">Confidence Interval:</span> {analysisResults.confidenceInterval}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Core Metrics</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Authenticity Score</span>
                              <span>{Math.round(analysisResults.baseMetrics.authenticity)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.authenticity} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Manipulation Probability</span>
                              <span>{Math.round(analysisResults.baseMetrics.manipulationProbability)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.manipulationProbability} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Confidence Score</span>
                              <span>{Math.round(analysisResults.baseMetrics.confidence)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.confidence} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Video-Specific Metrics</h4>
                        <div className="space-y-4">
                          {Object.entries(analysisResults.specificMetrics).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span>{Math.round(Number(value))}%</span>
                              </div>
                              <Progress value={Number(value)} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/40 p-4 rounded-lg text-sm">
                      <h4 className="font-medium mb-2">Explanation</h4>
                      <p className="text-muted-foreground">
                        {analysisResults.detailedExplanation}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Analysis performed using models trained on the Deepfake Detection Challenge Dataset (DFDC) and Deep Fake Detection (DFD) dataset.
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={resetAnalysis}>
                        Analyze Another File
                      </Button>
                      <Button
                        onClick={() => navigate('/')}
                      >
                        Return Home
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Audio Tab */}
              <TabsContent value="audio" className="space-y-6">
              {!analysisResults ? (
                  <>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center border-muted hover:border-muted-foreground/50 transition-colors">
                        {selectedFile ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center">
                              <Mic className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-foreground font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={resetAnalysis}
                              className="mt-2"
                            >
                              Change File
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center">
                              <Mic className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-lg font-medium">Upload Audio for Analysis</p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Supports MP3, WAV, OGG (max 50MB)
                              </p>
                              <Button
                                variant="secondary"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Select Audio File
                              </Button>
                              <input
                                type="file"
                                accept="audio/*"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* No webcam for audio tab */}
                      
                      {selectedFile && !isAnalyzing && (
                        <Button 
                          className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:opacity-90 transition-opacity"
                          onClick={handleAnalyze}
                        >
                          Start Analysis
                        </Button>
                      )}
                      
                      {isAnalyzing && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Analyzing audio...</span>
                            <span>{Math.round(analysisProgress)}%</span>
                          </div>
                          <Progress value={analysisProgress} className="h-2" />
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>▹ Analyzing voice patterns</p>
                            <p>▹ Checking for frequency anomalies</p>
                            <p>▹ Examining background noise consistency</p>
                            <p>▹ Comparing against DFDC dataset patterns</p>
                            <p>▹ Verifying voice print authenticity</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  // Similar result display as video tab with audio-specific metrics
                  <div className="space-y-8">
                    
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Analysis Results</h3>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleDownloadReport}
                          className="flex items-center gap-1"
                        >
                          <Download size={16} />
                          <span>Download Report</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={resetAnalysis}>
                          New Analysis
                        </Button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${analysisResults.isDeepfake ? 'bg-cyber-danger/10 border border-cyber-danger/30' : 'bg-cyber-success/10 border border-cyber-success/30'}`}>
                      <div className="flex items-center gap-3">
                        {analysisResults.isDeepfake ? (
                          <AlertTriangle className="h-5 w-5 text-cyber-danger" />
                        ) : (
                          <Check className="h-5 w-5 text-cyber-success" />
                        )}
                        <span className={`font-medium ${analysisResults.isDeepfake ? 'text-cyber-danger' : 'text-cyber-success'}`}>
                          {analysisResults.overallResult}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground pl-8">
                        {analysisResults.isDeepfake 
                          ? 'Our DFDC-trained AI has detected potential signs of voice synthesis in this audio.' 
                          : 'Our DFD-trained AI did not detect significant signs of voice synthesis in this audio.'}
                      </p>
                      <div className="mt-2 text-xs pl-8">
                        <span className="text-muted-foreground">Confidence Interval:</span> {analysisResults.confidenceInterval}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Core Metrics</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Authenticity Score</span>
                              <span>{Math.round(analysisResults.baseMetrics.authenticity)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.authenticity} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Manipulation Probability</span>
                              <span>{Math.round(analysisResults.baseMetrics.manipulationProbability)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.manipulationProbability} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Confidence Score</span>
                              <span>{Math.round(analysisResults.baseMetrics.confidence)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.confidence} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Audio-Specific Metrics</h4>
                        <div className="space-y-4">
                          {Object.entries(analysisResults.specificMetrics).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span>{Math.round(Number(value))}%</span>
                              </div>
                              <Progress value={Number(value)} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/40 p-4 rounded-lg text-sm">
                      <h4 className="font-medium mb-2">Explanation</h4>
                      <p className="text-muted-foreground">
                        {analysisResults.detailedExplanation}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Analysis performed using models trained on the Deepfake Detection Challenge Dataset (DFDC) and Deep Fake Detection (DFD) dataset.
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={resetAnalysis}>
                        Analyze Another File
                      </Button>
                      <Button
                        onClick={() => navigate('/')}
                      >
                        Return Home
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Image Tab */}
              <TabsContent value="image" className="space-y-6">
                {!analysisResults ? (
                  <>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center border-muted hover:border-muted-foreground/50 transition-colors">
                        {selectedFile ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center">
                              <Image className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-foreground font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={resetAnalysis}
                              className="mt-2"
                            >
                              Change File
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center">
                              <Image className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-lg font-medium">Upload Image for Analysis</p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Supports JPEG, PNG, GIF (max 20MB)
                              </p>
                              <Button
                                variant="secondary"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Select Image File
                              </Button>
                              <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Webcam Analysis Component */}
                      <WebcamAnalyzer onAnalysisComplete={handleWebcamAnalysisComplete} />
                      
                      {selectedFile && !isAnalyzing && (
                        <Button 
                          className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:opacity-90 transition-opacity"
                          onClick={handleAnalyze}
                        >
                          Start Analysis
                        </Button>
                      )}
                      
                      {isAnalyzing && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Analyzing image...</span>
                            <span>{Math.round(analysisProgress)}%</span>
                          </div>
                          <Progress value={analysisProgress} className="h-2" />
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>▹ Examining pixel inconsistencies</p>
                            <p>▹ Analyzing metadata</p>
                            <p>▹ Checking lighting consistency</p>
                            <p>▹ Scanning for neural network artifacts</p>
                            <p>▹ Comparing against DFD dataset patterns</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  // Similar result display as video tab with image-specific metrics
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Analysis Results</h3>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleDownloadReport}
                          className="flex items-center gap-1"
                        >
                          <Download size={16} />
                          <span>Download Report</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={resetAnalysis}>
                          New Analysis
                        </Button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${analysisResults.isDeepfake ? 'bg-cyber-danger/10 border border-cyber-danger/30' : 'bg-cyber-success/10 border border-cyber-success/30'}`}>
                      <div className="flex items-center gap-3">
                        {analysisResults.isDeepfake ? (
                          <AlertTriangle className="h-5 w-5 text-cyber-danger" />
                        ) : (
                          <Check className="h-5 w-5 text-cyber-success" />
                        )}
                        <span className={`font-medium ${analysisResults.isDeepfake ? 'text-cyber-danger' : 'text-cyber-success'}`}>
                          {analysisResults.overallResult}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground pl-8">
                        {analysisResults.isDeepfake 
                          ? 'Our DFD-trained AI has detected potential signs of manipulation in this image.' 
                          : 'Our DFD-trained AI did not detect significant signs of manipulation in this image.'}
                      </p>
                      <div className="mt-2 text-xs pl-8">
                        <span className="text-muted-foreground">Confidence Interval:</span> {analysisResults.confidenceInterval}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Core Metrics</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Authenticity Score</span>
                              <span>{Math.round(analysisResults.baseMetrics.authenticity)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.authenticity} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Manipulation Probability</span>
                              <span>{Math.round(analysisResults.baseMetrics.manipulationProbability)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.manipulationProbability} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Confidence Score</span>
                              <span>{Math.round(analysisResults.baseMetrics.confidence)}%</span>
                            </div>
                            <Progress value={analysisResults.baseMetrics.confidence} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Image-Specific Metrics</h4>
                        <div className="space-y-4">
                          {Object.entries(analysisResults.specificMetrics).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span>{Math.round(Number(value))}%</span>
                              </div>
                              <Progress value={Number(value)} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/40 p-4 rounded-lg text-sm">
                      <h4 className="font-medium mb-2">Explanation</h4>
                      <p className="text-muted-foreground">
                        {analysisResults.detailedExplanation}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Analysis performed using models trained on the Deepfake Detection Challenge Dataset (DFDC) and Deep Fake Detection (DFD) dataset.
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={resetAnalysis}>
                        Analyze Another File
                      </Button>
                      <Button
                        onClick={() => navigate('/')}
                      >
                        Return Home
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-cyber-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 text-cyber-primary"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">DFDC-Trained Models</h3>
                  <p className="text-muted-foreground text-sm">
                    Our system uses advanced neural networks trained on the Deepfake Detection Challenge Dataset (DFDC) to identify manipulated media.
                  </p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-cyber-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 text-cyber-secondary"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M12 2v20" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Multimodal Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    We combine analysis of visual cues, audio patterns, and metadata using DFD dataset insights for a comprehensive assessment of media authenticity.
                  </p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-cyber-accent/10 rounded-full flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 text-cyber-accent"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Detailed Reporting</h3>
                  <p className="text-muted-foreground text-sm">
                    Get comprehensive analysis results with specific metrics, downloadable reports, and detailed explanations about potential manipulation indicators.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


// // Utility to get dynamic bar color
// const getBarColor = (score: number) => {
//   if (score > 80) return "bg-green-400";    // High score = green
//   if (score > 50) return "bg-yellow-400";    // Medium score = yellow
//   return "bg-red-400";                       // Low score = red
// };

// export default function Analyze() {
//   // Example score data (replace with your real data)
//   const videoScore = 85;
//   const audioScore = 62;
//   const imageScore = 40;

//   return (
//     <div className="bg-gradient-to-b from-white to-slate-100 min-h-screen p-8">
//       <div className="max-w-4xl mx-auto space-y-8">

//         {/* Section Title - Video */}
//         <h2 className="text-3xl font-bold text-indigo-600 mb-4">Video Analysis Results</h2>

//         {/* Video Card */}
//         <div className="rounded-lg p-6 bg-gradient-to-r from-indigo-100 via-white to-pink-100 shadow-md hover:shadow-lg hover:bg-blue-50 transition">
//           <p className="mb-2 font-semibold">Deepfake Detection Score:</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div className={`${getBarColor(videoScore)} h-2.5 rounded-full`} style={{ width: `${videoScore}%` }}></div>
//           </div>
//         </div>

//         {/* Section Title - Audio */}
//         <h2 className="text-3xl font-bold text-teal-600 mb-4">Audio Analysis Results</h2>

//         {/* Audio Card */}
//         <div className="rounded-lg p-6 bg-gradient-to-r from-teal-100 via-white to-yellow-100 shadow-md hover:shadow-lg hover:bg-blue-50 transition">
//           <p className="mb-2 font-semibold">Deepfake Detection Score:</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div className={`${getBarColor(audioScore)} h-2.5 rounded-full`} style={{ width: `${audioScore}%` }}></div>
//           </div>
//         </div>

//         {/* Section Title - Image */}
//         <h2 className="text-3xl font-bold text-amber-600 mb-4">Image Analysis Results</h2>

//         {/* Image Card */}
//         <div className="rounded-lg p-6 bg-gradient-to-r from-amber-100 via-white to-pink-100 shadow-md hover:shadow-lg hover:bg-blue-50 transition">
//           <p className="mb-2 font-semibold">Deepfake Detection Score:</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div className={`${getBarColor(imageScore)} h-2.5 rounded-full`} style={{ width: `${imageScore}%` }}></div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

/* Duplicate Analyze component removed to resolve redeclaration error */

export default Analyze;
