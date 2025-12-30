// app/snippets/[id]/page.tsx
import React from 'react';
import Link from 'next/link';
import { Clock, Code, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next'; // 1. Import Metadata type

import EditorWrapper from '@/components/EditorWrapper';
import { getSnippetBySlug, checkIfSnippetSaved } from '@/lib/actions/snipets';
import SnippetActions from '@/components/SnippetActions';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 2. Add generateMetadata to handle SEO and Social Share previews
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  // Use the same fetch function (Next.js dedupes this automatically)
  const result = await getSnippetBySlug(id);

  if (!result.success || !result.data) {
    return {
      title: 'Snippet not found',
    };
  }

  const snippet = result.data;

  return {
    title: snippet.title,
    description: `View this ${snippet.language} code snippet created by ${snippet.author_name}`,
    openGraph: {
      title: snippet.title,
      description: `Programming Language: ${snippet.language} | Author: ${snippet.author_name}`,
      // If you add an opengraph-image.tsx later, it will automatically append here
    },
  };
}

const ViewSnippetPage = async ({ params }: PageProps) => {
  const { id: slug } = await params;
  
  const { userId } = await auth();
  
  const result = await getSnippetBySlug(slug);
  
  if (!result.success || !result.data) {
    notFound();
  }
  
  const snippet = result.data;
  const isOwner = userId === snippet.user_id;
  
  let isSaved = false;
  if (userId && !isOwner) {
    const savedResult = await checkIfSnippetSaved(snippet.id);
    isSaved = savedResult.isSaved;
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

          <SnippetActions 
            snippet={snippet} 
            currentUserId={userId}
            isOwner={isOwner}
            isSaved={isSaved}
          />
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