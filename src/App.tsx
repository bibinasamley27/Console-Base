import * as React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Folder, 
  File, 
  Terminal as TerminalIcon, 
  Copy, 
  Check, 
  Play, 
  RotateCcw, 
  Database, 
  FileText, 
  Info, 
  Award, 
  HelpCircle, 
  Code2, 
  ChevronRight, 
  Github, 
  Download, 
  ArrowUpRight, 
  Cpu, 
  Terminal, 
  BookOpen, 
  Hash,
  Laptop
} from 'lucide-react';

import { FilePath, FileItem, StudentData } from './types';
import { JAVA_PROJECT_CODE } from './codeData';
import { 
  SimulatorState, 
  SimulatorPhase, 
  INITIAL_STUDENTS, 
  WELCOME_BANNER, 
  MENU_LINES, 
  handleTerminalInput 
} from './simulator';

export default function App() {
  // --- Workspace File State ---
  const [selectedFilePath, setSelectedFilePath] = useState<FilePath>('src/main/java/com/intern/consoleapp/Main.java');
  const [copyFeedback, setCopyFeedback] = useState(false);

  // --- Terminal Simulator State ---
  const [terminalState, setTerminalState] = useState<SimulatorState>({
    history: [...WELCOME_BANNER, ...MENU_LINES],
    students: [...INITIAL_STUDENTS],
    phase: 'menu',
    currentInput: '',
    prompt: '👉 Enter your choice (1-7): ',
    tempStudent: {}
  });
  const [termInputText, setTermInputText] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // --- Active Tab State ---
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'explorer' | 'tutorial' | 'recruiter'>('explorer');

  // --- Auto Scroll Terminal to Bottom ---
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalState.history]);

  // Focus terminal input when clicking on terminal container
  const focusTerminalInput = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  // --- File Tree Definition ---
  const fileTree: FileItem[] = [
    { name: 'pom.xml', path: 'pom.xml', type: 'file' },
    { name: '.gitignore', path: '.gitignore', type: 'file' },
    { name: 'README.md', path: 'README.md', type: 'file' },
    {
      name: 'src',
      path: 'src/main/java/com/intern/consoleapp/Main.java', // Dummy placeholder
      type: 'dir',
      children: [
        {
          name: 'main',
          path: 'src/main/java/com/intern/consoleapp/Main.java', // Dummy placeholder
          type: 'dir',
          children: [
            {
              name: 'java',
              path: 'src/main/java/com/intern/consoleapp/Main.java', // Dummy placeholder
              type: 'dir',
              children: [
                {
                  name: 'com.intern.consoleapp',
                  path: 'src/main/java/com/intern/consoleapp/Main.java', // Dummy placeholder
                  type: 'dir',
                  children: [
                    { name: 'Main.java', path: 'src/main/java/com/intern/consoleapp/Main.java', type: 'file' },
                    {
                      name: 'model',
                      path: 'src/main/java/com/intern/consoleapp/model/Student.java', // Dummy placeholder
                      type: 'dir',
                      children: [
                        { name: 'Student.java', path: 'src/main/java/com/intern/consoleapp/model/Student.java', type: 'file' }
                      ]
                    },
                    {
                      name: 'service',
                      path: 'src/main/java/com/intern/consoleapp/service/StudentService.java', // Dummy placeholder
                      type: 'dir',
                      children: [
                        { name: 'StudentService.java', path: 'src/main/java/com/intern/consoleapp/service/StudentService.java', type: 'file' }
                      ]
                    },
                    {
                      name: 'exception',
                      path: 'src/main/java/com/intern/consoleapp/exception/StudentException.java', // Dummy placeholder
                      type: 'dir',
                      children: [
                        { name: 'StudentException.java', path: 'src/main/java/com/intern/consoleapp/exception/StudentException.java', type: 'file' }
                      ]
                    },
                    {
                      name: 'utils',
                      path: 'src/main/java/com/intern/consoleapp/utils/InputUtils.java', // Dummy placeholder
                      type: 'dir',
                      children: [
                        { name: 'InputUtils.java', path: 'src/main/java/com/intern/consoleapp/utils/InputUtils.java', type: 'file' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  // --- Code Design Insights Map ---
  const fileInsights: Record<FilePath, { title: string; desc: string; pattern: string }> = {
    'pom.xml': {
      title: 'Maven Dependency Management',
      desc: 'Controls standard builds, source compilation target set to Java 11/17, and includes standard JUnit 5 configurations representing actual business pipelines.',
      pattern: 'Enterprise Standard Project Structure'
    },
    '.gitignore': {
      title: 'Repository Cleanliness',
      desc: 'Prunes temporary binaries, logs, build target/ outputs, and IDE configurations (.idea, .vscode, out) to avoid polluted git histories.',
      pattern: 'Professional Repository Best Practice'
    },
    'src/main/java/com/intern/consoleapp/model/Student.java': {
      title: 'Strict Data Encapsulation',
      desc: 'Fields are highly guarded via private declarations. Setters validate parameters (e.g., verifying age matches 15-100 and email constraints) to prevent corrupt objects.',
      pattern: 'Object-Oriented Defensive Design'
    },
    'src/main/java/com/intern/consoleapp/exception/StudentException.java': {
      title: 'Custom Exception Hierarchy',
      desc: 'Defines target Exception subclasses (NotFound, DuplicateId) inside a clean application scope instead of dumping raw generic exceptions.',
      pattern: 'Semantic Fail-Fast Architecture'
    },
    'src/main/java/com/intern/consoleapp/service/StudentService.java': {
      title: 'Separation of Concerns (Logic Layer)',
      desc: 'Implements CRUD operations over the ArrayList. Enforces ID unique constraints using Java Streams, and wraps results inside standard Optional to safely handle absent elements.',
      pattern: 'Clean Coding & Single Responsibility'
    },
    'src/main/java/com/intern/consoleapp/utils/InputUtils.java': {
      title: 'Input Sanitization & Buffer Protection',
      desc: 'Guards the system from Scanner exception crashes. Correctly resolves the notorious Scanner nextLine() skip trap and validates department letters and emails with strict Regex.',
      pattern: 'Robust UI Utilities'
    },
    'src/main/java/com/intern/consoleapp/Main.java': {
      title: 'Interactive User Interface Controller',
      desc: 'Drives the user menu switch loops. Intercepts custom service exceptions and renders user-facing error states without showing dirty developer stacks.',
      pattern: 'Interactive CLI State Machine'
    },
    'README.md': {
      title: 'Polished Project Documentation',
      desc: 'Exhaustive markdown manual covering folder maps, setup steps, simulated terminal visual samples, and a suggested git commit history.',
      pattern: 'Internship Ready Portfolio documentation'
    }
  };

  const activeInsight = useMemo(() => {
    return fileInsights[selectedFilePath];
  }, [selectedFilePath]);

  // --- Copy Code Handler ---
  const handleCopyCode = () => {
    const code = JAVA_PROJECT_CODE[selectedFilePath];
    navigator.clipboard.writeText(code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // --- Terminal Submit Handler ---
  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = termInputText;
    setTermInputText('');
    
    setTerminalState(prev => handleTerminalInput(prev, input));
  };

  // --- Shortcut Triggers (Makes manual testing extremely easy for users) ---
  const triggerShortcut = (inputVal: string) => {
    setTerminalState(prev => handleTerminalInput(prev, inputVal));
    focusTerminalInput();
  };

  // --- Restart Terminal Session ---
  const handleResetTerminal = () => {
    setTerminalState({
      history: [...WELCOME_BANNER, ...MENU_LINES],
      students: [...INITIAL_STUDENTS],
      phase: 'menu',
      currentInput: '',
      prompt: '👉 Enter your choice (1-7): ',
      tempStudent: {}
    });
    setTermInputText('');
    focusTerminalInput();
  };

  // --- Render File Tree Recursively ---
  const renderTree = (items: FileItem[], depth = 0) => {
    return items.map((item, index) => {
      const isSelected = item.type === 'file' && selectedFilePath === item.path;
      if (item.type === 'dir') {
        return (
          <div key={`${item.name}-${index}`} className="select-none">
            <div 
              style={{ paddingLeft: `${depth * 12 + 8}px` }} 
              className="flex items-center text-xs text-slate-400 py-1 font-medium font-sans hover:bg-slate-800/30 cursor-pointer"
            >
              <Folder className="w-3.5 h-3.5 text-blue-400 mr-1.5 shrink-0" />
              <span>{item.name}</span>
            </div>
            {item.children && renderTree(item.children, depth + 1)}
          </div>
        );
      } else {
        return (
          <div 
            key={`${item.name}-${index}`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            className={`flex items-center text-xs py-1.5 font-sans cursor-pointer border-l-2 transition-all ${
              isSelected 
                ? 'bg-blue-500/10 text-blue-400 border-blue-500 font-medium' 
                : 'text-slate-300 hover:bg-slate-800/50 border-transparent'
            }`}
            onClick={() => setSelectedFilePath(item.path)}
          >
            <File className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
            <span className="truncate">{item.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col antialiased font-sans selection:bg-emerald-500/30 selection:text-emerald-100">
      
      {/* HEADER BAR WITH MASSIVE TYPOGRAPHY */}
      <header className="p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-baseline bg-slate-900/50 sticky top-0 z-50 backdrop-blur">
        <div className="flex flex-col">
          <span className="text-emerald-400 font-mono text-xs tracking-[0.30em] uppercase mb-1">Internship Portfolio // v1.0.2</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-none text-white">
            STUDENT <span className="text-emerald-400">MGMT</span>
          </h1>
        </div>
        <div className="text-left md:text-right mt-4 md:mt-0 shrink-0">
          <div className="text-xs font-mono opacity-50 uppercase tracking-widest mb-2">Technology Stack</div>
          <div className="flex flex-wrap gap-2 md:gap-4 font-bold text-sm text-slate-200">
            <span>JAVA 17</span>
            <span className="text-slate-600">/</span>
            <span>MAVEN</span>
            <span className="text-slate-600">/</span>
            <span>JUNIT 5</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400">SOLID</span>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT GRID */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden h-full">
        
        {/* LEFT COLUMN: SOURCE WORKSPACE & CODE VIEWER (5 cols) */}
        <section className="xl:col-span-5 border-r border-slate-800 flex flex-col bg-slate-950 min-h-[500px] xl:h-[calc(100vh-140px)] overflow-hidden">
          
          {/* Workspace Tabs */}
          <div className="flex bg-slate-900 border-b border-slate-800 shrink-0">
            <button 
              onClick={() => setActiveWorkspaceTab('explorer')}
              className={`px-5 py-3 border-r border-slate-800 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeWorkspaceTab === 'explorer' 
                  ? 'bg-[#0d1117] text-white font-bold border-t-2 border-t-emerald-500' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              Code Browser
            </button>
            <button 
              onClick={() => setActiveWorkspaceTab('tutorial')}
              className={`px-5 py-3 border-r border-slate-800 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeWorkspaceTab === 'tutorial' 
                  ? 'bg-[#0d1117] text-white font-bold border-t-2 border-t-emerald-500' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Setup Guide
            </button>
          </div>

          {activeWorkspaceTab === 'explorer' ? (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden h-full">
              
              {/* Explorer File List */}
              <div className="border-r border-slate-800 p-4 bg-slate-950 overflow-y-auto">
                <div className="flex items-center justify-between mb-4 px-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Project Explorer</span>
                </div>
                <div className="space-y-1.5">
                  {renderTree(fileTree)}
                </div>
              </div>

              {/* Code Editor Screen */}
              <div className="md:col-span-2 flex flex-col bg-[#0d1117] overflow-hidden">
                
                {/* Editor File Header */}
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
                    <span className="text-orange-400 text-xs">☕</span>
                    <span>{selectedFilePath.split('/').pop()}</span>
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 px-3 py-1 border border-slate-800 rounded bg-slate-950 hover:bg-slate-900 text-[11px] text-slate-300 font-mono transition-all active:scale-95"
                  >
                    {copyFeedback ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Actual Source Code Area */}
                <div className="flex-1 overflow-auto p-6 font-mono text-[13px] leading-relaxed text-slate-300 bg-[#0d1117] scrollbar-thin">
                  <div className="flex gap-4">
                    <div className="text-slate-600 text-right select-none w-8 border-r border-slate-800/40 pr-3 hidden sm:block">
                      {JAVA_PROJECT_CODE[selectedFilePath]?.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="whitespace-pre overflow-x-auto text-slate-300 w-full">
                      <code>
                        {JAVA_PROJECT_CODE[selectedFilePath]}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Architectural Explanation Panel */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
                  <div className="flex items-start gap-3">
                    <div className="p-2 border border-slate-800 bg-slate-950 rounded-lg text-emerald-400 font-mono text-center shrink-0">
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-0.5">Metric</p>
                      <p className="text-sm font-bold">98% SOLID</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-100 font-mono uppercase tracking-wide">{activeInsight.title}</span>
                        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold shrink-0">
                          {activeInsight.pattern}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono leading-relaxed">
                        {activeInsight.desc}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* LOCAL IMPORT & SETUP GUIDE SCREEN */
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0d1117] font-mono text-xs">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Laptop className="w-4 h-4 text-emerald-400" />
                  <span className="uppercase">Local Installation Guide</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Follow these instructions to run the Student Management System on your local laptop. The complete workspace is generated inside the <code>Console-Application/</code> directory.
                </p>
              </div>

              {/* Step 1 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-mono flex items-center justify-center">1</span>
                  <span className="text-xs font-bold text-slate-200 uppercase">Verify Prerequisites</span>
                </div>
                <div className="pl-7 text-xs text-slate-400 leading-relaxed space-y-1.5">
                  <p>Verify you have JDK 11 (or higher) and Maven installed by executing these commands in your console terminal:</p>
                  <pre className="bg-slate-950 p-3 border border-slate-800 font-mono text-[10px] text-emerald-400">
                    {`# Check Java version (Must be 11, 17, 21 or higher)\njava -version\n\n# Check Maven installation\nmvn -version`}
                  </pre>
                  <p className="text-[10px] italic">No Java? Download it from <a href="https://adoptium.net" target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">Adoptium Temurin</a>.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-mono flex items-center justify-center">2</span>
                  <span className="text-xs font-bold text-slate-200 uppercase">Import Into Editor</span>
                </div>
                <div className="pl-7 text-xs text-slate-400 leading-relaxed space-y-2">
                  <p>This is configured as a standard Maven project. To import it:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>IntelliJ IDEA</strong>: Choose <span className="text-slate-200">File &gt; Open</span>, and select the <span className="text-slate-200">Console-Application/pom.xml</span> file. Select "Open as Project".</li>
                    <li><strong>VS Code</strong>: Open VS Code, ensure the <span className="text-slate-200">Extension Pack for Java</span> is installed, and open the <span className="text-slate-200">Console-Application/</span> folder. VS Code will auto-configure.</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-mono flex items-center justify-center">3</span>
                  <span className="text-xs font-bold text-slate-200 uppercase">Build & Run Commands</span>
                </div>
                <div className="pl-7 text-xs text-slate-400 leading-relaxed space-y-2">
                  <p>In your computer's terminal, navigate to the folder and run:</p>
                  <pre className="bg-slate-950 p-3 border border-slate-800 font-mono text-[10px] text-emerald-400">
                    {`# Navigate to project root\ncd Console-Application\n\n# Compile & build the executable target JAR\nmvn clean package\n\n# Run the application instantly using Maven\nmvn exec:java`}
                  </pre>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-mono flex items-center justify-center">4</span>
                  <span className="text-xs font-bold text-slate-200 uppercase">Git Commit Milestones</span>
                </div>
                <div className="pl-7 text-xs text-slate-400 leading-relaxed space-y-2">
                  <p>Initialize a repository inside the <code>Console-Application/</code> folder, paste the custom <code>.gitignore</code>, and commit step-by-step:</p>
                  <pre className="bg-slate-950 p-3 border border-slate-800 font-mono text-[10px] text-emerald-400">
                    {`git init\ngit add .\ngit commit -m "feat: initialize Maven build structures and .gitignore"\ngit commit -m "feat: construct Student model with parameter verification"\ngit commit -m "feat: implement StudentService database layers"\ngit commit -m "feat: implement scanner safe InputUtils validators"\ngit commit -m "feat: final Main.java driver and loop connect"`}
                  </pre>
                </div>
              </div>

              {/* Info Banner */}
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/20 rounded-lg text-xs leading-relaxed text-emerald-300 flex items-start space-x-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  The workspace is fully preserved in the container. Click the download or export button in the workspace settings menu to obtain the complete files as a ZIP or export them directly to GitHub!
                </span>
              </div>
            </div>
          )}
        </section>

        {/* CENTER COLUMN: LIVE INTERACTIVE TERMINAL SIMULATOR (4 cols) */}
        <section className="xl:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950 min-h-[500px] xl:h-[calc(100vh-140px)] overflow-hidden">
          
          {/* Terminal Banner Header */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Terminal // RUN CONSOLEAPP</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="bg-slate-950 border-b border-slate-800 p-2 flex flex-wrap gap-1.5 items-center justify-between shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-1">Quick Helpers</span>
            <div className="flex flex-wrap gap-1">
              {terminalState.phase === 'menu' && (
                <>
                  <button 
                    onClick={() => triggerShortcut('2')} 
                    className="px-2 py-0.5 border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:text-white transition text-[10px] font-mono text-slate-300 font-bold"
                  >
                    Select 2 (View Records)
                  </button>
                  <button 
                    onClick={() => triggerShortcut('1')} 
                    className="px-2 py-0.5 border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:text-white transition text-[10px] font-mono text-slate-300 font-bold"
                  >
                    Select 1 (Add Record)
                  </button>
                  <button 
                    onClick={() => triggerShortcut('3')} 
                    className="px-2 py-0.5 border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:text-white transition text-[10px] font-mono text-slate-300 font-bold"
                  >
                    Select 3 (Search ID)
                  </button>
                  <button 
                    onClick={() => triggerShortcut('6')} 
                    className="px-2 py-0.5 border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:text-white transition text-[10px] font-mono text-slate-300 font-bold"
                  >
                    Select 6 (Metrics)
                  </button>
                </>
              )}
              {terminalState.phase === 'add_id' && (
                <button 
                  onClick={() => triggerShortcut('STU1005')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  STU1005
                </button>
              )}
              {terminalState.phase === 'add_name' && (
                <button 
                  onClick={() => triggerShortcut('Sarah Connor')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  Sarah Connor
                </button>
              )}
              {terminalState.phase === 'add_age' && (
                <button 
                  onClick={() => triggerShortcut('22')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  22
                </button>
              )}
              {terminalState.phase === 'add_dept' && (
                <button 
                  onClick={() => triggerShortcut('Robotics')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  Robotics
                </button>
              )}
              {terminalState.phase === 'add_email' && (
                <button 
                  onClick={() => triggerShortcut('sarah.c@sky.net')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  sarah.c@sky.net
                </button>
              )}
              {terminalState.phase === 'search_id' && (
                <>
                  <button 
                    onClick={() => triggerShortcut('STU1001')} 
                    className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                  >
                    STU1001 (Found)
                  </button>
                  <button 
                    onClick={() => triggerShortcut('STU999')} 
                    className="px-2 py-0.5 border border-red-800 bg-red-950 text-red-300 transition text-[10px] font-mono font-bold"
                  >
                    STU999 (Not Found)
                  </button>
                </>
              )}
              {terminalState.phase === 'delete_id' && (
                <button 
                  onClick={() => triggerShortcut('STU1004')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  STU1004
                </button>
              )}
              {terminalState.phase === 'delete_confirm' && (
                <>
                  <button 
                    onClick={() => triggerShortcut('Y')} 
                    className="px-2.5 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold"
                  >
                    Confirm (Y)
                  </button>
                  <button 
                    onClick={() => triggerShortcut('N')} 
                    className="px-2.5 py-0.5 border border-red-800 bg-red-950 text-red-300 text-[10px] font-mono font-bold"
                  >
                    Cancel (N)
                  </button>
                </>
              )}
              {terminalState.phase === 'update_id' && (
                <button 
                  onClick={() => triggerShortcut('STU1002')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  STU1002
                </button>
              )}
              {terminalState.phase.startsWith('update_') && terminalState.phase !== 'update_id' && (
                <button 
                  onClick={() => triggerShortcut('')} 
                  className="px-2 py-0.5 border border-emerald-800 bg-emerald-950 text-emerald-300 transition text-[10px] font-mono font-bold"
                >
                  [Hit Enter (Keep original)]
                </button>
              )}
            </div>
          </div>

          {/* Terminal Screen Log Body */}
          <div 
            onClick={focusTerminalInput}
            className="flex-1 overflow-y-auto p-6 font-mono text-[13px] leading-relaxed text-slate-300 bg-slate-950 cursor-text space-y-2.5 scrollbar-thin shadow-inner"
          >
            {terminalState.history.map((line, idx) => {
              // Custom coloring depending on content
              let style = 'text-slate-300';
              if (line.includes('⚠️')) {
                style = 'text-yellow-400 font-semibold';
              } else if (line.includes('❌') || line.includes('Error')) {
                style = 'text-red-400 font-semibold';
              } else if (line.includes('✨') || line.includes('SUCCESS') || line.includes('Success')) {
                style = 'text-emerald-400 font-bold border-l-2 border-emerald-500 pl-3 my-1';
              } else if (line.startsWith('👉') || line.startsWith('Enter') || line.startsWith('Current')) {
                style = 'text-emerald-400';
              } else if (line.startsWith('┌') || line.startsWith('├') || line.startsWith('└') || line.startsWith('│')) {
                style = 'text-slate-600 font-bold';
              } else if (line.includes('========') || line.startsWith('+')) {
                style = 'text-slate-700';
              } else if (line.includes('---') || line.includes('MENU')) {
                style = 'text-white font-bold border-l-2 border-slate-500 pl-3 my-2';
              } else if (line.includes('STU1')) {
                style = 'text-emerald-400';
              }

              return (
                <div key={idx} className={`${style} whitespace-pre-wrap`}>
                  {line}
                </div>
              );
            })}
            <div ref={terminalBottomRef} />
          </div>

          {/* Terminal Active Input Command Bar */}
          <div className="bg-slate-900/50 p-4 border-t border-slate-800 shrink-0">
            <form onSubmit={handleTermSubmit} className="flex items-center space-x-2.5">
              <span className="text-emerald-400 font-mono text-xs font-bold shrink-0">
                {terminalState.prompt}
              </span>
              <input 
                ref={terminalInputRef}
                type="text"
                autoFocus
                disabled={terminalState.phase === 'exited'}
                value={termInputText}
                onChange={(e) => setTermInputText(e.target.value)}
                placeholder={
                  terminalState.phase === 'exited' 
                    ? "Session closed. Click Reset." 
                    : "Enter choice..."
                }
                className="flex-1 bg-transparent text-white font-mono text-xs border-0 outline-none ring-0 p-0 focus:ring-0 placeholder-slate-700 font-bold"
              />
              <button 
                type="button" 
                onClick={handleResetTerminal} 
                title="Restart session"
                className="flex items-center justify-center p-2 rounded border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition active:scale-95 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </section>

        {/* RIGHT COLUMN: LIVE RAM INSPECTOR (`ArrayList<Student>`) (3 cols) */}
        <section className="xl:col-span-3 flex flex-col bg-slate-900/30 border-l border-slate-800 min-h-[400px] xl:h-[calc(100vh-140px)] overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Live Memory State</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              ARRAY_LIST
            </span>
          </div>

          {/* Quick Stats Summary Header */}
          <div className="bg-slate-950 p-6 flex flex-col gap-6 border-b border-slate-800 shrink-0">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Total Records</span>
              <span className="text-5xl font-black text-slate-100 font-sans tracking-tight">{terminalState.students.length}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">DB Connectivity</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-2 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> LOCAL_STORAGE
              </span>
            </div>
          </div>

          {/* Active Students List (Simulates the raw database in memory) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-slate-900/10">
            {terminalState.students.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 px-4 text-slate-500">
                <div className="h-24 w-full border border-dashed border-slate-800 flex items-center justify-center text-center rounded-lg">
                  <span className="text-[10px] text-slate-600 uppercase font-mono leading-tight">
                    ArrayList is Empty<br/>Insert student in terminal
                  </span>
                </div>
              </div>
            ) : (
              terminalState.students.map((student, idx) => {
                // Check if this student is currently being focused/updated/deleted
                const isTarget = terminalState.tempStudent.originalStudent?.studentId === student.studentId ||
                                 terminalState.tempStudent.studentId === student.studentId;
                
                return (
                  <div 
                    key={student.studentId}
                    className={`p-4 border font-mono transition-all duration-300 ${
                      isTarget 
                        ? 'bg-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start border-b border-slate-800/60 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">Student #{idx + 1}</span>
                        <h4 className="text-xs font-black text-slate-200 uppercase">{student.name}</h4>
                      </div>
                      <span className="text-[10px] bg-slate-900 text-emerald-400 px-2 py-0.5 font-bold border border-slate-800">
                        {student.studentId}
                      </span>
                    </div>

                    <div className="mt-2.5 space-y-1.5 text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-[10px] uppercase">Age:</span>
                        <span className="text-slate-300 font-bold">{student.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-[10px] uppercase">Dept:</span>
                        <span className="text-slate-300 font-bold">{student.department}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 border-t border-slate-800/40 pt-1.5 mt-1">
                        <span className="text-slate-600 text-[9px] uppercase">Email:</span>
                        <span className="text-slate-300 truncate font-semibold">{student.email}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Stats Summary Footer */}
          <div className="bg-slate-950 p-4 border-t border-slate-800 shrink-0 text-[10px] font-mono text-slate-500 flex justify-between items-center">
            <span>ALLOCATED RAM:</span>
            <span className="text-emerald-400 font-bold">{(terminalState.students.length * 128) + 256} BYTES</span>
          </div>

        </section>

      </main>

      {/* Footer Status Bar */}
      <footer className="bg-emerald-600 px-4 py-1.5 flex justify-between text-[11px] font-bold text-emerald-950 uppercase tracking-tighter shrink-0 z-40">
        <div className="flex gap-6">
          <span>● Connected</span>
          <span>● UTF-8</span>
          <span>● Active Node</span>
        </div>
        <div className="flex gap-6">
          <span>ConsoleApp.java</span>
          <span>Line 245, Col 12</span>
        </div>
      </footer>

    </div>
  );
}
