// app/snippets/[id]/page.tsx (Server Component)
import React from 'react';
import Link from 'next/link';
import { Clock, Code, ArrowLeft, AlertCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

import EditorWrapper from '@/components/EditorWrapper';
import { getSnippetBySlug } from '@/lib/actions/snipets';
import SnippetActions from '@/components/SnippetActions';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ViewSnippetPage = async ({ params }: PageProps) => {
  const { id: slug } = await params;
  
  // Fetch snippet on server
  const result = await getSnippetBySlug(slug);
  
  // If snippet not found, show 404
  if (!result.success || !result.data) {
    notFound();
  }
  
  const snippet = result.data;

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
            <p className='text-gray-400'><span className='font-semibold'>Author:</span> {snippet.author_name}</p>
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

          <SnippetActions snippet={snippet} />
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

export default ViewSnippetPage;