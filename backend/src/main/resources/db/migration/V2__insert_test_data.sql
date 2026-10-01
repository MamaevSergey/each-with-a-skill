-- Тестовый пользователь
INSERT INTO users (id, login, password_hash, role, first_name, last_name, specialization, bio_description, user_stack)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'ivan_dev',
    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HCGZEGdi20E./Q.Ob9Q5K',
    'ROLE_USER',
    'Иван',
    'Иванов',
    'Java Backend Developer',
    'Люблю писать чистый код и настраивать CI/CD.',
    '{"Java", "Spring Boot", "PostgreSQL", "Docker"}'
);

-- Тестовый проект тестового пользователя
INSERT INTO projects (user_id, project_name, project_destination, project_description, project_possibilities, project_pictures, project_contribution, project_stack)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Telegram Bot System',
    'B2C',
    'Бот для автоматизации уведомлений',
    '{"Быстрая работа", "Удобное меню"}',
    '{}',
    'Разработал архитектуру БД и настроил вебхуки',
    '{"Java", "Telegram API"}'
);

-- Тестовое событие
INSERT INTO events (user_id, event_name, event_description, start_date, end_date)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Hackathon 2026',
    'Заняли 1 место в треке финтеха',
    '2026-05-10',
    '2026-05-12'
);