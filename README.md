# NLP-Question-Generator

This project is an end-to-end application that generates quiz questions from educational text using state-of-the-art natural language processing (NLP) models. It features a FastAPI backend powered by OpenAI's GPT models and a React-based frontend for user interaction.

## Features

- **Automatic Quiz Generation:** Enter a paragraph and specify the number of questions to generate a quiz with multiple-choice questions.
- **Distractor Generation:** Each question includes one correct answer and three plausible distractors.
- **Interactive Frontend:** Users can input text, generate quizzes, and answer questions directly in the web interface.
- **Experimentation Scripts:** Includes scripts for experimenting with different NLP models and prompt engineering.

## Getting Started

### Prerequisites

- Python 3.8-3.11
- Node.js & npm
- OpenAI API key (for backend)

## Live Demo

The frontend is deployed at: [https://wobbleyaj1.github.io/NLP-Question-Generator]

### Deploying to GitHub Pages

To deploy the frontend to GitHub Pages, run:

```sh
npm run deploy
```

Make sure the `homepage` field in `package.json` is set to your repo's GitHub Pages URL.