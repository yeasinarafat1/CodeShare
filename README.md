

# 🚀 CodeShare — Share Code Snippets with Links

CodeShare is a full-stack web application that lets users **create, save, manage, and share code snippets** using public links. Each user has a personal dashboard, and only the owner can edit or delete their snippets.

Built with **Next.js App Router, TypeScript, Tailwind CSS, Clerk authentication, Drizzle ORM, and Neon PostgreSQL**.

---

## ✨ Features

* 🔐 Authentication with **Clerk**
* 🧾 Create, edit, delete code snippets
* 🔗 Share snippets using public links
* 📁 Personal dashboard (`/snippets`)
* 🔖 Saved snippets page (`/saved`)
* 🧠 Monaco-based code editor
* 💾 Database powered by **Neon Postgres + Drizzle ORM**
* ⚡ Server Actions for DB operations
* 🎨 Clean UI with **Tailwind CSS**
* 🚀 Deployed on **Vercel**

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Auth:** Clerk
* **Database:** Neon (PostgreSQL)
* **ORM:** Drizzle
* **Styling:** Tailwind CSS
* **Editor:** Monaco Editor
* **Deployment:** Vercel

---

## 📂 Project Structure (Important Parts)

```txt
codeshare/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── new/                     # Create snippet
│   ├── saved/                   # Saved snippets
│   ├── snippets/                # Snippet routes
│   │   ├── page.tsx             # My snippets
│   │   ├── [id]/page.tsx        # View snippet
│   │   └── edit/[id]/page.tsx   # Edit snippet
│   ├── sign-in/                 # Clerk sign in
│   └── sign-up/                 # Clerk sign up
│
├── components/
│   ├── SnippetEditor.tsx
│   ├── SnippetCard.tsx
│   ├── SnippetActions.tsx
│   ├── EditorWrapper.tsx
│   └── NavBar.tsx
│
├── db/
│   ├── drizzle.ts               # DB connection
│   └── schema.ts                # Tables
│
├── lib/
│   ├── actions/
│   │   ├── snipets.ts           # Server actions (CRUD)
│   │   └── user.ts
│   └── utils.ts
│
├── services/
│   └── snippetService.ts        # Business logic layer
│
├── migrations/                  # Drizzle migrations
└── drizzle.config.ts
```

---

## 🌐 Routes

| Route                 | Description             |
| --------------------- | ----------------------- |
| `/`                   | Landing page            |
| `/snippets`           | Your snippets dashboard |
| `/snippets/[id]`      | View snippet            |
| `/snippets/edit/[id]` | Edit snippet            |
| `/new`                | Create snippet          |
| `/saved`              | Saved snippets          |
| `/sign-in`            | Login                   |
| `/sign-up`            | Register                |

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_***************
CLERK_SECRET_KEY=sk_***************

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up



# Neon Database
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
```

---

## 📦 Installation

```bash
git clone https://github.com/your-username/codeshare.git
cd codeshare
npm install
```

Run dev server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🗄 Database Setup (Drizzle)

Push schema:

```bash
npx drizzle-kit push
```

Or migrate:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---


## 🧠 Data Model (Simplified)

-   `snippets`
    
    -   id
        
    -   slug
        
    -   title
        
    -   code
        
    -   language
        
    -   userId
        
    -   authorName
        
    -   createdAt
        
-   `saved_snippets`
    
    -   id
        
    -   userId
        
    -   snippetId
        
    -   savedAt
        

----------

## 🔁 Core Flow

1. User logs in with **Clerk**
2. Creates snippet in Monaco editor
3. Snippet is stored in **Neon Postgres**
4. A public URL is generated
5. Anyone can view the snippet
6. Only the owner can edit/delete

---

## 🔗 Example Public Link

```
https://codeshare.vercel.app/snippets/FfyPQefi
```

---

## 🚧 Future Improvements

* ⭐ Star / like snippets
* 🔍 Search & filter
* 📂 Folders / collections
* 🌈 Multiple themes
* 🌍 Public explore page

---

## 🧑‍💻 Author

**Yeasin Arafat**

---

## 📜 License

MIT License

