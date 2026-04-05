# TimeCapsule

## Description
TimeCapsule is a project that focuses on storing memories and moments digitally. The application allows users to create and manage a timeline of significant events in their lives, ensuring that precious moments are preserved and easily accessible.

Whether it’s a family vacation, a graduation, or a personal achievement, TimeCapsule makes it easy to keep track of these milestones in a beautiful and intuitive interface.

🚀 What makes it unique?  
TimeCapsule includes an AI-powered assistant that helps users create, manage, and retrieve memories intelligently.

---

## 🤖 AI Features

- 🧠 AI Assistant (LangChain-based)
  - Create capsules using natural language  
  - Example: "Remind me about my Goa trip next year"

- 💬 Conversational Queries
  - "How many capsules do I have?"
  - "Show my upcoming capsules"

- 🔧 Tool-based architecture (production-ready AI responses)



---

## Features
- User authentication and profile management  
- Create, update, and delete memories  
- Upload multimedia content (photos, videos)  
- Timeline view of events  
- Search functionality  
- Share memories  
- Reminders for important dates  
- AI-powered interaction  

---

## Tech Stack
Frontend: React, Redux, Bootstrap  
Backend: Node.js, Express  
Database: MongoDB  

AI: LangChain, Hugging Face 
Email: Nodemailer  
Authentication: JWT  

---

## Setup Instructions

```bash
git clone https://github.com/Nikk118/TimeCapsule.git
cd TimeCapsule

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install

# Create .env file in server folder and add:
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
HUGGINGFACE_API_KEY=your_key

# Run backend
npm start

# Run frontend (in new terminal)
cd ../client
npm start
```
Project Structure
```
TimeCapsule/
├── client/
├── server/
├── ai-service/
└── README.md
```
##Author
Nikhil
https://github.com/Nikk118
