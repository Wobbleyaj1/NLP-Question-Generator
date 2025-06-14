# Set your OpenAI API key
import os
os.environ.pop("SSL_CERT_FILE", None)
from dotenv import load_dotenv

import openai

# Set your OpenAI API key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Sample paragraph and number of questions
paragraph = """
Paris, the capital city of France, is renowned for its rich history, stunning architecture, and world-famous landmarks such as the Eiffel Tower and the Louvre Museum. Visitors flock to the city every year to experience its vibrant culture, exquisite cuisine, and artistic heritage. The Eiffel Tower, completed in 1889 for the World's Fair, stands as a symbol of French ingenuity and attracts millions of tourists annually. The Louvre, originally a royal palace, now houses thousands of works of art, including the Mona Lisa. Besides its cultural treasures, Paris is also a hub for academic excellence, with institutions like the University of Paris attracting students worldwide.
"""
num_questions = 3

def generate_questions_and_answers_with_distractors(paragraph: str, num_questions: int = 3):
    system_prompt = (
        "You are a helpful assistant that reads educational text and generates a quiz.\n"
        "You are a helpful assistant that reads educational text and generates a quiz.\n"
        "Given a paragraph, generate exactly the specified number of fact-based questions.\n"
        "Each question must be answerable using only the information in the paragraph.\n"
        "For each question, provide:\n"
        "- The correct answer.\n"
        "- Three plausible but incorrect distractor answers.\n"
        "Avoid speculative or inferential questions.\n"
    )

    user_prompt = (
        f"Paragraph:\n\"\"\"\n{paragraph}\n\"\"\"\n\n"
        f"Generate {num_questions} questions, each with one correct answer and three distractors.\n"
        "Format:\n"
        "Q1: ...\n"
        "Correct Answer: ...\n"
        "Distractors:\n"
        "- ...\n"
        "- ...\n"
        "- ...\n\n"
        "Q2: ...\n"
        "Correct Answer: ...\n"
        "Distractors:\n"
        "- ...\n"
        "- ...\n"
        "- ...\n\n"
        "etc."
    )

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
    )

    return response.choices[0].message.content.strip()

# Then call and print it like before:
output = generate_questions_and_answers_with_distractors(paragraph, num_questions)

print("\nQuestions and Answers with Distractors:\n")
print(output)

