import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

paragraph = "Paris is the capital of France. It is known for the Eiffel Tower."
sentences = sent_tokenize(paragraph)

for sentence in sentences:
    input_text = f"generate question: {sentence}"
    inputs = tokenizer.encode(input_text, return_tensors="pt")
    outputs = model.generate(inputs, max_length=50, num_beams=4)
    print(tokenizer.decode(outputs[0], skip_special_tokens=True))
