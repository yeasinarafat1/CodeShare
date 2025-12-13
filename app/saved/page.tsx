// app/saved/page.tsx (Server Component)
import React from 'react';
import Link from 'next/link';
import { Bookmark, ArrowLeft, Search } from 'lucide-react';

import { getSavedSnippetsWithDetails } from '@/lib/actions/snipets';
import SnipetCard from '@/components/SnipetCard';

const SavedSnippetsPage = async () => {
  // Fetch all saved snippets
  const result = await getSavedSnippetsWithDetails();
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
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Bookmark className="text-yellow-400" size={28} />
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Saved Snippets
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              {snippets.length} {snippets.length === 1 ? 'snippet' : 'snippets'} bookmarked from the community
            </p>
          </div>
          
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-yellow-500/25 transform hover:-translate-y-0.5"
          >
            <Search size={20} />
            Explore More
          </Link>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed text-center">
            <div className="bg-yellow-500/10 p-6 rounded-full mb-6">
              <Bookmark size={48} className="text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-2">No saved snippets yet</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Discover and save code snippets from the community to quickly access them later.
            </p>
            <Link 
              href="/explore" 
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-yellow-500/25"
            >
              Explore Community Snippets
            </Link>
          </div>
        ) : (
          snippets.map((snippet) => (
            <SnipetCard key={snippet.id} snippet={snippet} showActions={false} />
          ))
        )}
      </div>
    </div>
  );
};

export default SavedSnippetsPage;