'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Code, Type } from 'lucide-react';
import EditorWrapper from '../components/EditorWrapper';
import { SupportedLanguage } from '@/app/types';
import { createSnippet } from '../services/snippetService';

const LANGUAGE_SNIPPETS: Record<SupportedLanguage, string> = {
  [SupportedLanguage.JAVASCRIPT]: `// JavaScript Example
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`,

  [SupportedLanguage.TYPESCRIPT]: `// TypeScript Example
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: 'Alice'
};

console.log(user);`,

  [SupportedLanguage.PYTHON]: `# Python Example
def main():
    name = "World"
    print(f"Hello, {name}!")

if __name__ == "__main__":
    main()`,

  [SupportedLanguage.JAVA]: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

  [SupportedLanguage.CPP]: `// C++ Example
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> msg = {"Hello", "C++", "World", "!"};
    
    for (const auto& word : msg) {
        std::cout << word << " ";
    }
    std::cout << std::endl;
    return 0;
}`,

  [SupportedLanguage.C]: `// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  [SupportedLanguage.CSHARP]: `// C# Example
using System;

namespace HelloWorld {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, World!");
        }
    }
}`,

  [SupportedLanguage.GO]: `// Go Example
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,

  [SupportedLanguage.RUST]: `// Rust Example
fn main() {
    println!("Hello, world!");
}`,

  [SupportedLanguage.HTML]: `<!-- HTML Example -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,

  [SupportedLanguage.CSS]: `/* CSS Example */
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    text-align: center;
}`,

  [SupportedLanguage.JSON]: `{
  "message": "Hello, World!",
  "status": 200,
  "data": {
    "items": [1, 2, 3]
  }
}`,

  [SupportedLanguage.SQL]: `-- SQL Example
SELECT id, name, email 
FROM users 
WHERE created_at > '2023-01-01'
ORDER BY name ASC;`
};

const Home: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<SupportedLanguage>(SupportedLanguage.JAVASCRIPT);
  const [code, setCode] = useState(LANGUAGE_SNIPPETS[SupportedLanguage.JAVASCRIPT]);
  const [isSaving, setIsSaving] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguage;
    if (code === LANGUAGE_SNIPPETS[language] || code.trim() === '') {
      setCode(LANGUAGE_SNIPPETS[newLang]);
    }
    setLanguage(newLang);
  };

  const handleSave = async () => {
    if (!code.trim()) return;

    setIsSaving(true);
    try {
      const snippet = await createSnippet({
        title,
        language,
        code
      });
      router.push(`/snippet/${snippet.slug}`);
    } catch (error) {
      console.error("Failed to save", error);
      alert("Failed to save snippet. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header / Inputs */}
      <div className="mb-6 p-1 bg-white/5 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
              <Type size={18} />
            </div>
            <input
              type="text"
              placeholder="Snippet Title (e.g., Auth Middleware)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900/50 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-gray-900 outline-none transition-all placeholder-gray-500 font-medium"
            />
          </div>

          <div className="w-full md:w-64 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
              <Code size={18} />
            </div>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full bg-gray-900/50 border border-white/10 text-white rounded-xl py-3 pl-10 pr-10 appearance-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-gray-900 outline-none cursor-pointer transition-all font-medium"
            >
              {Object.values(SupportedLanguage).map((lang) => (
                <option key={lang} value={lang} className="bg-gray-900">
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <EditorWrapper
            code={code}
            language={language}
            onChange={(val) => setCode(val || '')}
            height="65vh"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving || !code.trim()}
          className={`flex items-center space-x-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0
            ${isSaving || !code.trim() 
              ? 'bg-gray-700 cursor-not-allowed opacity-50' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25 ring-1 ring-white/20'
            }`}
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          <span>{isSaving ? 'Saving...' : 'Save & Share Snippet'}</span>
        </button>
      </div>
    </div>
  );
};

export default Home;