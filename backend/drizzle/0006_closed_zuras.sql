CREATE TABLE `weekStatus` (
	`id` text PRIMARY KEY NOT NULL,
	`weekly_id` text NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `weekStatus_id_unique` ON `weekStatus` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `weekStatus_weekly_id_unique` ON `weekStatus` (`weekly_id`);