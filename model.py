from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

# Set device to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load FLAN-T5 model and tokenizer
model_name = "google/flan-t5-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(
    model_name,
    device_map="auto",  # Use accelerate or auto-shard if needed
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
)

# Make sure the model is on the correct device
model.eval()

# Sample educational paragraph
paragraphs = [
    "Paris, the capital city of France, is renowned for its rich history, stunning architecture, and world-famous landmarks such as the Eiffel Tower and the Louvre Museum. Visitors flock to the city every year to experience its vibrant culture, exquisite cuisine, and artistic heritage. The Eiffel Tower, completed in 1889 for the World's Fair, stands as a symbol of French ingenuity and attracts millions of tourists annually. The Louvre, originally a royal palace, now houses thousands of works of art, including the Mona Lisa. Besides its cultural treasures, Paris is also a hub for academic excellence, with institutions like the University of Paris attracting students worldwide."
]

# Prefix to guide the model
prefix = (
    "Generate one diverse and challenging quiz question "
    "(Who, What, When, Where, Why, or How) "
    "based on the following paragraph. "
    "Avoid simple yes/no questions and focus on key facts:\n\n"
)

for paragraph in paragraphs:
    prompt = prefix + paragraph
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    outputs = model.generate(
        **inputs,
        max_length=64,
        do_sample=True,
        top_p=0.9,
        top_k=50,
        temperature=0.7,
        no_repeat_ngram_size=3,
        repetition_penalty=1.2,
    )

    question = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print(f"Input: {paragraph}")
    print(f"Question: {question}\n")
