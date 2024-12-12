CREATE TABLE `Users` (
	`id` varchar(64) NOT NULL,
	`nip` varchar(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` enum('Admin','Manager','Leader','CRO') NOT NULL,
	`status` enum('Active','Inactive') NOT NULL,
	`username` varchar(16) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `Users_nip_unique` UNIQUE(`nip`),
	CONSTRAINT `Users_username_unique` UNIQUE(`username`)
);
