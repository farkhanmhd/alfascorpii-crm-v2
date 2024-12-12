ALTER TABLE `Persons` RENAME COLUMN `city` TO `city_or_regency`;--> statement-breakpoint
ALTER TABLE `Persons` ADD CONSTRAINT `Persons_phone_number_unique` UNIQUE(`phone_number`);--> statement-breakpoint
ALTER TABLE `Persons` ADD CONSTRAINT `Persons_whatsapp_unique` UNIQUE(`whatsapp`);