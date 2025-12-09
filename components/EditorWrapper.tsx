'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Copy, Check } from 'lucide-react';
import type { OnMount } from '@monaco-editor/react';
import { SupportedLanguage } from '../app/types';

// Dynamically import Monaco Editor with SSR disabled
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-gray-400 bg-[#1e1e1e]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Loading Editor...</span>
      </div>
    </div>
  ),
});

interface EditorWrapperProps {
  code: string;
  language: SupportedLanguage;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  height?: string;
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({ 
  code, 
  language, 
  onChange, 
  readOnly = false,
  height = "70vh"
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.updateOptions({
      fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
      fontLigatures: true,
      scrollBeyondLastLine: false,
      minimap: { enabled: false }, // Cleaner look without minimap by default
      smoothScrolling: true,
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
      padding: { top: 16, bottom: 16 },
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="group rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e] ring-1 ring-white/5">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors" />
        </div>
        <div className="text-xs text-gray-400 font-mono opacity-60">
          {language}
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
          title="Copy Code"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="relative">
        <Editor
          height={height}
          language={language}
          value={code}
          theme="vs-dark"
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly,
            fontSize: 14,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            automaticLayout: true,
            contextmenu: !readOnly,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
            },
          }}
        />
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"></div>
      </div>
    </div>
  );
};

export default EditorWrapper;