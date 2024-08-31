<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Microservices Starter Project</h1>

<p align="center">
  Microservice to create products <a href="http://nestjs.com" target="_blank">NestJS</a>.
</p>

## Description

This project of NestJS Microservices Starter Project is a starter project to get you up and running with NestJS and Prisma.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: >= 16.x
- **npm**: >= 8.x (or **yarn** if you prefer)
- **Docker** (optional but recommended for containerized microservices)

## Installation

Follow these steps to get started with your NestJS microservices project:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or if you're using yarn
    yarn install
    ```

3. **Create environment variables file:**

    Copy the `.env.example` file to `.env` and configure the environment variables as needed:

    ```bash
    cp .env.example .env
    ```

4. **Run the application:**

    To start the microservices, run:

    ```bash
    npm run start:dev
    # or if you're using yarn
    yarn start:dev
    ```

    The application will start in development mode, and the services will be available according to the configuration in your `main.ts`.
    
5. **Run prisma migrations:**

    ```bash
    npx prisma migrate dev
    ```

## Contributing

If you wish to contribute to this project, please follow the standard Git workflow:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## Acknowledgements

- [NestJS](https://nestjs.com) for providing an amazing framework.
- All contributors for their help and inspiration.
