"use server";

import { db } from "@/db/drizzle"; // Adjust path to your db connection file
import { SavedSnippets, snippets } from "@/db/schema"; // Adjust path to your schema file
import { revalidatePath } from "next/cache";
import { generateSlug } from "../utils";
import { getUserDetails, getUserId } from "./user";

// Define the type for supported languages (must match your schema enum)
type SupportedLanguage = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'c'
  | 'csharp'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'swift'
  | 'kotlin'
  | 'html'
  | 'css'
  | 'sql'
  | 'bash'
  | 'json'
  | 'markdown'
  | 'yaml';

// Generate a random slug


// Server action to create a new snippet
export async function createSnippet(formData: {
  title: string;
  language: SupportedLanguage;
  code: string;
}) {
  try {
    // Validate input
    if (!formData.title || !formData.language || !formData.code) {
      return { success: false, error: "All fields are required" };
    }

    // Generate unique slug
    const slug = generateSlug();
    const data = await getUserDetails();

    // Ensure we have an authenticated user (user.userId must be a string)
    if (!data?.success) {
      return { success: false, error: "Not authenticated" };
    }
    const user=data.user
    // Insert into database
    const [newSnippet] = await db.insert(snippets).values({
      slug,
      user_id: user.id,
      author_name:user.fullName,
      title: formData.title,
      language: formData.language,
      code: formData.code,
    }).returning();

    // Revalidate the path to show updated data
    revalidatePath("/snippets"); // Adjust to your route

    return { success: true, data: newSnippet };
  } catch (error) {
    console.error("Error creating snippet:", error);
    return { success: false, error: "Failed to create snippet" };
  }
}

// Server action to get snippet by slug
export async function getSnippetBySlug(slug: string) {
  try {
    const { eq } = await import("drizzle-orm");
    const [snippet] = await db.select().from(snippets).where(eq(snippets.slug, slug));
    
    if (!snippet) {
      return { success: false, error: "Snippet not found" };
    }
    
    return { success: true, data: snippet };
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return { success: false, error: "Failed to fetch snippet" };
  }
}

// Optional: Server action to get all snippets
export async function getAllSnippets(userId:string) {
  const { eq } = await import("drizzle-orm");
  try {
    const allSnippets = await db.select().from(snippets).where(eq(snippets.user_id, userId)).orderBy(snippets.createdAt);
    return { success: true, data: allSnippets };
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return { success: false, error: "Failed to fetch snippets" };
  }
}

// Optional: Server action to delete a snippet
export async function deleteSnippet(id: string) {
  try {
    const { eq } = await import("drizzle-orm");
    await db.delete(snippets).where(eq(snippets.id, id));
    revalidatePath("/snippets");
    return { success: true };
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return { success: false, error: "Failed to delete snippet" };
  }
}

// Server action to update a snippet
export async function updateSnippet(
  id: string,
  data: {
    title?: string;
    language?: SupportedLanguage;
    code?: string;
  }
) {
  try {
    const { eq } = await import("drizzle-orm");
    const [updatedSnippet] = await db
      .update(snippets)
      .set(data)
      .where(eq(snippets.id, id))
      .returning();

    if (!updatedSnippet) {
      return { success: false, error: "Snippet not found" };
    }

    revalidatePath(`/snippet/${updatedSnippet.slug}`);
    revalidatePath("/snippets");
    return { success: true, data: updatedSnippet };
  } catch (error) {
    console.error("Error updating snippet:", error);
    return { success: false, error: "Failed to update snippet" };
  }
}

export const saved_snippet=async(slug:string)=>{
  try {
    const userId=await getUserId();
    const [newSavedSnippet] = await db.insert(SavedSnippets).values({
      user_id: userId.userId || '',
      slug,
    }).returning();
    return { success: true, data: newSavedSnippet };
  } catch (error) {
    console.error("Error saving snippet:", error);
    return { success: false, error: "Failed to save snippet" };
  }
}
export const remove_saved_snippet=async(snippet_id:string)=>{
  try {
    const userId=await getUserId();
    const { eq,and } = await import("drizzle-orm");
    await db.delete(SavedSnippets).where(and(
      eq(SavedSnippets.slug, snippet_id),
      eq(SavedSnippets.user_id, userId.userId || ''),
    ));
    return { success: true };
  } catch (error) {
    console.error("Error removing saved snippet:", error);
    return { success: false, error: "Failed to remove saved snippet" };
  }
}
export async function checkIfSnippetSaved(slug: string) {
  try {
    const userId = await getUserId();
    const { eq, and } = await import("drizzle-orm");
    const [savedSnippet] = await db.select().from(SavedSnippets).where(and(
      eq(SavedSnippets.slug, slug),
      eq(SavedSnippets.user_id, userId.userId || ''),
    ));
    return { isSaved: !!savedSnippet };
  }
  catch (error) {
    console.error("Error checking if snippet is saved:", error);
    return { isSaved: false };
  }
}
// Server action to get saved snippets for current user
export async function getSavedSnippets() {
  try {
    const userId = await getUserId();
    const { eq, and } = await import("drizzle-orm");
    const savedSnippets = await db.select().from(SavedSnippets).where(and(
     
      eq(SavedSnippets.user_id, userId.userId || ''),
    ));
    return { success: true, data: savedSnippets };
  } catch (error) {
    console.error("Error fetching saved snippets:", error);
    return { success: false, error: "Failed to fetch saved snippets" };
  }
}

export async function getSavedSnippetsWithDetails() {
  try {
    const userId = await getUserId();
    const { eq, and, desc } = await import("drizzle-orm");
    
    const savedSnippets = await db.select({
      snippet: snippets,
    })
    .from(SavedSnippets)
    .innerJoin(
      snippets,
      eq(SavedSnippets.slug, snippets.slug) // Join on ID, not slug
    )
    .where(eq(SavedSnippets.user_id, userId.userId || ''))
    .orderBy(desc(SavedSnippets.savedAt)); // Optional: order by save date
    
    return { success: true, data: savedSnippets.map(item => item.snippet) };
  } catch (error) {
    console.error("Error fetching saved snippets:", error);
    return { success: false, error: "Failed to fetch saved snippets" };
  }
}