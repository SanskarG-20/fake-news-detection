import os
import re
import json
import joblib
import requests
from io import BytesIO
from dotenv import load_dotenv

# FastAPI and related imports
from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# External Service SDKs
import google.generativeai as genai
from newsapi import NewsApiClient
import tweepy

# Analysis and Extraction Tools
from bs4 import BeautifulSoup
import pytesseract
from PIL import Image
from textblob import TextBlob
import numpy as np

# --- 1. INITIALIZATION ---

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Multi-Agent Fake News Detection API")

# Configure CORS to allow your React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Your React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your trained SVM model and TF-IDF vectorizer
try:
    svm_model = joblib.load('svm_model.joblib')
    tfidf_vectorizer = joblib.load('tfidf_vectorizer.joblib')
    print("SVM Model and TF-IDF Vectorizer loaded successfully.")
except FileNotFoundError:
    print("FATAL ERROR: Model files not found. Ensure 'svm_model.joblib' and 'tfidf_vectorizer.joblib' are present.")
    svm_model = None
    tfidf_vectorizer = None

# Configure external API clients
try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    gemini_model = genai.GenerativeModel('gemini-pro')
    print("Gemini API configured.")
except Exception:
    gemini_model = None
    print("Warning: Gemini API key not found or invalid. Cross-check will be disabled.")

try:
    newsapi = NewsApiClient(api_key=os.getenv("NEWS_API_KEY"))
    print("News API configured.")
except Exception:
    newsapi = None
    print("Warning: News API key not found or invalid. News evidence fetching will be disabled.")

try:
    twitter_client = tweepy.Client(bearer_token=os.getenv("TWITTER_BEARER_TOKEN"))
    print("Twitter/X API configured.")
except Exception:
    twitter_client = None
    print("Warning: Twitter Bearer Token not found. Twitter evidence fetching will be disabled.")


# --- 2. HELPER FUNCTIONS ---

def preprocess_text(text):
    """Cleans text to prepare it for the model."""
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    return text

def extract_from_url(url):
    """Extracts main text content from a news article URL."""
    try:
        response = requests.get(url, timeout=10, headers={'User-Agent': 'MyFakeNewsDetector/1.0'})
        soup = BeautifulSoup(response.content, 'html.parser')
        paragraphs = soup.find_all('p')
        return ' '.join([p.get_text() for p in paragraphs])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not extract content from URL: {e}")

def extract_from_image(image_bytes):
    """Extracts text from image bytes using Tesseract OCR."""
    try:
        image = Image.open(BytesIO(image_bytes))
        return pytesseract.image_to_string(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {e}")

def predict_fake_news(text):
    """Uses the loaded SVM model to predict if the text is fake news."""
    processed_text = preprocess_text(text)
    vectorized_text = tfidf_vectorizer.transform([processed_text])
    confidence_scores = svm_model.predict_proba(vectorized_text)[0]
    
    # Assuming class 0 is 'Fake' and 1 is 'Real'
    fake_confidence = confidence_scores[0]
    
    if fake_confidence > 0.85:
        verdict = "Real"
    elif fake_confidence > 0.65:
        verdict = "Likely Real"
    elif fake_confidence < 0.35:
        verdict = "Likely Fake"
    else:
        verdict = "Uncertain"
        
    return verdict, fake_confidence

def analyze_sentiment(text):
    """Performs sentiment analysis on the text."""
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    
    if polarity > 0.1: sentiment = "Positive"
    elif polarity < -0.1: sentiment = "Negative"
    else: sentiment = "Neutral"
        
    return {"status": sentiment, "score": round(polarity, 2)}

def cross_check_with_gemini(text):
    """Uses Google Gemini for an AI-powered fact-check summary."""
    if not gemini_model:
        return {"source": "Google Gemini", "status": "Unavailable", "summary": "API not configured."}
    
    prompt = f'Fact-check the following news article. Provide a brief, one-sentence summary and a credibility status (e.g., "Verified", "Unverified", "Misleading"). Format the response as a JSON object with keys "status" and "summary". Article: "{text[:1000]}"'
    
    try:
        response = gemini_model.generate_content(prompt)
        cleaned_response = response.text.strip().replace('```json', '').replace('```', '')
        gemini_result = json.loads(cleaned_response)
        gemini_result["source"] = "Google Gemini" # Explicitly add the source
        return gemini_result
    except Exception as e:
        return {"source": "Google Gemini", "status": "Error", "summary": str(e)}

def fetch_evidence(query_text):
    """Fetches evidence from News API and Twitter/X."""
    evidence = {"news_api": [], "twitter": []}
    
    # Fetch from News API
    if newsapi:
        try:
            top_headlines = newsapi.get_everything(q=query_text, language='en', sort_by='relevancy', page_size=3)
            for article in top_headlines.get('articles', []):
                evidence["news_api"].append({
                    "source": article['source']['name'],
                    "title": article['title'],
                    "url": article['url']
                })
        except Exception as e:
            print(f"News API error: {e}")

    # Fetch from Twitter/X
    if twitter_client:
        try:
            response = twitter_client.search_recent_tweets(query=f"{query_text} -is:retweet", max_results=3, tweet_fields=["text", "author_id"])
            if response.data:
                for tweet in response.data:
                    evidence["twitter"].append({"user": f"User ID: {tweet.author_id}", "text": tweet.text})
        except Exception as e:
            print(f"Twitter API error: {e}")
            
    return evidence


# --- 3. API ENDPOINTS ---

@app.get("/")
def home():
    return {"message": "Welcome to the Fake News Detection API!", "status": "healthy"}

@app.post("/analyze")
async def analyze_news(input_type: str = Form(...), content: str = Form(None), image: UploadFile = File(None)):
    if not svm_model or not tfidf_vectorizer:
        raise HTTPException(status_code=503, detail="Machine Learning model is not available.")
    
    # Step 1: Extract text based on input type
    text = ""
    if input_type == "text": text = content
    elif input_type == "url": text = extract_from_url(content)
    elif input_type == "image": text = extract_from_image(await image.read())
    
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text to analyze.")
    
    # Step 2: Run all analyses
    verdict, confidence = predict_fake_news(text)
    sentiment_data = analyze_sentiment(text)
    gemini_check = cross_check_with_gemini(text)
    evidence = fetch_evidence(text[:150]) # Use the start of the article for a relevant search
    
    # Step 3: Construct the final JSON response to match the frontend
    return {
        "verdict": verdict,
        "confidence": float(confidence),
        "original_content": text,
        "sentiment_analysis": sentiment_data,
        "cross_check": gemini_check,
        "evidence": evidence
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)