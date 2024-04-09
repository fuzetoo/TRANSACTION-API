# Transaction API

Welcome to the Transaction API! This API empowers users to manage their financial transactions efficiently and securely.

## Features

- **Create Transactions**: Users can create new transactions by providing information such as title, amount, and type (credit or debit). Transactions are associated with a user's session.

- **List Transactions**: Users can list all transactions associated with their session.

- **Query Transactions**: Users can query details of a specific transaction based on its ID.

- **Financial Summary**: The application provides a summary of financial activities, including the total of transaction amounts.

## Technologies Used

- **Fastify**: A fast and efficient web framework for building web applications in Node.js.
  
- **Zod**: A library for data schema validation.
  
- **Node.js Crypto**: Used for generating unique identifiers (UUIDs).
  
- **Knex**: An SQL query builder that makes interacting with databases easier.
