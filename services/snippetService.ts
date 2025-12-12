import {  CreateSnippetDTO, SupportedLanguage } from '@/app/types';
import { Snippet } from '@/db/schema';
import { createSnippet as createSnippetAction } from "@/lib/actions/snipets"; // Adjust path






export const createSnippet = async (data: CreateSnippetDTO): Promise<Snippet> => {
  // Ensure title isn't empty
  const title = data.title.trim() || 'Untitled Snippet';
  
  // Call server action to save to database
  const result = await createSnippetAction({
    title,
    language: data.language,
    code: data.code,
  });
  
  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to create snippet");
  }
  
  return result.data;
};


