# 🚀 Groq API Setup Guide

## Why Groq?
- ✅ **FASTER** than Gemini (faster inference)
- ✅ **FREE** with better limits (30 req/min, 14,400 req/day)
- ✅ **NO RATE LIMITS** for reasonable use
- ✅ **NO CREDIT CARD** required

---

## Quick Setup (2 minutes)

### Step 1: Get Your Free API Key
1. Go to: **https://console.groq.com/**
2. Sign up (free) with Google or Email
3. Click **"API Keys"** in the left sidebar
4. Click **"Create API Key"**
5. Copy the key (starts with `gsk_...`)

### Step 2: Update Your `.env` File
Open `c:\Users\ejena\OneDrive\Desktop\Project\PROJECT_250\.env` and update line 5:

```env
VITE_GROQ_API_KEY=gsk_your_actual_key_here
```

### Step 3: Restart Dev Server
**IMPORTANT:** You MUST restart for changes to work!

In your terminal:
1. Press **Ctrl+C** to stop `npm run dev`
2. Run **`npm run dev`** again

### Step 4: Test!
1. Open http://localhost:5173
2. Upload a PDF
3. Try translation or summarization
4. Should work instantly! ⚡

---

## Groq Models Available

The code uses **`llama3-8b-8192`** by default:
- Fast and capable
- Good balance of speed and quality
- Works well for translation, summarization, quizzes

Other models you can try (edit `src/api/gemini.js` line 3):
- `mixtral-8x7b-32768` - Better quality, slightly slower
- `gemma-7b-it` - Google's model on Groq

---

## Free Tier Limits

| Feature | Limit |
|---------|-------|
| Requests per minute | 30 |
| Requests per day | 14,400 |
| Tokens per minute | 14,400 |

**Much better than Gemini!** 🎉

---

## Troubleshooting

**"API key not configured" error?**
- Make sure you updated the `.env` file (not `.env.example`)
- Make sure you restarted `npm run dev`

**Still getting errors?**
- Check your API key is correct (starts with `gsk_`)
- Make sure you're signed up at console.groq.com
- Check browser console (F12) for detailed errors

---

**That's it! Your AI tools should now work perfectly!** 🚀
