export const generateSlug = (length = 8): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
export const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    javascript: 'bg-yellow-400',
    typescript: 'bg-blue-400',
    python: 'bg-green-400',
    java: 'bg-orange-400',
    cpp: 'bg-blue-600',
    c: 'bg-gray-400',
    csharp: 'bg-purple-500',
    go: 'bg-cyan-500',
    rust: 'bg-orange-600',
    html: 'bg-red-400',
    css: 'bg-cyan-400',
    json: 'bg-yellow-200',
    sql: 'bg-purple-400',
  };
  return colors[lang.toLowerCase()] || 'bg-gray-400';
};

// Helper for relative time
export const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const getFileExtension = (language: string) => {
    const map: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      csharp: 'cs',
      html: 'html',
      css: 'css',
      json: 'json',
      sql: 'sql',
      go: 'go',
      rust: 'rs'
    };
    return map[language] || 'txt';
  };
