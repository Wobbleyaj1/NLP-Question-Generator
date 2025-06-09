from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv

# Unset SSL_CERT_FILE to avoid SSL issues on some systems (optional)
os.environ.pop("SSL_CERT_FILE", None)

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize FastAPI app
app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model for quiz generation
class QuizRequest(BaseModel):
    paragraph: str
    num_questions: int

@app.post("/generate_quiz")
async def generate_quiz(data: QuizRequest):
    """
    Generate a quiz based on the provided paragraph and number of questions.
    Returns a list of questions, each with a correct answer and distractors.
    """
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

    # Call OpenAI API to generate quiz
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
    )

    # Extract the model's response content
    content = response.choices[0].message.content

    import json
    try:
        # Parse the JSON output from the model
        quiz = json.loads(content)
    except Exception:
        # If parsing fails, return the raw content and an error message
        return {"error": "Failed to parse model output as JSON", "raw": content}

    # Return the quiz as a JSON response
    return {"quiz": quiz}