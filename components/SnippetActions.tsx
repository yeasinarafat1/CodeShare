// components/SnippetActions.tsx (Client Component)
'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, Download, Save, BookmarkCheck } from 'lucide-react';
import { Snippet } from '@/db/schema';
import { getFileExtension } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { saved_snippet, remove_saved_snippet } from '@/lib/actions/snipets';

interface SnippetActionsProps {
  snippet: Snippet;
  currentUserId?: string | null;
  isOwner: boolean;
  isSaved: boolean;
}

const SnippetActions: React.FC<SnippetActionsProps> = ({ snippet, currentUserId, isOwner, isSaved: initialIsSaved }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const handleCopyUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([snippet.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    
    // Sanitize title for filename, fallback to slug or default
    const safeTitle = snippet.title.trim().replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
    const filename = safeTitle || snippet.slug || 'snippet';
    const ext = getFileExtension(snippet.language);
    
    element.download = `${filename}.${ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  const handleToggleSave = async () => {
    setIsSaving(true);
    try {
      if (isSaved) {
        // Remove from saved
        const result = await remove_saved_snippet(snippet.slug);
        if (result.success) {
          setIsSaved(false);
          router.refresh();
        } else {
          alert(result.error || 'Failed to remove snippet');
        }
      } else {
        // Save snippet
        const result = await saved_snippet(snippet.slug);
        if (result.success) {
          setIsSaved(true);
          router.refresh();
        } else {
          alert(result.error || 'Failed to save snippet');
        }
      }
    } catch (error) {
      console.error('Failed to toggle save:', error);
      alert('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const showSaveButton = currentUserId && !isOwner;

  return (
    <div className="flex flex-wrap gap-3">
      {showSaveButton && (
        <button
          onClick={handleToggleSave}
          disabled={isSaving}
          className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all border disabled:opacity-50 ${
            isSaved
              ? 'border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300'
              : 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300'
          }`}
        >
          {isSaved ? <BookmarkCheck size={18} /> : <Save size={18} />}
          <span>
            {isSaving ? (isSaved ? 'Removing...' : 'Saving...') : (isSaved ? 'Saved' : 'Save')}
          </span>
        </button>
      )}

      <button
        onClick={handleDownload}
        className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all border border-white/10 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white hover:border-white/20"
      >
        <Download size={18} />
        <span>Download</span>
      </button>

      <button
        onClick={handleCopyUrl}
        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all border shadow-lg ${
          copied 
            ? 'bg-green-500/10 border-green-500/50 text-green-400' 
            : 'bg-blue-600 hover:bg-blue-500 border-transparent text-white hover:shadow-blue-500/25'
        }`}
      >
        {copied ? <Check size={18} /> : <Share2 size={18} />}
        <span>{copied ? 'Link Copied!' : 'Share Snippet'}</span>
      </button>
    </div>
  );
};

export default SnippetActions;