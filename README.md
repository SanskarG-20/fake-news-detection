## Multi-Agent Fake-News Detection Platform ##

This project is an interactive web platform designed to detect and explain fake or misleading news. Built for a hackathon, it leverages a machine learning backend and a responsive frontend to provide users with a verdict, confidence score, and explainable insights into why a news article is classified as real or fake

## Key Features ##

1) Multi-Input Support: Analyze news from pasted text, a URL, or text extracted from an image using OCR.

2) Explainable AI (XAI): The platform doesn't just give a verdict; it highlights the specific words and phrases ("key signals") that most influenced the model's decision.

3) Interactive Dashboard: Results are displayed in a clean, user-friendly interface, visualizing the confidence score and supporting evidence.

## Tech Stack ##

1) Backend: Python, FastAPI, Scikit-learn (for the SVM model)

2) Frontend: React (with Vite), CSS Modules

3) ML Model: A Linear SVM model trained on a labeled news dataset, using TF-IDF for text vectorization.
