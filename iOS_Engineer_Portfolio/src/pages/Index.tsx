import { Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
const projects = [{
  id: 1,
  title: "Convergo Messaging",
  description: "Real-time messaging app inspired by WhatsApp and Telegram\nSupporting chat, media sharing and voice/video calling",
  image: "https://images.unsplash.com/photo-1570894808314-677b57f25e45?w=400&auto=format&fit=crop&q=80",
  technologies: ["Swift", "SwiftUI", "Firebase", "JitsiMeetSDK", "CallKit"],
  github: "#",
  appstore: "#"
}, {
  id: 2,
  title: "Whispi",
  description: "AI girlfriend app with personalized romantic chat experiences\nAudio/video messaging with immersive interactions",
  image: "https://images.unsplash.com/photo-1746286721374-cd541e26911a?w=400&auto=format&fit=crop&q=80",
  technologies: ["Swift", "UIKit", "Firebase", "StoreKit", "CoreHaptics"],
  github: "#",
  appstore: "#"
}, {
  id: 3,
  title: "TasteAI",
  description: "AI-powered personalized recipe generator\nUsing Gemini API with Firebase and Core Data",
  image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&auto=format&fit=crop&q=80",
  technologies: ["Swift", "Firebase", "CoreData", "Gemini API"],
  github: "#",
  appstore: "#"
}, {
  id: 4,
  title: "Image Processing Toolkit",
  description: "Modular image processing application\nHistogram analysis, thresholding, morphological operations",
  image: "https://images.unsplash.com/photo-1520445694166-4a2ca1ba362f?w=400&auto=format&fit=crop&q=80",
  technologies: ["Python", "OpenCV", "Computer Vision"],
  github: "#",
  appstore: "#"
}, {
  id: 5,
  title: "Emotion Analysis with Azure",
  description: "Sentiment analysis using Azure Cognitive Services\nReal-time emotional tone detection from user input",
  image: "https://images.unsplash.com/photo-1572955995017-e769428eb228?w=400&auto=format&fit=crop&q=80",
  technologies: ["Python", "Microsoft Azure", "Cognitive Services"],
  github: "#",
  appstore: "#"
}, {
  id: 6,
  title: "YouTube Clone",
  description: "Modern YouTube clone with exceptional UI/UX\nBuilt with Next.js and TypeScript",
  image: "https://images.unsplash.com/photo-1762340273700-70c17506e578?w=400&auto=format&fit=crop&q=80",
  technologies: ["Next.js", "TypeScript", "React"],
  github: "#",
  appstore: "#"
}, {
  id: 7,
  title: "PDF Converter",
  description: "GUI-based PDF conversion tool\nConverts to Word, text, JSON, and HTML formats",
  image: "https://images.unsplash.com/photo-1521250164448-79d809c7cb0f?w=400&auto=format&fit=crop&q=80",
  technologies: ["Python", "Tkinter", "GUI"],
  github: "#",
  appstore: "#"
}, {
  id: 8,
  title: "Face Classification System",
  description: "AI-generated face detection using CNNs\nMultiple convolutional neural networks implementation",
  image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?w=400&auto=format&fit=crop&q=80",
  technologies: ["Python", "CNN", "OpenCV", "Machine Learning"],
  github: "#",
  appstore: "#"
}, {
  id: 9,
  title: "iOS Nutrition Tracker",
  description: "AI-enhanced food recognition and calorie estimation\nUsing CoreML in native iOS application",
  image: "https://images.unsplash.com/photo-1564758913551-7212727c4b08?w=400&auto=format&fit=crop&q=80",
  technologies: ["Swift", "Xcode", "CoreML", "AI"],
  github: "#",
  appstore: "#"
}, {
  id: 10,
  title: "AI-Powered Q&A Web App",
  description: "Responsive web app using Flask\nSolves visual, textual, and mathematical problems with AI",
  image: "https://images.unsplash.com/photo-1618218168350-6e7c81151b64?w=400&auto=format&fit=crop&q=80",
  technologies: ["Python", "Flask", "HTML", "CSS", "AI"],
  github: "#",
  appstore: "#"
}];
const skills = [{
  name: "Swift",
  level: 95
}, {
  name: "SwiftUI",
  level: 90
}, {
  name: "UIKit",
  level: 88
}, {
  name: "Core Data",
  level: 85
}, {
  name: "Combine",
  level: 82
}, {
  name: "XCTest",
  level: 80
}, {
  name: "Git",
  level: 90
}, {
  name: "Xcode",
  level: 95
}];
const experiences = [{
  company: "Orion Innovation Turkey",
  position: "Native iOS Engineer Intern",
  period: "2025 – 2026",
  location: "Istanbul",
  description: "Develop iOS features using Swift and SwiftUI in real-time messaging app. Integrate Firebase services, implement push notifications with UserNotifications/PushKit, and build voice/video calling features using CallKit and AVFoundation."
}, {
  company: "QuantumCode Software Technology",
  position: "Native iOS Engineer",
  period: "2025",
  location: "Remote, Samsun",
  description: "Develop iOS apps using Swift, SwiftUI, and MVVM architecture. Build interactive UIs with Core Animation/Lottie, implement custom navigation flows, and integrate AI-based features with Firebase and REST APIs."
}, {
  company: "Outlier",
  position: "Frontend Developer (Freelancer)",
  period: "2024 - 2025",
  location: "Remote",
  description: "Develop modern web frontends using Next.js and TypeScript for AI-focused platforms. Collaborate as AI Trainer to enhance frontend implementations through structured interface improvements."
}];
export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (formErrors.length > 0) {
      setFormErrors([]);
      setSubmitStatus('idle');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors([]);
    setSubmitStatus('idle');
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('send_contact_email_2026_01_14_15_15', {
        body: formData
      });
      if (error) {
        console.error('Supabase function error:', error);
        setFormErrors(['Failed to send message. Please try again.']);
        setSubmitStatus('error');
      } else if (data?.error) {
        console.error('Function returned error:', data.error);
        if (data.details && Array.isArray(data.details)) {
          setFormErrors(data.details);
        } else {
          setFormErrors([data.error]);
        }
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setFormErrors(['An unexpected error occurred. Please try again.']);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-primary">Kaan Sengun</div>
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block mb-8">
              <img src="https://images.unsplash.com/photo-1661983228690-048b2434c4fb?w=200&auto=format&fit=crop&q=80" alt="Kaan Sengun" className="w-32 h-32 rounded-full mx-auto shadow-lg animate-float" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent pt-2.5 pb-2.5">
              Kaan Sengun
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Native iOS Engineer
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Experienced engineer developing modern, high-performance iOS applications with Swift and SwiftUI. A developer who prioritizes user experience, writes clean code, and creates innovative solutions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300" onClick={() => scrollToSection('contact')}>
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="hover:bg-primary/10 transition-all duration-300" onClick={() => window.open('/Kaan-Sengun-FlowCV-Resume.pdf', '_blank')}>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="https://github.com/Kaansengun" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/kaansengun/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1594501252028-2bb7b21d01b7?w=600&auto=format&fit=crop&q=80" alt="Workspace" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <p className="text-lg text-muted-foreground mt-[nullpx] mb-[nullpx] pt-2.5 pb-2.5">I am a Senior Software Engineering student with experience in UML diagrams, OOP and SOLID principles, Artificial Intelligence, Image Processing, Database Management, and basic Web Applications.                                                            During my internships, I contributed to an iOS project integrating AI features and a real-time iOS messaging application by developing features with UIKit and SwiftUI, working on voice and video calling features using CallKit, JitsiMeetSDK, AVFoundation, and AVKit. I aim to enhance my technical skills by exploring new technologies and applying them in real-world projects.</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">iOS Development</Badge>
                <Badge variant="secondary">Swift</Badge>
                <Badge variant="secondary">SwiftUI</Badge>
                <Badge variant="secondary">UIKit</Badge>
                <Badge variant="secondary">Core Data</Badge>
                <Badge variant="secondary">Combine</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => <Card key={project.id} className={`glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: `${index * 100}ms`
          }}>
                <CardContent className="p-0">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 whitespace-pre-line leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>)}
                    </div>
                    <div className="flex">
                      <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://github.com/Kaansengun', '_blank')}>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12"> Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">70%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-1000 ease-out" style={{
                width: isVisible ? `${skill.level}%` : '0%',
                transitionDelay: `${index * 100}ms`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => <div key={index} className="relative pl-8 pb-8 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="absolute left-2 top-4 w-0.5 h-full bg-border last:hidden"></div>
                <Card className="glass-card ml-4">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              </div>)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">kaansengun197@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">+90 530 812 2759</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">Istanbul, Turkey</p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formErrors.length > 0 && <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <ul className="text-sm text-destructive space-y-1">
                          {formErrors.map((error, index) => <li key={index}>• {error}</li>)}
                        </ul>
                      </div>}
                    
                    {submitStatus === 'success' && <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          ✓ Message sent successfully! I'll get back to you soon.
                        </p>
                      </div>}
                    
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name *" title="Please enter your name" className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required disabled={isSubmitting} />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email *" title="Please enter a valid email address" className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required disabled={isSubmitting} />
                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message *" title="Please enter your message" rows={4} className="w-full p-3 rounded-lg border bg-background resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required disabled={isSubmitting}></textarea>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2026 Kaan Sengun. All rights reserved.</p>
        </div>
      </footer>
    </div>;
}