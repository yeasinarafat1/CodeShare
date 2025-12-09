import { Snippet, CreateSnippetDTO, SupportedLanguage } from '@/app/types';

const STORAGE_KEY = 'codeshare_db_v1';

// Helper to generate a random slug
const generateSlug = (length = 8): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Simulate database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStore = (): Snippet[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load snippets", e);
    return [];
  }
};

const saveStore = (snippets: Snippet[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
};

export const createSnippet = async (data: CreateSnippetDTO): Promise<Snippet> => {
  await delay(600); // Simulate network latency

  const snippets = getStore();
  
  // Ensure title isn't empty
  const title = data.title.trim() || 'Untitled Snippet';
  
  const newSnippet: Snippet = {
    id: crypto.randomUUID(),
    slug: generateSlug(),
    title,
    language: data.language,
    code: data.code,
    createdAt: new Date().toISOString(),
  };

  snippets.unshift(newSnippet); // Add to beginning
  saveStore(snippets);
  
  return newSnippet;
};

export const getSnippetBySlug = async (slug: string): Promise<Snippet | null> => {
  await delay(300);
  const snippets = getStore();
  return snippets.find(s => s.slug === slug) || null;
};

export const getRecentSnippets = async (limit = 20): Promise<Snippet[]> => {
  await delay(300);
  const snippets = getStore();
  // Sort by createdAt descending just to be safe, though we unshift on create
  return snippets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};