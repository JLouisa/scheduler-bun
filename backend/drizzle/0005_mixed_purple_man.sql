CREATE TABLE `admin` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `week_plan` (
	`id` text PRIMARY KEY NOT NULL,
	`weekly_id` text NOT NULL,
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	`time` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `friday`;--> statement-breakpoint
DROP TABLE `monday`;--> statement-breakpoint
DROP TABLE `saturday`;--> statement-breakpoint
DROP TABLE `sunday`;--> statement-breakpoint
DROP TABLE `thursday`;--> statement-breakpoint
DROP TABLE `tuesday`;--> statement-breakpoint
DROP TABLE `wednesday`;--> statement-breakpoint
DROP TABLE `weeks`;--> statement-breakpoint
CREATE UNIQUE INDEX `admin_id_unique` ON `admin` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `admin_email_unique` ON `admin` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `week_plan_id_unique` ON `week_plan` (`id`);