# app.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv

os.environ.pop("SSL_CERT_FILE", None)  # <-- Add this line to unset SSL_CERT_FILE
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizRequest(BaseModel):
    paragraph: str
    num_questions: int

@app.post("/generate_quiz")
async def generate_quiz(data: QuizRequest):
    system_prompt = (
        "You are a helpful assistant that reads educational text and generates a quiz.\n"
        "Given a paragraph, generate exactly the specified number of fact-based questions.\n"
        "Each question must be answerable using only the information in the paragraph.\n"
        "For each question, provide:\n"
        "- The question text\n"
        "- The correct answer\n"
        "- Three plausible but incorrect distractor answers that may include related facts not mentioned in the paragraph.\n"
        "Return the results in JSON format like:\n"
        "[{\"question\": ..., \"correct_answer\": ..., \"distractors\": [..]}, ...]\n"
    )

    user_prompt = (
        f"Paragraph:\n\"\"\"\n{data.paragraph}\n\"\"\"\n\n"
        f"Generate {data.num_questions} questions with correct answers and distractors."
    )

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
    )

    # The model should output JSON as requested.
    content = response.choices[0].message.content

    import json
    try:
        quiz = json.loads(content)
    except Exception:
        # fallback: if output is not perfect JSON, return raw content
        return {"error": "Failed to parse model output as JSON", "raw": content}

    return {"quiz": quiz}
