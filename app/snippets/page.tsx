// app/snippets/page.tsx (Server Component)
import React from 'react';
import Link from 'next/link';
import { FileCode, Plus, ArrowLeft } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

import { getAllSnippets } from '@/lib/actions/snipets';
import SnipetCard from '@/components/SnipetCard';

const SnippetsPage = async () => {
  // Get current user
  const { userId } = await auth();
  
  // Fetch all snippets for current user
  const result = await getAllSnippets(userId || '');
  const snippets = result.success && result.data ? result.data : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6 group px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
              My Snippets
            </h1>
            <p className="text-gray-400 text-lg">
              {snippets.length} {snippets.length === 1 ? 'snippet' : 'snippets'} in your collection
            </p>
          </div>
          
          <Link
            href="/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Create New Snippet
          </Link>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed text-center">
            <div className="bg-blue-500/10 p-6 rounded-full mb-6">
              <FileCode size={48} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-2">No snippets yet</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Start building your code collection by creating your first snippet.
            </p>
            <Link 
              href="/new" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Create Your First Snippet
            </Link>
          </div>
        ) : (
          snippets.map((snippet) => (
            <SnipetCard key={snippet.id} snippet={snippet} showActions />
          ))
        )}
      </div>
    </div>
  );
};

export default SnippetsPage;