#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/src"
FRONTEND_DIR="$PROJECT_DIR/src/quiz-frontend"
VENV_ACTIVATE="$PROJECT_DIR/qgen/Scripts/activate"

# Start backend
(
  cd "$BACKEND_DIR"
  source "$VENV_ACTIVATE"
  uvicorn app:app --reload
) &

# Start frontend
(
  cd "$FRONTEND_DIR"
  npm start
) &
wait