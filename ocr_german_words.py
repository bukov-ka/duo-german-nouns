import pytesseract
from PIL import Image
import os

# Specify the path to tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_german_words(images_folder):
    german_words = []
    
    # Get all image files in the folder
    image_files = sorted([f for f in os.listdir(images_folder) if f.endswith('.png')])
    
    for image_file in image_files:
        image_path = os.path.join(images_folder, image_file)
        
        # Open the image
        with Image.open(image_path) as img:
            # Perform OCR
            word = pytesseract.image_to_string(img, lang='deu', config='--psm 7').strip()
            
            # Add non-empty results to the list
            if word:
                german_words.append(word)
    
    return german_words

# Use the function
images_folder = 'images'
print(f"Processing images from folder: {images_folder}")

if not os.path.exists(images_folder):
    print(f"Error: Folder '{images_folder}' not found.")
    exit(1)

result = extract_german_words(images_folder)

# Print the results
if result:
    print("\nExtracted German words:")
    for word in result:
        print(word)
else:
    print("No German words were extracted.")

print(f"\nTotal words extracted: {len(result)}")
input("Press Enter to exit...")