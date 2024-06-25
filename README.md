# Library---web-application-project
# Free Library Management System

A full-stack web application for managing a library's book collection and user registrations. It is designed to provide a simple and intuitive interface for librarians and users to manage books and library operations.

## Overview

The Free Library Management System is a comprehensive web application designed to simplify the process of managing books and user registrations in a library setting. It provides an intuitive interface for librarians to efficiently handle book-related tasks and users to explore and access books from the library's collection.

## Features

- User Registration: Users can create an account, providing their personal details and contact information.

- Book Management: Librarians can add new books to the library's collection, update book information, and remove books when needed.

- Book Search: Users can search for books by title, author, genre, or ISBN to find specific books of interest.

## Technologies Used

- Front-end: React, HTML, CSS
- Back-end: Node.js, Express.js, MongoDB
- Authentication: JSON Web Tokens (JWT)
- Cloud: cloudinary

## Installation

1. Clone the repository:
https://github.com/Ahmad4Ahmad/Library.git

2. Install dependencies:
```
cd Online-Library---Fullstack-app
cd Frontend
npm install
cd ..
cd Backend
npm install
```

3. configure .env file:
you need to fill out the .env file in the Backend folder with these fields:
MONGO_URL=
JWT_SECRET=
FRONTEND_URL=
EMAIL_HOST=
EMAIL_USER=
EMAIL_PASS=
CLOUDINARY_URL=

4. Run the application:

Frontend: `npm run dev`
Backend: `npm start`

5. Open your browser and navigate to `http://localhost:5173` to access the application.

## Usage

- Register a new user account or log in with an existing account.
- Explore the library's book collection and search for books of interest.
- View book details, including title, author, genre, and availability.
- Librarians can manage the library's book collection, add new books, and update book information.

## Contributing

Contributions are welcome! If you want to contribute to this project.