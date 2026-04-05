# TimeCapsule

## Description
TimeCapsule is a project that focuses on storing memories and moments digitally. The application allows users to create and manage a timeline of significant events in their lives, ensuring that precious moments are preserved and easily accessible. Whether it’s a family vacation, a graduation, or a personal achievement, TimeCapsule makes it easy to keep track of these milestones in a beautiful and intuitive interface.

## Features
- User authentication and profile management
- Create, update, and delete memories
- Upload and manage multimedia content (photos, videos, etc.)
- Timeline view to easily navigate through events
- Search functionality to find specific memories
- Share memories with friends and family
- Reminders for significant dates

## Tech Stack
- **Frontend:** React, Redux, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Cloud Storage:** AWS S3 for media storage
- **Authentication:** JWT for secure user authentication

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nikk118/TimeCapsule.git
   cd TimeCapsule
   ```
2. **Install dependencies**:
   - For the client: `cd client` and run `npm install`
   - For the server: `cd server` and run `npm install`
3. **Set up environment variables**:
   - Create a `.env` file in the server directory and add the necessary configuration details (e.g., database URL, JWT secret).
4. **Run the application**:
   - For the client: `npm start` (in the client directory)
   - For the server: `npm start` (in the server directory)
5. Open your browser and go to `http://localhost:3000`.

## Project Structure
```
TimeCapsule/
├── client/              # Frontend code
│   ├── src/            # Source files
│   ├── public/         # Static files
│   ├── package.json     # Frontend dependencies
│   └── ...
└── server/              # Backend code
    ├── config/         # Configuration files
    ├── models/         # Database models
    ├── routes/         # API routes
    ├── controllers/    # Business logic
    ├── package.json     # Backend dependencies
    └── ...
```

## Conclusion
TimeCapsule is designed to help you treasure your memories with ease and elegance. Join us in preserving life's beautiful moments!