import pytesseract
from PIL import Image
import os

# Specify the path to tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

def extract_words(images_folder):
    words = []
    
    # Get all German word image files in the folder
    german_image_files = sorted([f for f in os.listdir(images_folder) if f.endswith('.png') and not f.endswith('_eng.png')])
    
    for german_image_file in german_image_files:
        german_image_path = os.path.join(images_folder, german_image_file)
        
        # Corresponding English image file
        eng_image_file = german_image_file.replace('.png', '_eng.png')
        eng_image_path = os.path.join(images_folder, eng_image_file)
        
        # Open the German image and perform OCR
        with Image.open(german_image_path) as img:
            german_word = pytesseract.image_to_string(img, lang='deu', config='--psm 7').strip()
        
        # Initialize English word as empty string
        english_word = ""
        
        # If the English image exists, perform OCR
        if os.path.exists(eng_image_path):
            with Image.open(eng_image_path) as eng_img:
                english_word = pytesseract.image_to_string(eng_img, lang='eng', config='--psm 7').strip()
        
        # Combine German and English words
        if german_word:
            combined_word = f"{german_word} [{english_word}]"
            words.append(combined_word)
    
    return words

def save_words_to_file(words, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for word in words:
            f.write(f"{word}\n")
    print(f"Words saved to {output_file}")

# Use the function
images_folder = 'images'
output_file = 'extracted_german_words.txt'

print(f"Processing images from folder: {images_folder}")

if not os.path.exists(images_folder):
    print(f"Error: Folder '{images_folder}' not found.")
    exit(1)

result = extract_words(images_folder)

# Save the results to a file
save_words_to_file(result, output_file)

# Print the results
if result:
    print("\nExtracted German and English words:")
    for word in result:
        print(word)
else:
    print("No words were extracted.")

print(f"\nTotal words extracted: {len(result)}")
print(f"Words have been saved to '{output_file}'")
input("Press Enter to exit...")
