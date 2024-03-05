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
CREATE TABLE `availability` (
	`id` text PRIMARY KEY NOT NULL,
	`weekly_id` text,
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	`time` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`employee_id` integer NOT NULL,
	`vast` integer DEFAULT false NOT NULL,
	`admin` integer DEFAULT false NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`min_days` integer NOT NULL,
	`max_days` integer NOT NULL,
	`primary_role` text NOT NULL,
	`secondary_role` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `week_plan` (
	`id` text PRIMARY KEY NOT NULL,
	`weekly_id` text NOT NULL,
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	`time` text NOT NULL,
	FOREIGN KEY (`weekly_id`) REFERENCES `week_status`(`weekly_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `week_status` (
	`id` text PRIMARY KEY NOT NULL,
	`weekly_id` text NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_id_unique` ON `admin` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `admin_email_unique` ON `admin` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `availability_id_unique` ON `availability` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_employee_id_unique` ON `users` (`employee_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `week_plan_id_unique` ON `week_plan` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `week_status_id_unique` ON `week_status` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `week_status_weekly_id_unique` ON `week_status` (`weekly_id`);