# BudgetBuddy (Домашняя бухгалтерия) — Backend

## Описание

Инструкция по установке и настройке backend для проекта **BudgetBuddy** — домашней бухгалтерии.

👉 [Фронтенд BudgetBuddy](https://github.com/Rorrian/Accounting)

---

## Стек технологий

### Основные технологии
- NestJS
- TypeScript
- PostgreSQL: Реляционная БД для хранения информации о транзакциях и пользователях.
- Prisma ORM: Для обеспечения взаимодействия с PostgreSQL.
  
### Модули для аутентификации и безопасности
- passport-google-oauth20 и passport-github2: Модули для авторизации через Google и GitHub OAuth
- @nestjs/jwt и passport-jwt: Для работы с JWT токенами и защиты маршрутов
- argon2: Для безопасного хеширования паролей
  
### Работа с API и данными
- Axios: Для отправки запросов к API
- ookie-parser: Обработка cookies для управления сессиями
- lodash: Набор утилит для работы с данными и объектами

### Тестирование и разработка
- Jest: Фреймворк для тестирования
- Supertest: Для интеграционного тестирования HTTP
- ts-jest: Тесты на TypeScript

---

## Установка и настройка

### 1. Установка PostgreSQL и создание базы данных

1. Установить PostgreSQL и pgAdmin: [Скачать PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
2. Создать базу данных через pgAdmin.
3. Обновить файл `.env` следующими настройками:
   ```plaintext
   DATABASE_URL=postgresql://postgres:123456@localhost:5432/auth-mk?schema=public
   ```

#### Параметры подключения к БД:

- Name: auth-mk
- Host: localhost
- Port: 5432
- Username: postgres
- Password: 123456

### 2. Установка зависимостей и запуск проекта

1. Установить зависимости:
   ```plaintext
   npm install
   ```
2. Синхронизировать базу данных с Prisma:
   ```plaintext
   npx prisma db push
   ```

### 3. Настройка API-токенов для авторизации через социальные сети

#### Google OAuth
<details>
   <summary>Инструкция</summary>

   1. Перейти в [Google Develop Console](https://console.cloud.google.com/) и создайть проект или выбрать существующий.
   
   2. Открыть APIs & Services > Credentials: [Credentials](https://console.cloud.google.com/apis/dashboard).
   
   3. Нажать Create Credentials и выбрать OAuth Client ID.
   
   4. Настроить экран согласия OAuth (тип — external) и добавить Google-аккаунт в Test users.
   
   5. Вернуться на страницу Credentials и создать OAuth client ID:
   
   - Authorized origins: http://localhost:4200
   - Authorized redirect URIs: http://localhost:4200/auth/google/callback
   
   6. После создания получить Client ID и Client Secret.
</details>

#### GitHub OAuth
<details>
   <summary>Инструкция</summary>

   1. Перейти в GitHub Developer Settings и в разделе OAuth Apps нажать New OAuth App.
   2. Заполнить поля:
   
   - Application name
   - Homepage URL
   - Authorization callback URL
   
   3. Нажать Register application и получить Client ID и Client Secret.
</details>

