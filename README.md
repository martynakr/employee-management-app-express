# Employee Management App

![CI Tests](https://github.com/martynakr/employee-management-app-express/actions/workflows/tests.yml/badge.svg)

A full-stack employee management application built with React, TypeScript, Express, and MongoDB. The application provides a REST API for managing employees and their associated departments, roles, and contracts, with a React frontend for interacting with the data.

| Area              | Technologies                 |
| ----------------- | ---------------------------- |
| Frontend          | React, TypeScript            |
| Backend           | Node.js, Express, TypeScript |
| Database          | MongoDB, Mongoose            |
| API Documentation | Swagger / OpenAPI            |
| Testing           | Vitest, Supertest, Storybook |

## Running instructions

### Prerequisites

- Node.js and npm
- MongoDB installed and running locally.

    **Note:** The application currently requires a local MongoDB instance to be running in the background before starting the backend.

### Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a .env file using the provided environment variable example and add values to the variables.

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Backend endpoints will be available on [http://localhost:3000/api](http://localhost:3000/api)

### Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Project will be accessible on [http://localhost:5173/](http://localhost:5173/)

### Swagger Documentation

API documentation is automatically generated using Swagger and can be accessed at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

The documentation provides an overview of the available API endpoints, including their expected parameters, request bodies, and responses.

## Data modeling

The application uses MongoDB with Mongoose as the Data Object Modeling (ODM) library, to manage 4 main entities:

- Employee
- Department
- Role
- Contract

Rather than embedding all the information into a single document, I've used references to connect these entities.

### MongoDB embedding vs references

- **Embedding** stores related information directly inside another document. This can be useful when the data is closely connected, is usually accessed together, and doesn't need to exist independently
- **References** store the ID of another document, creating relationships between separate collections. This is useful when records need to be reused, updated independently, or queried separately.

For this application, references made more sense to me, as the entities represent distinct concepts with their own lifecycles. For example, an employee can have multiple contracts over time, while departments and roles can be associated with multiple employees.

Keeping these entities in separate collections avoids duplication and makes it easier to manage and query each type of information independently.

## Error handling

The backend uses middleware and custom error classes to handle errors consistently and return meaningful HTTP responses.

### Request Validation

Request validation is handled by reusable middleware using Zod schemas. Validation middleware is applied directly to routes, allowing incoming data to be validated before it reaches the route handler.

For example:

```ts
router.post("/", validateBody(createRoleSchema), createRole);
```

The application provides three validation middleware functions:

- **validateBody** – Validates request body data against a Zod schema. If validation fails, it returns a 400 Bad Request response containing the validation errors. If successful, the validated and parsed data replaces req.body.

- **validateQuery** – Validates query parameters against a Zod schema. If validation fails, it returns a 400 Bad Request response. If successful, the validated data is stored in res.locals.validatedQuery for use by subsequent middleware or route handlers.

- **validateObjectId** – Validates MongoDB ObjectIds supplied through route parameters before the request reaches the route handler. Invalid IDs return a 400 Bad Request response.

This approach keeps validation logic separate from route handlers and allows the same middleware to be reused across different endpoints.

### Centralised Error Handling

The application uses a centralised Express error-handling middleware to handle errors that occur during request processing.

Custom error classes, such as NotFoundError and ValidationError, are used to represent specific application errors. The error handler identifies these errors and returns the appropriate HTTP status code and response.

It also handles MongoDB duplicate key errors, returning a 409 Conflict response when a record already exists with a unique value.

Unexpected errors are handled with a generic 500 Internal Server Error response, avoiding the exposure of internal implementation details to clients.

## Testing

### Backend Integration Tests

The backend uses Vitest and Supertest to run integration tests against the REST API.

Vitest is used as the test runner and assertion library.

Supertest is used to make HTTP requests to the Express application, allowing API endpoints to be tested without manually starting the server.

The integration tests run against a separate MongoDB test database to isolate test data from the application's development data. A MongoDB server must be running locally for the tests to execute.

Test data is managed independently of the development database, helping prevent test operations from affecting existing application data.

### Frontend

The frontend uses Storybook to develop and test UI components in isolation.

### Continuous Integration

A CI pipeline runs the backend integration tests automatically as part of the development workflow.

## Example prompts used

AI tools were used as a development assistant throughout the project, primarily for exploring technical approaches, reviewing implementation decisions, troubleshooting issues, and improving code quality.

The following are examples of prompts used during development:

- Compare embedding and referencing for these relationships, considering data duplication, independent updates, querying requirements, and maintainability. Recommend an approach and explain the trade-offs.

- I want to implement reusable request validation middleware using Zod in an Express application. Show me how to validate request bodies, query parameters, and MongoDB ObjectIds, keeping validation separate from route handlers.

- I need to prevent employees from having overlapping contracts. Help me design a MongoDB/Mongoose query that checks for date-range overlaps, including open-ended contracts, and explain the edge cases the query should handle.

- Help me establish a consistent design system using Tailwind CSS. I want a blue-toned colour palette, reusable design tokens, and two complementary Google Fonts for headings and body text.

## Next steps:

- Add a dedicated employee page
- Add a form to create a contract for an employee
