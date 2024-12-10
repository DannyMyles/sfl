# SFL Member Management System

The **SFL Member Management System** is a comprehensive MERN stack application designed to streamline member management. This system includes user authentication, CRUD operations for member profiles, and a dashboard for statistical summaries and management tools. Built with modern development practices, it offers a responsive UI and robust backend using SQLite with normalized tables.

---

## Project Structure

The project consists of two main applications:

1. **sfl-api**: The backend application built with Node.js, Express, and SQLite.
2. **sfl-dashboard**: The frontend application built with React, Vite, and Tailwind CSS.

---

## Features

- **User Authentication**: Secure registration and login using JWT.
- **Member Management**:
  - CRUD operations for members.
  - File upload functionality for member profile pictures.
- **Dashboard**:
  - Search, pagination, and sorting for member data.
  - Statistics on member count, activity logs, and role distribution.
- **Database**: SQLite database with normalized tables for efficient relationships between users, roles, and members.
- **Responsive UI**: Designed with Tailwind CSS and IBM Plex Sans font.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18.20.5 or later)
- npm (Node Package Manager)
- Git

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd sfl


### Install Backend Dependencies:
    cd sfl-api
    npm install
    npm run dev

### Install Frontend Dependencies:
    cd sfl-dashboard
    npm install
    npm run dev

#### Backend (sfl-api) Environment Variables :
    JWT_SECRET_KEY=@mu(H)adywawire199990wewire!
    SEED_DB=true
    PORT=8081


#### Frontend (sfl-dashboard)Environment Variables :
    VITE_BASE_URL="http://localhost:8081/api/v1/"
