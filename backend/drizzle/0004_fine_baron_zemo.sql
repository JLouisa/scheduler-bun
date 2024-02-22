/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE friday ADD `weekly_id` text;--> statement-breakpoint
ALTER TABLE monday ADD `weekly_id` text;--> statement-breakpoint
ALTER TABLE saturday ADD `weekly_id` text;--> statement-breakpoint
ALTER TABLE sunday ADD `weekly_id` text;--> statement-breakpoint
ALTER TABLE thursday ADD `weekly_id` text;--> statement-breakpoint
ALTER TABLE tuesday ADD `weekly_id` text;--> statement-breakpoint
ALTER TABLE wednesday ADD `weekly_id` text;