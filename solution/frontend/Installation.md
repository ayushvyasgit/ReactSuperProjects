# 🚀 Enhanced VectorShift Pipeline - Complete Installation Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [MongoDB Setup](#mongodb-setup)
6. [API Keys Configuration](#api-keys-configuration)
7. [Testing the System](#testing-the-system)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This enhanced VectorShift pipeline includes:
- **ChatGPT Integration** - Real OpenAI API calls
- **Gemini Integration** - Google AI API integration
- **Word Document Generation** - Create .docx files
- **MongoDB Storage** - Store pipeline results
- **Full Pipeline Execution** - Run complete workflows

---

## 📦 Prerequisites

### Required Software
- **Node.js** 16+ and npm
- **Python** 3.8+
- **MongoDB** 4.4+ (optional, only if using MongoDB node)

### Required API Keys (Optional)
- **OpenAI API Key** - For ChatGPT node (get from https://platform.openai.com)
- **Google AI API Key** - For Gemini node (get from https://makersuite.google.com/app/apikey)

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create Virtual Environment (Recommended)
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Create Outputs Directory
```bash
mkdir outputs
```

### Step 5: Start Backend Server
```bash
# Development mode with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or using Python directly
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Verify Backend
Open browser to: `http://localhost:8000`

You should see:
```json
{
  "message": "VectorShift Pipeline Backend",
  "status": "Running",
  "version": "2.0",
  "features": [
    "DAG Detection",
    "Pipeline Execution",
    "ChatGPT Integration",
    "Gemini Integration",
    "Word Document Generation",
    "MongoDB Storage"
  ]
}
```

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 🍃 MongoDB Setup (Optional)

### Option 1: Local MongoDB

#### Install MongoDB
**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Download from https://www.mongodb.com/try/download/community

#### Verify MongoDB
```bash
mongosh
# Should connect to mongodb://localhost:27017
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

---

## 🔑 API Keys Configuration

### Getting OpenAI API Key

1. Go to https://platform.openai.com
2. Sign up / Log in
3. Go to API Keys section
4. Create new secret key
5. Copy key (starts with `sk-`)

**Important:** Keep this key secret!

### Getting Google AI API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy key (starts with `AIza`)

### Using API Keys in Pipeline

When creating ChatGPT or Gemini nodes:
1. Paste your API key in the "API Key" field
2. The key is sent to backend only during execution
3. Keys are not stored permanently

---

## ✅ Testing the System

### Test 1: Simple Pipeline
1. Drag an **Input** node
2. Drag a **Text** node
3. Connect Input → Text
4. Set Input value: "Hello World"
5. Click "Analyze Pipeline"
6. Should show: Valid DAG ✓

### Test 2: ChatGPT Pipeline
1. Drag **Input** node
2. Drag **ChatGPT** node
3. Drag **Output** node
4. Connect: Input → ChatGPT → Output
5. Set Input: "Write a haiku about programming"
6. Add your OpenAI API key to ChatGPT node
7. Click "Execute Pipeline"
8. Wait for response (may take 5-10 seconds)

### Test 3: Word Generation
1. Create pipeline: Input → ChatGPT → Word Generator
2. Execute pipeline
3. Word document will be created in `backend/outputs/`
4. Check the outputs folder for your file

### Test 4: MongoDB Storage
1. Ensure MongoDB is running
2. Create pipeline: Input → ChatGPT → MongoDB
3. Set MongoDB connection: `mongodb://localhost:27017`
4. Execute pipeline
5. Check MongoDB for stored data:
```bash
mongosh
use pipeline_db
db.results.find()
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'fastapi'`
```bash
# Solution: Install requirements
pip install -r requirements.txt
```

**Problem:** `Address already in use: port 8000`
```bash
# Solution: Kill process on port 8000
# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Problem:** `OpenAI API error: Invalid API key`
```
Solution: 
1. Verify API key is correct
2. Check you have credits in OpenAI account
3. Ensure key starts with 'sk-'
```

### Frontend Issues

**Problem:** `Cannot connect to backend`
```
Solution:
1. Ensure backend is running on port 8000
2. Check browser console for CORS errors
3. Verify fetch URL is http://localhost:8000
```

**Problem:** `Module not found: Can't resolve 'reactflow'`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Issues

**Problem:** `MongoDB connection refused`
```bash
# Solution: Start MongoDB service
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongodb

# Or use MongoDB Atlas connection string
```

**Problem:** `Authentication failed`
```
Solution:
1. Check username/password in connection string
2. Ensure MongoDB user has correct permissions
3. For local MongoDB, try: mongodb://localhost:27017
```

---

## 🎓 Usage Examples

### Example 1: AI Blog Post Generator
```
Input (topic) 
  → ChatGPT (generate outline)
  → Gemini (expand sections)
  → Word Generator (create document)
  → MongoDB (save metadata)
```

### Example 2: Data Processing Pipeline
```
Input (data) 
  → Text (transform)
  → API (enrich)
  → MongoDB (store)
  → Output (results)
```

### Example 3: Content Analysis
```
Input (text)
  → ChatGPT (analyze sentiment)
  → Gemini (extract keywords)
  → Word Generator (report)
```

---

## 📚 Additional Resources

- **OpenAI API Docs:** https://platform.openai.com/docs
- **Google AI Docs:** https://ai.google.dev/docs
- **MongoDB Docs:** https://www.mongodb.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Flow Docs:** https://reactflow.dev

---

## 🎯 Next Steps

1. ✅ Install all dependencies
2. ✅ Get API keys
3. ✅ Test basic pipeline
4. ✅ Try ChatGPT integration
5. ✅ Generate Word document
6. ✅ Store data in MongoDB

---

## 💡 Tips

- **Start Simple:** Test with Input → Output first
- **Check Logs:** Watch browser console and backend terminal
- **API Limits:** Be aware of API rate limits and costs
- **Save Work:** Export pipeline configurations
- **Iterate:** Build complex pipelines gradually

---

## 🆘 Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review backend logs
3. Check browser console
4. Verify all services are running
5. Contact: recruiting@vectorshift.ai

---

**Happy Building! 🚀**