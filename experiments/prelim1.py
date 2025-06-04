import openai
import os
from dotenv import load_dotenv

os.environ.pop("SSL_CERT_FILE", None)  # <-- Add this line to unset SSL_CERT_FILE

# Set your OpenAI API key (replace with your actual key or use environment variable)
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

paragraph = """
Thailand is a country in Southeast Asia known for its tropical beaches, opulent royal palaces, ancient ruins, and ornate temples displaying figures of Buddha. Bangkok, the capital, is an ultramodern cityscape rising next to quiet canalside communities and the iconic temples of Wat Arun, Wat Pho, and the Emerald Buddha Temple (Wat Phra Kaew).
"""
num_questions = 3

def generate_questions_and_answers_with_distractors(paragraph: str, num_questions: int = 3):
    system_prompt = (
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
