from transformers import AutoTokenizer

model_path = r"D:\Hate_Speech\HateSpeech_XLMRoBERTa_Final"

tokenizer = AutoTokenizer.from_pretrained(
    model_path,
    local_files_only=True
)

print("Tokenizer Loaded Successfully!")