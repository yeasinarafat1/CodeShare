// app/page.tsx (Server Component)
import React from 'react';
import Link from 'next/link';
import { FileCode, Plus, Bookmark, Code2 } from 'lucide-react';

import { getAllSnippets, getSavedSnippetsWithDetails } from '@/lib/actions/snipets';
import SnipetCard from '@/components/SnipetCard';
import { getUserId } from '@/lib/actions/user';

const HomePage = async () => {
  const userId = await getUserId();
  
  // Fetch user's own snippets
  const mySnippetsResult = await getAllSnippets(userId.userId || '');
  const mySnippets = mySnippetsResult.success && mySnippetsResult.data ? mySnippetsResult.data : [];
  
  // Fetch saved snippets with full details
  const savedSnippetsResult = await getSavedSnippetsWithDetails();
  const savedSnippets = savedSnippetsResult.success && savedSnippetsResult.data ? savedSnippetsResult.data : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
          Where your ideas take shape.
        </h1>
        <p className="text-gray-400 text-xl mb-8">
          Browse, edit, and share your personal code collection.
        </p>
        <Link 
          href="/new" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
        >
          <Plus size={20} />
          Create New Snippet
        </Link>
      </div>

      {/* My Snippets Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Code2 className="text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">My Snippets</h2>
              <p className="text-gray-400 text-sm">Your personal code collection</p>
            </div>
          </div>
          <Link 
            href="/snippets" 
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mySnippets.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white/5 rounded-2xl border border-white/10 border-dashed">
              <div className="bg-blue-500/10 p-4 rounded-full mb-4">
                <FileCode size={32} className="text-blue-400" />
              </div>
              <p className="text-lg font-semibold text-gray-300 mb-2">No snippets yet</p>
              <p className="text-gray-500 mb-6">Create your first code snippet to get started.</p>
              <Link 
                href="/new" 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                Create Snippet
              </Link>
            </div>
          ) : (
            mySnippets.slice(0, 6).map((snippet) => (
              <SnipetCard key={snippet.id} snippet={snippet} showActions />
            ))
          )}
        </div>
      </div>

      {/* Saved Snippets Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Bookmark className="text-yellow-400" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Saved Snippets</h2>
              <p className="text-gray-400 text-sm">Bookmarks from the community</p>
            </div>
          </div>
          <Link 
            href="/saved" 
            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedSnippets.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white/5 rounded-2xl border border-white/10 border-dashed">
              <div className="bg-yellow-500/10 p-4 rounded-full mb-4">
                <Bookmark size={32} className="text-yellow-400" />
              </div>
              <p className="text-lg font-semibold text-gray-300 mb-2">No saved snippets</p>
              <p className="text-gray-500 mb-6">Explore and save snippets from the community.</p>
              <Link 
                href="/explore" 
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-medium transition-colors"
              >
                Explore Snippets
              </Link>
            </div>
          ) : (
            savedSnippets.slice(0, 6).map((snippet) => (
              <SnipetCard key={snippet.id} snippet={snippet} showActions={false} showUnsave={true} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;