/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE weeks ADD `weeklyId` text;--> statement-breakpoint
ALTER TABLE `friday` DROP COLUMN `weeks_id`;--> statement-breakpoint
ALTER TABLE `monday` DROP COLUMN `weeks_id`;--> statement-breakpoint
ALTER TABLE `saturday` DROP COLUMN `weeks_id`;--> statement-breakpoint
ALTER TABLE `sunday` DROP COLUMN `weeks_id`;--> statement-breakpoint
ALTER TABLE `thursday` DROP COLUMN `weeks_id`;--> statement-breakpoint
ALTER TABLE `tuesday` DROP COLUMN `weeks_id`;--> statement-breakpoint
ALTER TABLE `wednesday` DROP COLUMN `weeks_id`;