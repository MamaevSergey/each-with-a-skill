# EWAS (Each With A Skill)

**Платформа для создания, управления и демонстрации профессионального портфолио IT-специалистов**

[![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx)](https://nginx.org/)

<p align="center">
  <a href="#-о-проекте">О проекте</a> •
  <a href="#-стек-технологий">Стек</a> •
  <a href="#-галерея">Интерфейс</a> •
  <a href="#-текущий-функционал">Функционал</a> •
  <a href="#-запуск-проекта">Быстрый старт</a> •
  <a href="#-roadmap-v20">Планы (Roadmap)</a>
</p>

</div>

---

## 📌 О проекте

**EWAS** — монорепозиторий full-stack веб-сервиса, объединяющий современный фронтенд на React и отказоустойчивый Spring Boot бэкенд. Проект позволяет инженерам вести публичную визитную карточку: делиться опытом работы, визуализировать стек технологий, фиксировать события и образование, а также делиться персональной ссылкой в один клик.

---

## 🛠 Стек технологий

| Слой | Технологии |
|---|---|
| **Backend** | Java 17, Spring Boot 4, Spring Security (JWT), Spring Data JPA, Hibernate, Maven |
| **Database & Storage** | PostgreSQL 15, Yandex Object Storage (S3 SDK v2) |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Material Symbols |
| **DevOps & Infra** | Docker, Docker Compose, Nginx (Reverse Proxy & Static Serve), Alpine Linux |

---

## Галерея

<div align="center">

### Главная страница и поиск
*Быстрый поиск специалистов по логину и переход к публичным резюме*

<img width="1907" height="958" alt="image" src="https://github.com/user-attachments/assets/712549fc-83e8-4f0a-a253-bc82a589b9f3" />

<br/><br/>
### Личный кабинет и редактирование
*Управление блоками биографии, интерактивный выбор стека и таймлайн опыта*

<img width="1904" height="961" alt="image" src="https://github.com/user-attachments/assets/e5d74d81-6034-4022-b50e-fafc621177b4" />
<br/><br/>
<img width="1906" height="951" alt="image" src="https://github.com/user-attachments/assets/f4ed069b-7a8d-47d2-94cb-8348b16c44c2" />

<br/><br/>
### Публичное портфолио
*Адаптивная страница специалиста с генерацией инициалов при отсутствии фото*

<img width="1905" height="953" alt="image" src="https://github.com/user-attachments/assets/540b041d-19fd-452c-a8a2-f342e04371eb" />

</div>

---

## Текущий функционал

### Реализовано в v1.0:
- **Аутентификация и безопасность:**
  - Регистрация и вход с выдачей пары JWT токенов (`accessToken` / `refreshToken`).
  - Роутинг с защитой приватных эндпоинтов и автоматическим выходом при истечении сессии.
- **Управление профилем:**
  - Заполнение личной информации (роль, компания, локация, образование, био, контакты).
  - Drag-and-drop выбор стека технологий из предустановленного каталога.
  - CRUD-операции для секций «Опыт работы», «События» и «Образование».
- **Медиа и файлы:**
  - Загрузка и оптимизация аватаров в Yandex Object Storage (S3).
  - Автоматическая очистка старых файлов в бакете при обновлении фото.
  - Генерация бейджа с инициалами (fallback), если аватар не загружен.
- **UX/UI:**
  - Полностью адаптивный интерфейс с темной темой.
  - Кастомная система нотификаций (Toasts) без внешних тяжелых библиотек.
  - Копирование публичной ссылки на профиль в буфер обмена в один клик.
- **Инфраструктура:**
  - Полная контейнеризация (БД, API, статика Nginx) с оркестрацией через Docker Compose.

---

## 🚀 Запуск проекта

### Предварительные требования
- Установленный [Docker](https://docs.docker.com/get-docker/) и [Docker Compose](https://docs.docker.com/compose/).

### Развертывание в пару команд

1. Клонируйте репозиторий:
   ```bash
   git clone [https://github.com/your-username/each-with-a-skill-project.git](https://github.com/MamaevSergey/each-with-a-skill-project.git)
   cd each-with-a-skill-project```
2. Запустите:
   ```bash
   docker compose up -d --build```
3. Зайти на сервис:
   ```bash
   http://localhost:5173
   ```

## 🗺 Roadmap (В разработке для v2.0)
### В следующем релизе запланировано расширение возможностей безопасности и экспорта данных:
- [ ] **Безопасность и верификация:**
  - [ ] Обязательное подтверждение email при регистрации с отправкой верификационной ссылки.
  - [ ] Восстановление забытого пароля через одноразовый токен на привязанную почту.
  - [ ] Интеграция Yandex SmartCaptcha для защиты формы регистрации от спама и ботов.
  - [ ] Scheduled-задача (CRON) для автоматической очистки неподтвержденных аккаунтов из PostgreSQL.

- [ ] **Управление учетной записью:**
  - [ ] Функция полного и безвозвратного удаления аккаунта со всеми связанными данными и медиафайлами.
     
- [ ] Экспорт и демонстрация:
  - [ ] Генерация резюме: доработка функции «Скачать резюме» с компиляцией данных в форматы .doc / .docx по типовому шаблону.
  - [ ] Раздел «Проекты»: добавление отдельного таба с кейсами (описание, ссылки на GitHub/демо, скриншоты, статус разработки).
