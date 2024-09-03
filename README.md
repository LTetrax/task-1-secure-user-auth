# task-1-secure-user-auth
First task for my Prodigy InfoTech Full Stack Web Development Internship
---

# Task 1 - Secure User Authentication

## Overview

This project involves building a secure user authentication system using the MERN (MongoDB, Express.js, React, Node.js) stack. It includes setting up both backend and frontend applications, implementing user registration, login functionalities, and protecting routes with role-based access control.

---
# MERN Stack project
## Lessons Learned

### **Backend Development with Express.js,Node.js, and MongoDB**

1. **Password Security**:
   - **Hashing Passwords**: Implemented bcrypt to securely hash user passwords before storing them in MongoDB.
   - **Password Salts**: Understood the importance of salting passwords to protect against rainbow table attacks.

2. **JWT (JSON Web Tokens)**:
   - **Token Generation**: Learned how to generate JWTs to securely handle user sessions.
   - **Token Verification**: Implemented middleware to authenticate and authorize users based on JWTs.

3. **Role-Based Access Control**:
   - **Authorization**: Implemented role-based access control to restrict access to certain routes based on user roles (e.g., admin, user).

4. **Database Operations**:
   - **MongoDB Integration**: Connected to MongoDB using Mongoose and performed CRUD operations.
   - **Handling Real-Time Data**: Managed issues with real-time data updates in MongoDB.

### **Frontend Development with React**

1. **React Setup**:
   - **Create React App**: Initialized a React application using `create-react-app`.

2. **Routing**:
   - **React Router**: Implemented routing with `react-router-dom` to handle navigation between login, registration, and protected routes.

3. **Styling**:
   - **Basic Styling**: Applied initial styles to improve the appearance of the application.

4. **State Management**:
   - **Handling Authentication State**: Managed user authentication state and ensured protected routes are only accessible to authenticated users.

### **Deployment and Development Tools**

1. **Development Server**:
   - **Nodemon**: Used Nodemon for automatically restarting the backend server on file changes.

2. **Concurrent Development**:
   - **Concurrently**: Used `concurrently` to run both frontend and backend servers simultaneously.

3. **Git and GitHub**:
   - **Version Control**: Managed project versions with Git and pushed code to GitHub.

---

## Problems Faced and How They Were Fixed

### **1. Port Conflict**

**Problem:**
While trying to run both the backend and frontend servers concurrently, a port conflict occurred because both servers were trying to use the same port (3000).

**Solution:**
- Changed the port for the React development server to 3001 in the `client/package.json` file by adding the `"PORT": 3001` setting in the `start` script.
- Updated the `concurrently` command to start both servers without port conflicts.

```json
"scripts": {
  "devStart": "nodemon server.js",
  "client": "PORT=3001 react-scripts start"
}
```

### **2. Issues with Concurrently**

**Problem:**
The `concurrently` package was not installed, leading to an error when attempting to run both frontend and backend servers together.

**Solution:**
- Installed `concurrently` using npm:

```bash
npm install concurrently --save-dev
```

- Added a `start` script in `package.json` to run both servers simultaneously:

```json
"scripts": {
  "start": "concurrently \"npm run devStart\" \"npm run client\""
}
```
---

## Current Status

- **Backend**: The backend server is set up with user registration, login, and protected routes using Express.js and MongoDB. JWT authentication and role-based access control are implemented.
- **Frontend**: The React application is running with basic routing and authentication handling. There are some issues with style application and display of components.
- **Development**: Both frontend and backend servers are set up to run concurrently but need adjustment to handle port conflicts.

---

## Next Steps

1. **Frontend Development**:
   - **Enhance Styling**: Improve the design of the React application to make it visually appealing.
   - **Implement Protected Routes**: Ensure protected routes are only accessible after successful authentication.
   - **Add Error Handling**: Display meaningful error messages and handle authentication failures gracefully.

2. **Backend Enhancements**:
   - **Optimize Token Handling**: Ensure efficient handling and storage of JWTs.
   - **Improve Real-Time Data**: Address issues related to real-time data updates in MongoDB.
   - **Expand Role-Based Access Control**: Refine and expand the role-based access control to cover additional use cases.

3. **Deployment**:
   - **Prepare for Production**: Set up the application for production deployment, including building the React app and configuring the server for production use.
   - **Update Documentation**: Keep the documentation updated with changes and improvements.

---

## If you want to test out the project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/LTetrax/task-1-secure-user-auth.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd task-1-secure-user-auth
   ```

3. **Install Dependencies**:
   - For the backend:
     ```bash
     npm install
     ```
   - For the frontend (in a separate terminal):
     ```bash
     cd client
     npm install
     ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     npm run devStart
     ```
   - Start the React application:
     ```bash
     npm run client
     ```

5. **Access the Application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

---
