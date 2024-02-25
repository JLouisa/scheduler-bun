ALTER TABLE `weekStatus` RENAME TO `week_status`;--> statement-breakpoint
DROP INDEX IF EXISTS `weekStatus_id_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `weekStatus_weekly_id_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `week_status_id_unique` ON `week_status` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `week_status_weekly_id_unique` ON `week_status` (`weekly_id`);