'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileCode, Hash } from 'lucide-react';
import { Snippet } from '../types';
import { getRecentSnippets } from '@/services/snippetService';

const Browse: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getRecentSnippets(50);
        setSnippets(data);
      } catch (error) {
        console.error('Failed to fetch snippets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400 font-medium">Fetching snippets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3">
            Explore Snippets
          </h1>
          <p className="text-gray-400 text-lg">Discover code shared by the community.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed text-center">
            <div className="bg-gray-800/50 p-4 rounded-full mb-4">
              <FileCode size={32} className="text-gray-500" />
            </div>
            <p className="text-xl font-semibold text-gray-300 mb-2">No snippets found</p>
            <p className="text-gray-500 mb-6">Be the first to share your code with the world.</p>
            <Link 
              href="/" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-blue-500/20"
            >
              Create Snippet
            </Link>
          </div>
        ) : (
          snippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/snippet/${snippet.slug}`}
              className="group relative flex flex-col bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:bg-gray-800/60 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                  <FileCode size={24} />
                </div>
                <div className="flex items-center text-xs text-gray-500 font-mono bg-gray-950/50 px-2 py-1 rounded-md border border-white/5">
                  <Hash size={10} className="mr-1" />
                  {snippet.slug}
                </div>
              </div>
              
              <h2 className="text-lg font-semibold text-gray-200 mb-2 line-clamp-1 group-hover:text-white transition-colors">
                {snippet.title}
              </h2>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${getLanguageColor(snippet.language)}`}></div>
                  {snippet.language}
                </span>
                <span className="text-xs opacity-70">
                  {timeAgo(new Date(snippet.createdAt))}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

// Helper for language dot colors
const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    javascript: 'bg-yellow-400',
    typescript: 'bg-blue-400',
    python: 'bg-green-400',
    java: 'bg-orange-400',
    cpp: 'bg-blue-600',
    c: 'bg-gray-400',
    csharp: 'bg-purple-500',
    go: 'bg-cyan-500',
    rust: 'bg-orange-600',
    html: 'bg-red-400',
    css: 'bg-cyan-400',
    json: 'bg-yellow-200',
    sql: 'bg-purple-400',
  };
  return colors[lang.toLowerCase()] || 'bg-gray-400';
};

// Helper for relative time
const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export default Browse;