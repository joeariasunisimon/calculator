# Calculator App

A full-stack calculator application featuring a Go backend and a React (Vite) frontend.

## Setup Instructions

### Prerequisites

-   **Go**: Version 1.25 or higher
-   **Node.js**: Version 20 or higher
-   **npm**: Included with Node.js

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd calculator-app
    ```

## Running the Application

### Backend (Go)

The backend runs on port `3000`.

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Run the server:
    ```bash
    go run cmd/api/main.go
    ```
    You should see: `API server is running on port 3000`

### Frontend (React + Vite)

The frontend development server usually runs on port `5173`.

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open your browser and go to `http://localhost:5173`.

## API Documentation

### Base URL

`http://localhost:3000/api/v1`

### Endpoints

#### 1. Check Health

-   **GET** `/health`
-   **Description**: Checks if the API is running.
-   **Response**: `200 OK`

#### 2. Calculate

-   **POST** `/calculate`
-   **Description**: Performs a mathematical operation on two operands.
-   **Request Body**:

    ```json
    {
        "operand1": 10,
        "operand2": 5,
        "operation": "add" // Options: add, subtract, multiply, divide, power, sqrt, percentage
    }
    ```

    _(Note: `operand2` is ignored for `sqrt`)_

-   **Response**:
    ```json
    {
        "result": 15
    }
    ```
-   **Error Response**:
    ```json
    {
        "error": "Error message description"
    }
    ```

## Design Decisions & Assumptions

-   **Monorepo Structure**: The project is organized as a monorepo with distinct `backend` and `frontend` directories to keep concerns separated while maintaining a single repository.
-   **Go Backend**: Chosen for performance and strong typing. Data structures are defined in `pkg/types` for clarity.
-   **Vite + React**: Used for a fast, modern frontend development experience.
-   **Path Aliases**: The frontend uses `@` as an alias for `src` to simplify imports (configured in `vite.config.ts` and `tsconfig.json`).
-   **CORS**: Enabled on the backend to allow requests from the frontend development server.

## Prompts Used

This project was developed with the assistance of an AI. Notable prompts used during the development include:

-   "Diagnose and resolve the TypeScript path alias resolution error for `@/types/calculator` in the frontend testing environment."
-   "Scaffold technical documentation (README.md) detailing development environment setup, execution procedures for full-stack components, API endpoint specifications, and architectural design rationale."
-   "Evaluate `.gitignore` configuration strategy for a monorepo structure to ensure proper exclusion rules for nested backend and frontend directories."
-   "Implement HTTP request logging middleware to provide visibility into incoming traffic and response status codes."
-   "Design a scalable frontend project scaffolding strategy, emphasizing component modularity and separation of concerns to ensure long-term maintainability."
-   "Develop a high-fidelity UI/UX design mock-up for the calculator interface, adhering to modern, minimalist aesthetic principles and prioritizing usability for core arithmetic functions."
