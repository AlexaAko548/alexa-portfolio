import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Palette, 
  Smartphone, 
  Terminal, 
  ChevronRight,
  Download,
  Menu,
  X,
  FileText,
  Eye
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // New State for the Resume Popup
  const [showResume, setShowResume] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "TindaPOS",
      category: "Mobile Development / UI Design",
      description: "A specialized Point-of-Sales mobile application designed for local micro-entrepreneurs and small businesses.",
      tech: ["React Native", "SQLite", "Figma"],
      link: "#",
      icon: <Smartphone className="w-6 h-6" />,
      highlight: "Implemented local persistent storage for offline transaction management."
    },
    {
      title: "Memora",
      category: "Web Development / OOP",
      description: "A web-based flashcard maker built to optimize student study workflows through efficient deck management.",
      tech: ["ASP.NET", "C#", "CSS3"],
      link: "#",
      icon: <Code className="w-6 h-6" />,
      highlight: "Designed object-oriented logic for randomized study modes and progress tracking."
    },
    {
      title: "Pokedex App",
      category: "Mobile UI & API Integration",
      description: "A visual encyclopedia for Pokémon data featuring clean grid layouts and smooth data fetching.",
      tech: ["React Native", "REST API", "JavaScript"],
      link: "#",
      icon: <ExternalLink className="w-6 h-6" />,
      highlight: "Optimized asynchronous API calls for seamless infinite scrolling and search."
    }
  ];

  const skillGroups = [
    {
      title: "Design",
      icon: <Palette className="text-pink-500" />,
      skills: ["Figma", "Wireframing", "Prototyping", "User Research", "Adobe Suite"]
    },
    {
      title: "Development",
      icon: <Terminal className="text-blue-500" />,
      skills: ["React Native", "C# / ASP.NET", "JavaScript", "HTML/CSS", "SQLite"]
    },
    {
      title: "Tools & Misc",
      icon: <Code className="text-green-500" />,
      skills: ["Git / GitHub", "VS Code", "Godot Engine", "Tailwind CSS"]
    }
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      
      {/* --- RESUME MODAL POPUP --- */}
      {showResume && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={() => setShowResume(false)}>
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-white">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileText size={20} className="text-blue-600"/> Resume Preview
              </h3>
              <div className="flex gap-2">
                <a 
                  href="/resume.pdf" 
                  download="Alexa_Rose_Minoza_Resume.pdf"
                  className="p-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Download size={16} /> Download
                </a>
                <button 
                  onClick={() => setShowResume(false)} 
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content (PDF Preview) */}
            <div className="flex-1 bg-slate-100 overflow-hidden relative">
              <iframe 
                src="/resume.pdf" 
                className="w-full h-full" 
                title="Resume PDF"
              >
                {/* Fallback if browser doesn't support iframe PDF viewing */}
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <p>Your browser doesn't support PDF preview.</p>
                  <a href="/resume.pdf" download className="text-blue-600 underline mt-2">Download it here instead.</a>
                </div>
              </iframe>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollTo('home')}>
            ALEXA ROSE MIÑOZA
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['About', 'Work', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {item}
              </button>
            ))}
            {/* Resume Button - Now Opens Popup */}
            <button 
              onClick={() => setShowResume(true)}
              className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
            >
              <Eye size={14} /> Resume
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-6 flex flex-col space-y-4 shadow-xl">
            {['About', 'Work', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left text-lg font-medium py-2"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => { setShowResume(true); setIsMenuOpen(false); }}
              className="bg-blue-600 text-white p-3 rounded-xl text-center font-medium"
            >
              View Resume
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
            Incoming UI/UX Intern @ Symph
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Designing Interfaces, <br />
            <span className="text-blue-600">Developing Solutions.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            I’m Alexa Rose Miñoza, a 3rd Year BSIT Student at the University of San Carlos. 
            I bridge the gap between design thinking and functional code.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollTo('work')}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all transform hover:-translate-y-1"
            >
              View My Work <ChevronRight size={18} />
            </button>
            
            {/* Download Button - Directly Downloads File */}
            <a 
              href="/resume.pdf" 
              download="Alexa_Rose_Minoza_Resume.pdf"
              className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
            >
              <Download size={18} /> Download CV
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                {/* Replace src with your image path */}
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200">
                   <img src="src/assets/1x1_alexa(4).png" alt="Portrait of Alexa" className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-2xl -z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-50 rounded-full -z-0"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">The Journey</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                As a Computer Science & IT student at USC, I've always been fascinated by how users interact with technology. 
                My development background in C# and React Native allows me to understand the technical constraints of my designs, 
                while my UI/UX passion ensures that the code I write serves a human-centric purpose.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Mobile First</h4>
                    <p className="text-sm text-slate-500">Experienced in React Native for cross-platform solutions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-pink-50 p-2 rounded-lg text-pink-600">
                    <Palette size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">User-Centric Design</h4>
                    <p className="text-sm text-slate-500">Focused on usability, accessibility, and visual aesthetics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Selected Works</h2>
            <p className="text-slate-600">Building products from concept to implementation.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
                <div className="h-48 bg-slate-100 p-8 flex items-center justify-center text-slate-300 group-hover:bg-slate-200 transition-colors">
                  {/* Portfolio Project Mockup/Icon */}
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                     {project.icon}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl mb-6 italic text-xs text-slate-500 border-l-2 border-blue-400">
                    "{project.highlight}"
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium uppercase">{t}</span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    View Project <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">Skill Set</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                <div className="mb-6">{group.icon}</div>
                <h3 className="text-xl font-bold mb-6">{group.title}</h3>
                <ul className="space-y-3">
                  {group.skills.map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Let's Collaborate</h2>
            <p className="text-slate-400">Currently open to internship projects and new opportunities.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-medium">minozaalexarose@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">LinkedIn</p>
                  <p className="font-medium">www.linkedin.com/in/alexa-rose-miñoza-44782b3a7</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Github size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">GitHub</p>
                  <p className="font-medium">https://github.com/AlexaAko548</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <textarea 
                placeholder="Your Message" 
                rows="4" 
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
              ></textarea>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Alexa Rose Miñoza. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;