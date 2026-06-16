# Task Management Application

## Project Overview

The Task Management Application is a full-stack web application developed to create, update, manage, and track daily tasks. The project demonstrates user authentication, CRUD operations, API integration, responsive design, and dynamic data handling.

---

## Features

### User Authentication & Authorization

* User Registration
* User Login
* User Logout
* Protected Dashboard Access

### Task Management

* Create Tasks
* View Tasks
* Edit Tasks
* Mark Tasks as Completed
* Undo Completed Tasks
* Delete Tasks

### Additional Features

* Task Statistics
* Responsive User Interface
* Backend API Integration
* Dynamic Data Handling

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Data Storage

* JSON File Storage

---

## Project Structure

task-management-app

backend

* server.js
* data.json
* package.json

frontend

* index.html
* register.html
* login.html
* dashboard.html
* script.js
* style.css

---

## Installation Steps

### Step 1: Open Project

Open the project folder in Visual Studio Code.

### Step 2: Install Dependencies

Open terminal inside the backend folder and run:

npm install express cors

### Step 3: Start Backend Server

Run:

node server.js

Server starts on:

http://localhost:5000

### Step 4: Run Frontend

Open the frontend files using Live Server.

Example:

http://127.0.0.1:3000/frontend/index.html

---

## API Endpoints

### Get All Tasks

GET /tasks

### Add Task

POST /tasks

### Update Task

PUT /tasks/:id

### Delete Task

DELETE /tasks/:id

---

## Application Workflow

1. User registers an account.
2. User logs in with registered credentials.
3. User accesses the dashboard.
4. User can:

   * Add tasks
   * Edit tasks
   * Mark tasks as completed
   * Delete tasks
5. Task statistics update dynamically.
6. User can logout securely.

---

## Expected Outcome

This project demonstrates:

* Full-Stack Application Structure
* User Authentication & Authorization
* CRUD Operations
* API Integration
* Dynamic Data Handling
* Responsive Design

---

## Future Improvements

* MongoDB Database Integration
* JWT Authentication
* Multiple User Accounts
* Task Priority Levels
* Due Dates
* Real-Time Updates Using WebSockets

---

## Author

Priya

Internship Project

Task Management Application

