Backend:
The backend is built with Node.js using the Fastify framework and connects to a PostgreSQL database. It provides full CRUD functionality for managing products through five primary endpoints (GET, POST, PUT, DELETE). Database interactions are handled via the Sequelize ORM.But currently, I have only implemented, delete and add and get.

Frontend:
Using React v19 and Vite for fast development and builds. It includes a responsive product page list with pagination, real-time search server, and skeleton loaders for loading states. Styling is managed with SCSS modules, navigation uses React Router, and all API endpoints are handled properly.

Current routes:
- Product addition and deletion: /admin
- Homepage: / or /products

To run the project, nagivate to backend directory, start the backend with `node server.js`, then launch the frontend in a separate terminal using `npm run dev`.
