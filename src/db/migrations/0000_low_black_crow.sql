CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`recipe_id` integer NOT NULL,
	`title` text NOT NULL,
	`image` text,
	`cook_time` text,
	`servings` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);