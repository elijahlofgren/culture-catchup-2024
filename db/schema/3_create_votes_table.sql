CREATE TABLE `votes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `movie_id` INT NOT NULL,
    `up_vote` BOOLEAN NOT NULL,
    `down_vote` BOOLEAN NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);