
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">About Our Project</h1>
            <p className="text-xl text-muted-foreground">
              Fighting misinformation with advanced AI technology
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-display font-bold mb-4">Our Mission</h2>
                <p className="mb-4 text-muted-foreground">
                  With the increasing misuse of AI tools, deepfake content — including manipulated 
                  videos, images, and cloned voices — is spreading rapidly across social media 
                  platforms. These can be used for misinformation, identity fraud, harassment, and more.
                </p>
                <p className="text-muted-foreground">
                  MediaWatchdog aims to combat this trend by providing an accessible, powerful tool 
                  for detecting and flagging deepfake media. Our AI-based system analyzes multiple aspects 
                  of digital content to identify signs of manipulation and help users verify the authenticity 
                  of media they encounter online.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-display font-bold mb-4">Technology</h2>
                <p className="mb-4 text-muted-foreground">
                  Our detection system uses multimodal AI techniques to analyze different aspects of media:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>
                      <strong className="text-foreground">Video frame inconsistencies</strong> - Detecting unnatural transitions, 
                      compression artifacts, and facial anomalies in video content
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-secondary/10 text-cyber-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>
                      <strong className="text-foreground">Audio-visual mismatches</strong> - Identifying synchronization issues between 
                      lip movements and speech, which often indicate manipulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-accent/10 text-cyber-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>
                      <strong className="text-foreground">Facial emotion distortions</strong> - Analyzing the naturalness and consistency 
                      of facial expressions across video frames
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-success/10 text-cyber-success">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>
                      <strong className="text-foreground">Synthetic voice patterns</strong> - Detecting the unique artifacts and 
                      patterns present in AI-generated or modified audio
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>
                      <strong className="text-foreground">Metadata analysis</strong> - Examining file information for inconsistencies that 
                      may indicate editing or manipulation
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-display font-bold mb-4">Training Data</h2>
                <p className="mb-4 text-muted-foreground">
                  Our AI models are trained on high-quality datasets specifically designed for deepfake detection:
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-1">Deepfake Detection Challenge Dataset (DFDC)</h3>
                    <p className="text-sm text-muted-foreground">
                      A large-scale dataset created by Facebook (Meta) in collaboration with other industry partners, 
                      containing thousands of videos with and without deepfake manipulations.
                    </p>
                  </li>
                  <li className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-1">Deep Fake Detection (DFD) Dataset</h3>
                    <p className="text-sm text-muted-foreground">
                      A high-quality dataset developed by Google and Jigsaw for evaluating deepfake detection methods, 
                      featuring a variety of real and manipulated videos.
                    </p>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  By training on these diverse and comprehensive datasets, our models learn to identify a wide range of 
                  manipulation techniques and can adapt to new deepfake methods as they emerge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-display font-bold mb-4">Future Development</h2>
                <p className="mb-4 text-muted-foreground">
                  MediaWatchdog is constantly evolving to keep pace with advancements in deepfake technology. 
                  Our roadmap includes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                    <span>Browser extensions for real-time deepfake detection while browsing social media</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                    <span>API integration for developers to incorporate our detection capabilities into their own applications</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                    <span>Enhanced explanation tools to help users understand why specific media has been flagged</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                    <span>Expansion of our models to detect new types of media manipulation as they emerge</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
