import { SupportedLanguage } from "@/app/types";

export const LANGUAGE_SNIPPETS: Record<SupportedLanguage, string> = {
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