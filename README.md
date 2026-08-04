# 🚀 AI-Augmented Startup Research Pipeline

An AI-powered startup research platform that automatically discovers startups, analyzes them using Large Language Models (LLMs), and generates investment memos with startup rankings.

The application eliminates hours of manual research by automating startup discovery, evaluation, and investment analysis.

---

## 🌐 Live Demo

Frontend: https://ai-augmented-startup-research-pipel.vercel.app

## 💻 GitHub Repository

https://github.com/snoorbasha50/AI-Augmented-Startup-Research-Pipeline

---

## ✨ Features

- 🔍 Discover startups using Firecrawl Search API
- 🤖 AI-powered startup analysis using Google Gemini
- 📄 Generate detailed investment memos
- 📊 Rank startups based on multiple evaluation metrics
- 🎯 Interactive React dashboard
- 📱 Responsive UI
- ☁️ Serverless backend using AWS Lambda
- 🐳 Dockerized deployment
- ⚡ Fast REST APIs built with Fastify

---

## 🏗️ System Architecture

```
                React + TypeScript
                       │
                       ▼
               Fastify REST API
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
   Firecrawl Search API      Google Gemini AI
          │                         │
          └────────────┬────────────┘
                       ▼
            Investment Memo Generator
                       │
                       ▼
               Startup Ranking Engine
```

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Fastify
- Docker
- AWS Lambda
- Amazon ECR

### AI & APIs

- Google Gemini
- Firecrawl API

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   ├── api.ts
│   ├── App.tsx
│   └── types.ts

backend/
├── src/
│   ├── routes/
│   ├── pipeline/
│   ├── services/
│   ├── app.js
│   ├── lambda.js
│   └── server.js
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/snoorbasha50/AI-Augmented-Startup-Research-Pipeline.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Workflow

1. User enters a startup niche
2. Firecrawl discovers relevant startups
3. Gemini analyzes each startup
4. Investment memos are generated
5. Startups are ranked
6. Results are displayed in an interactive dashboard

---

## 🚀 Deployment

### Frontend

- Vercel

### Backend

- AWS Lambda
- Docker
- Amazon ECR

---

## ⭐ Highlights

- AI-Powered Startup Research
- Full Stack Application
- Modern React UI
- Serverless Backend
- Docker Deployment
- REST APIs
- Clean Architecture
- Responsive Design

---

## 🔮 Future Enhancements

- Authentication
- PDF Export
- Company Comparison
- Background Job Queue
- Email Reports
- Multi-LLM Support

---

## 👨‍💻 Author

**Noorbasha Shaik**

GitHub: https://github.com/snoorbasha50
