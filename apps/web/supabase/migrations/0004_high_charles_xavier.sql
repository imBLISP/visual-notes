DROP TABLE "blocks_blocks";--> statement-breakpoint
DROP TABLE "workspaces_blocks";--> statement-breakpoint
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_parent_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "content" uuid[] DEFAULT ARRAY[]::uuid[] NOT NULL;