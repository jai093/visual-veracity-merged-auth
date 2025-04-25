
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent text-transparent bg-clip-text">
              Deepfake Detection Using Multimodal AI
            </h1> */}

<h1
  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 
             bg-gradient-to-r from-cyberprimary via-cybersecondary to-cyberaccent 
             bg-[length:200%_200%] bg-clip-text text-transparent animate-gradientShift"
>
  Deepfake Detection Using Multimodal AI
</h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Protect digital integrity with advanced deepfake detection. Our system analyzes 
              video frames, audio patterns, facial emotions, and more to identify manipulated media.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/analyze')}
                className="bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:opacity-90 transition-opacity"
              >
                Analyze Media
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/docs')}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Feature preview */}
          <div className="mt-12 md:mt-24">
            <div className="relative mx-auto max-w-4xl bg-card border border-border rounded-xl overflow-hidden shadow-lg scanning-effect">
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="rounded-lg bg-muted/50 h-64 md:h-72 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="inline-block rounded-full bg-cyber-primary/10 p-3 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-cyber-primary"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <path d="M12 2v20" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                      <p className="text-muted-foreground">Media Analysis Preview</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">Upload media to see the analysis in action</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h3 className="text-sm font-semibold mb-2">Video Analysis</h3>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-cyber-primary h-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Frame consistency: 75%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h3 className="text-sm font-semibold mb-2">Audio Analysis</h3>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-cyber-accent h-full w-4/5"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Voice authenticity: 80%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h3 className="text-sm font-semibold mb-2">Overall Score</h3>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-cyber-warning h-full w-1/2"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Deepfake probability: 50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold mb-4">Advanced Detection Features</h2>
            <p className="text-muted-foreground">
              Our multimodal approach combines multiple analysis techniques for comprehensive deepfake detection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="inline-block rounded-full bg-cyber-primary/10 p-3 mb-4">
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
                  <path d="M15 10h4.5a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-2.5 2.5H15" />
                  <path d="M9 12h6" />
                  <path d="M9 5h9" />
                  <path d="M9 19h9" />
                  <path d="M5 19V5" />
                  <path d="M3 3v18" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Video Frames</h3>
              <p className="text-muted-foreground text-sm">
                Frame-by-frame analysis that detects inconsistencies and manipulation artifacts.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="inline-block rounded-full bg-cyber-secondary/10 p-3 mb-4">
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
                  <path d="M9 9H4.5a2.5 2.5 0 0 0 0 5H9" />
                  <path d="M16 15h4.5a2.5 2.5 0 0 0 0-5H16" />
                  <path d="M12 5v13" />
                  <path d="m7 8 5-3 5 3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Voice Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Detection of synthetic voice patterns and audio-visual misalignments.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="inline-block rounded-full bg-cyber-accent/10 p-3 mb-4">
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
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20" />
                  <path d="M8 9h8" />
                  <path d="M8 15h3" />
                  <path d="M16 15h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Facial Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Identifies unnatural facial expressions and emotion distortions.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="inline-block rounded-full bg-cyber-success/10 p-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6 text-cyber-success"
                >
                  <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
                  <path d="m8 16 4-4 4 4" />
                  <path d="M16 16v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Metadata Check</h3>
              <p className="text-muted-foreground text-sm">
                Examines file metadata for signs of digital manipulation or editing.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative bg-background">
        <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Ready to Analyze Media?</h2>
            <p className="text-muted-foreground mb-8">
              Upload videos, audio, or images to get a comprehensive deepfake analysis powered by our multimodal AI system.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/analyze')}
              className="bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:opacity-90 transition-opacity"
            >
              Start Analysis
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
