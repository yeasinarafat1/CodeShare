export enum SupportedLanguage {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  // JSX = 'jsx', // New
  // TSX = 'tsx', // New
  PYTHON = 'python',
  JAVA = 'java',
  CPP = 'cpp',
  C = 'c',
  CSHARP = 'csharp',
  HTML = 'html',
  CSS = 'css',
  JSON = 'json',
  SQL = 'sql',
  GO = 'go',
  RUST = 'rust'
}

export interface Snippet {
  id: string;
  slug: string;
  title: string;
  language: SupportedLanguage;
  code: string;
  createdAt: string; // ISO Date string
}

export interface CreateSnippetDTO {
  title: string;
  language: SupportedLanguage;
  code: string;
}