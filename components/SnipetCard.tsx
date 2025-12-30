'use client';

import { Snippet } from '@/db/schema';
import { deleteSnippet, remove_saved_snippet } from '@/lib/actions/snipets';
import { getLanguageColor, timeAgo } from '@/lib/utils';
import { FileCode, Hash, Edit2, Trash2, AlertTriangle, BookmarkX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SnippetCardProps {
  snippet: Snippet;
  showActions?: boolean;
  showUnsave?: boolean; // New prop for saved snippets
}

const SnippetCard = ({ snippet, showActions = false, showUnsave = false }: SnippetCardProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      let result;
      if (showUnsave) {
        // Unsave the snippet
        result = await remove_saved_snippet(snippet.id);
      } else {
        // Delete the snippet
        result = await deleteSnippet(snippet.id);
      }
      
      if (result.success) {
        setShowDeleteDialog(false);
        router.refresh();
      } else {
        alert(result.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Failed to perform action:', error);
      alert('An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowDeleteDialog(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/snippets/edit/${snippet.slug}`);
  };

  return (
    <>
      <Link
        href={`/snippets/${snippet.slug}`}
        className="group relative flex flex-col bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:bg-gray-800/60 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
            <FileCode size={24} />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs text-gray-500 font-mono bg-gray-950/50 px-2 py-1 rounded-md border border-white/5">
              <Hash size={10} className="mr-1" />
              {snippet.slug}
            </div>
            
            {showActions && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleEdit}
                  className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-md transition-colors"
                  title="Edit snippet"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors disabled:opacity-50"
                  title="Delete snippet"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
            
            {showUnsave && (
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="p-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 rounded-md transition-colors disabled:opacity-50"
                title="Remove from saved"
              >
                <BookmarkX size={14} />
              </button>
            )}
          </div>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-200 mb-2 line-clamp-1 group-hover:text-white transition-colors">
          {snippet.title}
        </h2>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${getLanguageColor(snippet.language)}`}></div>
            {snippet.language}
          </span>
          <span className="text-xs opacity-70">
            {timeAgo(new Date(snippet.createdAt))}
          </span>
        </div>
      </Link>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={handleCancelDelete}
        >
          <div 
            className="bg-gray-900 border border-red-500/20 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Delete Snippet</h3>
            </div>
            
            <p className="text-gray-300 mb-2">
              Are you sure you want to delete <span className="font-semibold text-white">"{snippet.title}"</span>?
            </p>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors border border-gray-700"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className={`flex-1 px-4 py-2.5 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  showUnsave 
                    ? 'bg-yellow-600 hover:bg-yellow-500' 
                    : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {isDeleting ? (showUnsave ? 'Removing...' : 'Deleting...') : (showUnsave ? 'Remove' : 'Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SnippetCard;