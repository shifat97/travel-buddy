# Travel Buddy Backend

This is the Node.js/Express backend for the Travel Buddy application, using MongoDB as the database.

## Features
- User Authentication (Login/Register) with JWT
- Destinations API
- Bookings API
- Swagger Documentation

## Setup

1. **Prerequisites**
   - Node.js installed
   - Docker installed (recommended for MongoDB)

2. **Run MongoDB with Docker**
   In the `server` directory, run:
   ```bash
   docker-compose up -d
   ```
   This will start a MongoDB instance on `localhost:27017` with credentials defined in `docker-compose.yml`.

3. **Environment Variables**
   Create a `.env` file in the `server` directory. If using the provided Docker setup, use the following:
   ```env
   PORT=5001
   MONGO_URI=mongodb://admin:secretpassword@localhost:27017/travel-buddy?authSource=admin
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

4. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

5. **Seed Initial Data**
   Run the following command to populate the database with initial destinations:
   ```bash
   npm run data:import
   ```

6. **Run the Server**
   ```bash
   npm run dev
   ```

## API Documentation
Once the server is running, you can access the Swagger documentation at:
[http://localhost:5001/api-docs](http://localhost:5001/api-docs)

## Integration with Frontend
To connect the frontend to this backend:
1. Update the frontend service calls to use `fetch` or `axios` targeting `http://localhost:5001/api`.
2. Replace `StorageService` logic with API calls.
