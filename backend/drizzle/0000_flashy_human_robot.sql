CREATE TABLE `availability` (
	`id` text PRIMARY KEY NOT NULL,
	`weekly_id` text,
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	`time` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`weekly_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`employee_id` text NOT NULL,
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
CREATE TABLE `friday` (
	`id` text PRIMARY KEY NOT NULL,
	`weeks_id` text NOT NULL,
	`user_id` text NOT NULL,
	`time` text,
	FOREIGN KEY (`weeks_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `monday` (
	`id` text PRIMARY KEY NOT NULL,
	`weeks_id` text NOT NULL,
	`user_id` text NOT NULL,
	`time` text,
	FOREIGN KEY (`weeks_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `saturday` (
	`id` text PRIMARY KEY NOT NULL,
	`weeks_id` text NOT NULL,
	`user_id` text NOT NULL,
	`time` text,
	FOREIGN KEY (`weeks_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sunday` (
	`id` text PRIMARY KEY NOT NULL,
	`weeks_id` text NOT NULL,
	`user_id` text NOT NULL,
	`time` text,
	FOREIGN KEY (`weeks_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `thursday` (
	`id` text PRIMARY KEY NOT NULL,
	`weeks_id` text NOT NULL,
	`user_id` text NOT NULL,
	`time` text,
	FOREIGN KEY (`weeks_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tuesday` (
	`id` text PRIMARY KEY NOT NULL,
	`weeks_id` text NOT NULL,
	`user_id` text NOT NULL,
	`time` text,
	FOREIGN KEY (`weeks_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wednesday` (
	`id` text PRIMARY KEY NOT NULL,
	`weeks_id` text NOT NULL,
	`user_id` text NOT NULL,
	`time` text,
	FOREIGN KEY (`weeks_id`) REFERENCES `weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `weeks` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`monday` text,
	`tuesday` text,
	`wednesday` text,
	`thursday` text,
	`friday` text,
	`saturday` text,
	`sunday` text,
	FOREIGN KEY (`first_name`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monday`) REFERENCES `monday`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tuesday`) REFERENCES `tuesday`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`wednesday`) REFERENCES `wednesday`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`thursday`) REFERENCES `thursday`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`friday`) REFERENCES `friday`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`saturday`) REFERENCES `saturday`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sunday`) REFERENCES `sunday`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `availability_id_unique` ON `availability` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_employee_id_unique` ON `users` (`employee_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `friday_id_unique` ON `friday` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `monday_id_unique` ON `monday` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `saturday_id_unique` ON `saturday` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `sunday_id_unique` ON `sunday` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `thursday_id_unique` ON `thursday` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `tuesday_id_unique` ON `tuesday` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `wednesday_id_unique` ON `wednesday` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `weeks_id_unique` ON `weeks` (`id`);