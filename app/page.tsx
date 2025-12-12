// app/snippets/page.tsx (Server Component)
import React from 'react';
import Link from 'next/link';
import { FileCode } from 'lucide-react';

import { getAllSnippets } from '@/lib/actions/snipets';
import SnipetCard from '@/components/SnipetCard';
import { getUserId } from '@/lib/actions/user';

const SnippetsPage = async () => {
  // Fetch data directly in server component
  const userId=await getUserId();
  const result = await getAllSnippets(userId.userId || '');
  const snippets = result.success && result.data ? result.data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3">
           Where your ideas take shape.
          </h1>
          <p className="text-gray-400 text-lg">Browse, edit, and share your personal code collection.</p>
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
              href="/new" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-blue-500/20"
            >
              Create Snippet
            </Link>
          </div>
        ) : (
          snippets.map((snippet) => (
            <SnipetCard key={snippet.id} snippet={snippet} showActions/>
          ))
        )}
      </div>
    </div>
  );
};

export default SnippetsPage;