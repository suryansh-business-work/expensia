# Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Get Your API Keys and Database

1. **OpenAI API Key**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

2. **MongoDB Database** (Already configured!)
   - Your MongoDB Atlas connection string is already set up
   - Database: sibera-restart

### Step 2: Configure the API Key

Open the file: `server/.env`

Add your OpenAI API key:
```
PORT=5000
OPENAI_API_KEY=sk-your-actual-key-here
DBURL=mongodb+srv://suryanshbusinesswork:education54@sibera-box.ofemtir.mongodb.net/sibera-restart?retryWrites=true&w=majority
```

### Step 3: Run the Application

Open a terminal and run:
```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000).

## 🎯 Using the App

1. Open your browser to http://localhost:3000
2. Type your expenses naturally in the chat:
   - "spend food 50 from credit card"
   - "bought groceries 200 cash"
   - "paid bill 1500 upi"
3. The AI will automatically categorize and log your expense to MongoDB!

## ✨ What's Included

- **MongoDB Integration**: All expenses are stored in your MongoDB Atlas database
- **Timestamps**: Every expense is logged with precise timestamp
- **Category IDs**: Each category has a unique identifier
- **Persistent Storage**: Your data is safe and retrievable anytime

## 🛠️ Troubleshooting

### If you get "Cannot find module" errors:
```bash
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

### If the server won't start:
- Make sure you've added your OpenAI API key to `server/.env`
- Check that ports 3000 and 5000 are not in use

### If the AI isn't responding:
- Verify your OpenAI API key is correct
- Check that you have credits in your OpenAI account
- Look at the terminal for error messages

## 📝 Example Expenses to Try

- "spend food 50 from credit card"
- "grocery 350 cash"
- "electricity bill 1200 upi"
- "petrol 800 debit card"
- "baby diapers 600 from credit card"
- "doctor visit 1500 cash"
- "gym membership 2000 upi"
- "car service 5000 debit card"

## 💡 Tips

- Be natural! The AI understands various phrasings
- Include: amount, category hint, and payment method
- View recent expenses in the panel below the chat
- Total expenses are shown in the header

Enjoy tracking your expenses! 🎉
