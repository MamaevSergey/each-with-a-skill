CREATE TABLE users
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    login VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',

    first_name VARCHAR(100) NOT NULL DEFAULT 'Пользователь',
    last_name VARCHAR(100) NOT NULL DEFAULT 'Неизвестный',
    image_url VARCHAR(255) NOT NULL DEFAULT '/images/default-avatar.png',
    specialization VARCHAR(100) DEFAULT 'Информация о специализации отсутствует',
    bio_description VARCHAR(1000),
    user_stack VARCHAR(50)[],

    email VARCHAR(100) DEFAULT 'Информация о почте отсутствует',
    vk_link VARCHAR(100),
    telegram_link VARCHAR(100),
    github_link VARCHAR(100),

    education VARCHAR(100),
    workplace VARCHAR(100),
    location VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    project_name VARCHAR(100) NOT NULL,
    project_destination VARCHAR(50)  NOT NULL,
    project_description VARCHAR(500) NOT NULL,
    project_possibilities VARCHAR(150)[] NOT NULL,
    project_pictures VARCHAR(255)[] NOT NULL,
    project_main_picture VARCHAR(255),
    project_contribution VARCHAR(500) NOT NULL,
    project_stack VARCHAR(50)[] NOT NULL,
    project_link VARCHAR(255),
    project_repository VARCHAR(255),

    CONSTRAINT fk_projects_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_description VARCHAR(500) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL означает "По настоящее время"
    certificate_link VARCHAR(255),

    CONSTRAINT fk_events_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_event_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE TABLE educations (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    education_name VARCHAR(100) NOT NULL,
    education_description VARCHAR(500) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL означает "По настоящее время"
    certificate_link VARCHAR(255),

    CONSTRAINT fk_educations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_education_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE TABLE work_experiences (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL означает "По настоящее время"
    work_description VARCHAR(2000) NOT NULL,
    work_stack VARCHAR(50)[] NOT NULL,

    CONSTRAINT fk_work_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_work_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE INDEX idx_users_login ON users(login);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_educations_user_id ON educations(user_id);
CREATE INDEX idx_work_experiences_user_id ON work_experiences(user_id);