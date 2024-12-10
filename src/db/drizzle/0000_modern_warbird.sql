CREATE TABLE `users` (
	`id` varchar(100) NOT NULL,
	`username` varchar(255) NOT NULL,
	`nip` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('Admin','Manager','Leader','CRO'),
	`status` enum('Active','Inactive'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_nip_unique` UNIQUE(`nip`)
);
