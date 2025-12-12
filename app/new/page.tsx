// app/page.tsx (Server Component)
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import SnippetEditor from '@/components/SnippetEditor';

const HomePage = async () => {
  // Get user authentication on server
  const { userId } = await auth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SnippetEditor userId={userId} />
    </div>
  );
};

export default HomePage;