ALTER TABLE "saved_snippets" RENAME COLUMN "snippet_id" TO "slug";--> statement-breakpoint
ALTER TABLE "saved_snippets" DROP CONSTRAINT "saved_snippets_snippet_id_snippets_id_fk";
--> statement-breakpoint
ALTER TABLE "saved_snippets" ADD CONSTRAINT "saved_snippets_slug_snippets_slug_fk" FOREIGN KEY ("slug") REFERENCES "public"."snippets"("slug") ON DELETE no action ON UPDATE no action;