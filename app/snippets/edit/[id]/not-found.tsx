// app/snippets/[id]/not-found.tsx
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] items-center justify-center text-center px-4">
      <div className="bg-red-500/10 p-6 rounded-full mb-6">
        <AlertCircle size={48} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Snippet Not Found</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        The snippet you are looking for does not exist or has been removed.
      </p>
      <Link 
        href="/" 
        className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-colors shadow-lg shadow-white/10"
      >
        Create New Snippet
      </Link>
    </div>
  );
}