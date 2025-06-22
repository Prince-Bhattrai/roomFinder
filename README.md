# KTM Room Finder

KTM Room Finder is a full-stack web application built with React, Node.js, Express, and MongoDB. It allows users to create an account, post available rooms for rent, and browse other users' room listings. The platform provides secure authentication and a user-friendly interface for both room owners and seekers.

## Features

- JWT-based authentication system
- User registration and login
- Password hashing with bcrypt
- Post a room with full details and upload room videos
- Other users can view room details and contact the post owner
- Search functionality to filter room posts
- User profiles are visible only when logged in
- Role-based access control for protected routes
- Responsive and clean frontend built in React
- MongoDB database interaction using Mongoose
- Many additional features like profile viewing, posting management, and more

## Technologies Used

- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JSON Web Token (JWT), bcryptjs
- File Upload: Multer or similar (for videos)

## How It Works

1. Users can register and log in securely using their credentials.
2. Logged-in users can post a room for rent, including uploading a video and filling in location, price, and details.
3. Other users can browse available rooms, search using keywords, and contact the post creator.
4. JWT is used to protect private endpoints and show personalized content like profiles.
5. Only logged-in users can access user-specific pages such as profile, post room, etc.

## Installation

1. Clone the repository
2. Install dependencies in both `frontend` and `backend` folders:



3. Create a `.env` file in the backend directory with your MongoDB URI and JWT secret
4. Run the backend:




## Folder Structure

- `/frontend` – React app for UI
- `/backend` – Express server, auth, models, app,and controllers

## Future Improvements

- Chat between room poster and interested users
- Booking confirmation system
- Admin dashboard
- More filters in search
- Ratings and reviews on rooms

## License

This project is for learning and demonstration purposes.

