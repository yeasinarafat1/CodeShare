'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Copy, Check, Clock, Code, ArrowLeft, AlertCircle, Share2, Download } from 'lucide-react';
import EditorWrapper from '@/components/EditorWrapper';
import { Snippet } from '@/app/types';
import { getSnippetBySlug } from '@/services/snippetService';

const ViewSnippet: React.FC = () => {
  const params = useParams();
  const slug = params?.id as string;
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      if (slug) {
        try {
          const data = await getSnippetBySlug(slug);
          setSnippet(data);
        } catch (error) {
          console.error('Failed to fetch snippet:', error);
        }
      }
      setLoading(false);
    };
    fetchSnippet();
  }, [slug]);

  const handleCopyUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const getFileExtension = (language: string) => {
    const map: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      csharp: 'cs',
      html: 'html',
      css: 'css',
      json: 'json',
      sql: 'sql',
      go: 'go',
      rust: 'rs'
    };
    return map[language] || 'txt';
  };

  const handleDownload = () => {
    if (!snippet) return;
    
    const element = document.createElement("a");
    const file = new Blob([snippet.code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    
    // Sanitize title for filename, fallback to slug or default
    const safeTitle = snippet.title.trim().replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
    const filename = safeTitle || snippet.slug || 'snippet';
    const ext = getFileExtension(snippet.language);
    
    element.download = `${filename}.${ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Loading code...</p>
        </div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)] items-center justify-center text-center px-4">
        <div className="bg-red-500/10 p-6 rounded-full mb-6">
          <AlertCircle size={48} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Snippet Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">The snippet you are looking for does not exist or has been removed.</p>
        <Link href="/" className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-colors shadow-lg shadow-white/10">
          Create New Snippet
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6 group px-3 py-1.5 rounded-lg hover:bg-white/5">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Editor
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">{snippet.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Code size={14} className="mr-2 text-blue-400" />
                <span className="capitalize font-medium text-gray-200">{snippet.language}</span>
              </div>
              <div className="flex items-center px-2">
                <Clock size={14} className="mr-2 opacity-70" />
                <span>{new Date(snippet.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all border border-white/10 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white hover:border-white/20"
            >
              <Download size={18} />
              <span>Download</span>
            </button>

            <button
              onClick={handleCopyUrl}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all border shadow-lg ${
                copied 
                  ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                  : 'bg-blue-600 hover:bg-blue-500 border-transparent text-white hover:shadow-blue-500/25'
              }`}
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              <span>{copied ? 'Link Copied!' : 'Share Snippet'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        <div className="relative">
          <EditorWrapper
            code={snippet.code}
            language={snippet.language}
            readOnly={true}
            height="70vh"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewSnippet;