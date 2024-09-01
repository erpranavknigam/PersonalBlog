
# Personal Blog

=======================================================================================================

This is a personal blog project built using React with Vite for the frontend and Node.js with Express for the backend. The blog allows you to add, edit, delete, and display articles.

### Project URL
[![Project Page](https://img.shields.io/badge/Project%20Page-Click%20Here-brightgreen)](https://roadmap.sh/projects/personal-blog)

## Features

- Display a list of articles on the homepage.
- View detailed article content by clicking on an article.
- Admin dashboard to manage articles (add, edit, delete).
- Basic authentication protects the admin section.

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **File Storage:** Filesystem (for storing articles)


## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Vite

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/erpranavknigam/PersonalBlog.git
cd <yourprojectname>
```

### 2. Install Dependencies
Navigate to the root of your project and install the required dependencies for both frontend and backend:
```
npm install
```

### 3. Build the Frontend
Before running the frontend, you need to build the project using Vite (this will generate dist folder):
```
npm run build
```

### 4. Run the Backend Server
Start the backend server using Nodemon:
```
nodemon src/index.js
```

### 5.  Run the Frontend Development Server
Now, run the Vite development server:
```
npm run dev
```

The development server will start on http://localhost:5173, and the backend server will be running on http://localhost:3000.

**Note:** If vite server does not start on port 5173 please change vite configuration

## API Endpoints
1. Update an Article
    * Endpoint: /api/update
    * Method: POST
    * Description: Updates an existing article by ID.

2. Add a New Article
    * Endpoint: /api/add
    * Method: POST
    * Description: Adds a new article.

3. Delete an Article
    * Endpoint: /api/delete
    * Method: POST
    * Description: Deletes an article by ID.


## Authentication
The admin routes (/admin, /admin/Add, /admin/Edit/:id) are protected using basic authentication. You will need to enter the credentials when accessing these routes.

## Deployment
For production, ensure that your build files are generated in the dist directory by running npm run build. The Express server serves these static files, making the app ready for deployment.

## Notes
The articles are stored as JSON in the public/articles.json file. This file is also mirrored in the dist directory after any CRUD operation on articles.
Caching is disabled to ensure that the latest data is always served.
