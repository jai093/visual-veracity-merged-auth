
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Docs = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Learn more about our deepfake detection technology
            </p>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="video">Video Analysis</TabsTrigger>
              <TabsTrigger value="audio">Audio Analysis</TabsTrigger>
              <TabsTrigger value="image">Image Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>MediaWatchdog Overview</CardTitle>
                  <CardDescription>
                    Understanding our multimodal deepfake detection system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What are Deepfakes?</h3>
                    <p className="text-muted-foreground">
                      Deepfakes are synthetic media where a person's likeness is replaced with someone else's using 
                      artificial intelligence. The term can also refer to AI-generated content that mimics real 
                      people's voices, creates realistic but fake images, or manipulates existing media to show 
                      events that never occurred.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">How our System Works</h3>
                    <p className="text-muted-foreground mb-4">
                      MediaWatchdog employs a comprehensive approach to deepfake detection by analyzing multiple aspects 
                      of media content. Our AI models are trained on the Deepfake Detection Challenge Dataset (DFDC) and 
                      other high-quality datasets, enabling them to recognize various manipulation techniques.
                    </p>
                    <p className="text-muted-foreground">
                      When you upload media to our system, it undergoes analysis through several specialized detection 
                      models, each focusing on different aspects of the content. The results from these models are 
                      combined to provide an overall assessment of the media's authenticity.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Key Detection Methods</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <span className="text-cyber-primary">•</span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">Visual Inconsistency Detection</strong> - Identifies unnatural 
                          elements in images and video frames
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyber-secondary">•</span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">Temporal Analysis</strong> - Examines consistency across 
                          video frames over time
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyber-accent">•</span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">Audio Fingerprinting</strong> - Detects synthetic voice patterns 
                          and manipulation artifacts
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyber-success">•</span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">Facial Expression Analysis</strong> - Evaluates the naturalness 
                          of facial movements and expressions
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyber-warning">•</span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">Metadata Examination</strong> - Checks file information for signs 
                          of editing or manipulation
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Understanding Results</h3>
                    <p className="text-muted-foreground mb-4">
                      After analysis, our system provides a comprehensive report with:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-muted-foreground">
                          Overall authenticity assessment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-muted-foreground">
                          Confidence score indicating the reliability of the assessment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-muted-foreground">
                          Detailed metrics for specific aspects of the media
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-muted-foreground">
                          Explanations of detected anomalies or manipulation indicators
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Important Considerations</h3>
                    <p className="text-muted-foreground mb-2">
                      While our system employs state-of-the-art detection methods, no deepfake detection technology is 100% accurate. 
                      Consider these limitations:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-cyber-warning">⚠</span>
                        <span className="text-muted-foreground">
                          Deepfake technology evolves rapidly, and new techniques may not be immediately detectable
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyber-warning">⚠</span>
                        <span className="text-muted-foreground">
                          Low-quality source media can affect detection accuracy
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyber-warning">⚠</span>
                        <span className="text-muted-foreground">
                          Some legitimate content may exhibit characteristics similar to deepfakes
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="video">
              <Card>
                <CardHeader>
                  <CardTitle>Video Analysis</CardTitle>
                  <CardDescription>
                    How our system detects deepfakes in video content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Video Deepfake Detection</h3>
                    <p className="text-muted-foreground">
                      Our video analysis employs multiple detection methods that work together to identify 
                      manipulated content. When you upload a video, our system processes it frame by frame 
                      while also analyzing the temporal relationships between frames and the audio track.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Frame Consistency Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Examines individual video frames for inconsistencies in lighting, color, and texture 
                        that may indicate manipulation. This process can detect splicing, face swapping, and 
                        other visual alterations.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Temporal Coherence</h3>
                      <p className="text-sm text-muted-foreground">
                        Analyzes how objects, especially faces, move and change over time. Deepfakes often 
                        exhibit unnatural movements or flickering between frames that our AI can detect.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Facial Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Specialized models examine facial features, expressions, and movements for signs of 
                        manipulation. This includes unnatural blinking patterns, inconsistent facial landmarks, 
                        and emotion inconsistencies.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Audio-Visual Synchronization</h3>
                      <p className="text-sm text-muted-foreground">
                        Evaluates how well lip movements align with speech audio. Deepfakes often exhibit 
                        subtle misalignments that our system can detect even when not obvious to the human eye.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Technical Process</h3>
                    <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                      <li className="pl-2">
                        Video is broken down into individual frames and audio track
                      </li>
                      <li className="pl-2">
                        Frames undergo analysis through convolutional neural networks trained to detect manipulation artifacts
                      </li>
                      <li className="pl-2">
                        Face detection and tracking algorithms isolate facial regions for detailed examination
                      </li>
                      <li className="pl-2">
                        Audio is analyzed for voice authenticity and synchronized with visual lip movements
                      </li>
                      <li className="pl-2">
                        Results from all analysis methods are combined using an ensemble approach
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Understanding Video Analysis Results</h3>
                    <p className="text-muted-foreground mb-4">
                      After processing your video, our system provides several key metrics:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Frame Consistency Score</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-3/4"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Significant inconsistencies between frames, suggesting manipulation<br />
                          <strong>High score:</strong> Natural frame transitions consistent with authentic video
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Facial Anomaly Score</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-1/2"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Detected unnatural facial features or expressions<br />
                          <strong>High score:</strong> Natural and consistent facial expressions
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Audio-Video Sync</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-4/5"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Misalignment between speech audio and lip movements<br />
                          <strong>High score:</strong> Well-synchronized audio and visual components
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audio">
              <Card>
                <CardHeader>
                  <CardTitle>Audio Analysis</CardTitle>
                  <CardDescription>
                    How our system detects synthetic or manipulated audio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Audio Deepfake Detection</h3>
                    <p className="text-muted-foreground">
                      Synthetic audio, voice cloning, and audio manipulations have become increasingly sophisticated. 
                      Our system employs specialized techniques to detect AI-generated or manipulated audio by analyzing 
                      patterns that are typically imperceptible to human listeners.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Voice Print Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Every person has unique vocal characteristics. Our system creates a "voice print" from the audio 
                        and checks for inconsistencies that may indicate synthetic generation or manipulation.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Spectral Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Examines the frequency spectrum of the audio for artifacts commonly produced by AI voice 
                        generators. These artifacts often appear as unusual patterns in specific frequency ranges.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Phoneme Transitions</h3>
                      <p className="text-sm text-muted-foreground">
                        Analyzes how speech sounds flow together. AI-generated speech often exhibits unnatural 
                        transitions between phonemes that our models can detect.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Background Consistency</h3>
                      <p className="text-sm text-muted-foreground">
                        Evaluates background noise patterns for sudden changes or inconsistencies that may indicate 
                        splicing or editing of the audio track.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Technical Process</h3>
                    <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                      <li className="pl-2">
                        Audio is converted into spectrograms for visual pattern analysis
                      </li>
                      <li className="pl-2">
                        Deep neural networks analyze micro-patterns in the audio that are characteristic of AI generation
                      </li>
                      <li className="pl-2">
                        Voice patterns are compared against models of natural human speech
                      </li>
                      <li className="pl-2">
                        Background noise is isolated and examined for consistency
                      </li>
                      <li className="pl-2">
                        Results from multiple analysis methods are combined to produce a final authenticity score
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Understanding Audio Analysis Results</h3>
                    <p className="text-muted-foreground mb-4">
                      Our audio analysis provides several key metrics to help you understand potential manipulations:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Voice Print Authenticity</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-2/3"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Voice characteristics suggest synthetic generation<br />
                          <strong>High score:</strong> Voice patterns consistent with natural human speech
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Background Noise Analysis</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-4/5"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Inconsistent background noise suggesting edits or splicing<br />
                          <strong>High score:</strong> Consistent background noise patterns
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Frequency Anomalies</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-1/2"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Detected unusual frequency patterns typical of synthetic audio<br />
                          <strong>High score:</strong> Natural frequency distribution consistent with human speech
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="image">
              <Card>
                <CardHeader>
                  <CardTitle>Image Analysis</CardTitle>
                  <CardDescription>
                    How our system detects manipulated or AI-generated images
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Image Deepfake Detection</h3>
                    <p className="text-muted-foreground">
                      Our image analysis system can detect various types of image manipulation, including AI-generated 
                      images, face swaps, and digital alterations. The system examines both visible and invisible 
                      aspects of the image to identify signs of manipulation.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Pixel Pattern Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Evaluates the distribution and patterns of pixels to identify inconsistencies or artifacts 
                        that are common in manipulated or AI-generated images.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Metadata Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        Examines image file metadata for inconsistencies, edit history, or other indicators 
                        that may suggest the image has been altered.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Facial Anomaly Detection</h3>
                      <p className="text-sm text-muted-foreground">
                        For images containing faces, specialized models examine facial geometry, texture, and 
                        lighting for signs of manipulation or generation.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Lighting and Shadow Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Analyzes the consistency of lighting, shadows, and reflections across the image, which 
                        are often difficult to perfectly simulate in manipulated content.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Technical Process</h3>
                    <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                      <li className="pl-2">
                        Image undergoes initial preprocessing to normalize size and format
                      </li>
                      <li className="pl-2">
                        Convolutional neural networks analyze visual patterns for manipulation artifacts
                      </li>
                      <li className="pl-2">
                        Metadata extraction and analysis check for editing history
                      </li>
                      <li className="pl-2">
                        Specialized models examine noise patterns and compression artifacts
                      </li>
                      <li className="pl-2">
                        For images with people, facial analysis algorithms check for inconsistencies
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Understanding Image Analysis Results</h3>
                    <p className="text-muted-foreground mb-4">
                      After analyzing an image, our system provides several key metrics:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Metadata Consistency</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-3/5"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Inconsistent or missing metadata suggesting manipulation<br />
                          <strong>High score:</strong> Metadata aligns with expected patterns for authentic images
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Pixel Anomalies</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-2/3"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Detected unusual pixel patterns typical of generated content<br />
                          <strong>High score:</strong> Pixel patterns consistent with camera-captured images
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Lighting Consistency</h4>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-danger to-cyber-success h-full w-4/5"></div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <strong>Low score:</strong> Inconsistent lighting and shadows suggesting compositing<br />
                          <strong>High score:</strong> Natural lighting patterns consistent throughout the image
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Docs;
