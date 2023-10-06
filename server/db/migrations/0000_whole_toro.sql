CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`created_by` integer NOT NULL,
	`market` text DEFAULT 'Mercadona' NOT NULL,
	`price` integer DEFAULT 0 NOT NULL,
	`created_at` text(30) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`email` text(256) NOT NULL,
	`phone` text(256),
	`address` text(256),
	`default_market` text,
	`password` text(256) NOT NULL,
	`created_at` text(256) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `userProduct` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`in_stock` integer NOT NULL,
	`desired_amount` integer NOT NULL,
	`created_at` text(256) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_products_name_market` ON `products` (`name`,`market`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_idx` ON `userProduct` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_id_idx` ON `userProduct` (`product_id`);