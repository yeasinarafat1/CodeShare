// app/snippets/[id]/edit/page.tsx (Server Component)
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import SnippetEditor from '@/components/SnippetEditor';
import { getSnippetBySlug } from '@/lib/actions/snipets';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditSnippetPage = async ({ params }: PageProps) => {
  const { id: slug } = await params;
  const { userId } = await auth();
  
  // Fetch snippet
  const result = await getSnippetBySlug(slug);
  
  if (!result.success || !result.data) {
    notFound();
  }
  
  const snippet = result.data;
  
  // Check if user owns this snippet
  if (snippet.user_id !== userId) {
    redirect(`/snippets/${slug}`); // Redirect to view page if not owner
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href={`/snippets/${slug}`}
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4 group px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Snippet
        </Link>
        
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Edit Snippet
        </h1>
      </div>

      <SnippetEditor userId={userId} snippet={snippet} isEditing={true} />
    </div>
  );
};

export default EditSnippetPage;