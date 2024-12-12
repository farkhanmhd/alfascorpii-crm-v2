CREATE TABLE `Customers` (
	`id` varchar(64) NOT NULL,
	`person_id` varchar(64) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `Customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `Customers_person_id_unique` UNIQUE(`person_id`)
);
--> statement-breakpoint
CREATE TABLE `Persons` (
	`id` varchar(64) NOT NULL,
	`nik` varchar(16) NOT NULL,
	`name` varchar(255) NOT NULL,
	`date_of_birth` date NOT NULL,
	`phone_number` varchar(16) NOT NULL,
	`address` varchar(255) NOT NULL,
	`email` varchar(255),
	`whatsapp` varchar(16),
	`instagram` varchar(255),
	`facebook` varchar(255),
	`sub_district` varchar(255),
	`district` varchar(255),
	`city` varchar(255),
	`province` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `Persons_id` PRIMARY KEY(`id`),
	CONSTRAINT `Persons_nik_unique` UNIQUE(`nik`)
);
--> statement-breakpoint
ALTER TABLE `Users` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `Customers` ADD CONSTRAINT `Customers_person_id_Persons_id_fk` FOREIGN KEY (`person_id`) REFERENCES `Persons`(`id`) ON DELETE no action ON UPDATE no action;