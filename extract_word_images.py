from PIL import Image
import numpy as np
import os

def find_horizontal_bars(img_array, start_x, end_x):
    height, width = img_array.shape
    bar_positions = []
    in_bar = False
    
    for y in range(height):
        if np.all((img_array[y, start_x:end_x] > 225) & (img_array[y, start_x:end_x] < 232)):  # Check if the line is all non-white (bar)
            if not in_bar:
                bar_positions.append(y)
                in_bar = True
        else:
            in_bar = False
    
    return bar_positions

def extract_word_images(screenshots_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    word_count = 0

    # Define extraction parameters
    initial_y_offset = 50  # Adjust this based on where the first word appears
    word_height = 67  # Adjust based on the height of each word box
    left_margin = 190  # Adjust to crop out the left border if needed
    word_width = 800  # Adjust based on the width of the word area

    for filename in sorted(os.listdir(screenshots_folder)):
        if filename.lower().endswith('.png'):
            img_path = os.path.join(screenshots_folder, filename)
            try:
                img = Image.open(img_path)
                img_array = np.array(img.convert('L'))  # Convert to grayscale numpy array
                
                # Find horizontal bars
                bar_scan_start = 600  # Start scanning 600px from the left edge
                bar_scan_end = min(bar_scan_start + 50, img.width)  # Scan a 50px wide area, but not beyond image width
                bar_positions = find_horizontal_bars(img_array, bar_scan_start, bar_scan_end)
                print(bar_positions)
                
                # Extract words using bar positions and fixed height
                for bar_y in bar_positions:
                    top = max(bar_y + initial_y_offset, 0)  # Ensure top is not negative
                    bottom = min(top + word_height, img.height)  # Ensure bottom is not beyond image height
                    
                    if top >= bottom or top >= img.height or bottom <= 0:
                        print(f"Warning: Invalid crop dimensions for {filename}, word {word_count}. Skipping.")
                        continue
                    
                    word_img = img.crop((left_margin, top, left_margin + word_width, bottom))
                    
                    output_path = os.path.join(output_folder, f'word_{word_count:03d}.png')
                    word_img.save(output_path)
                    print(f"Saved: {output_path}")
                    
                    word_count += 1
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

    return word_count

# Use the function
screenshots_folder = 'pngs'
output_folder = 'images'

print(f"Processing screenshots from folder: {screenshots_folder}")

if not os.path.exists(screenshots_folder):
    print(f"Error: Folder '{screenshots_folder}' not found.")
    exit(1)

total_words = extract_word_images(screenshots_folder, output_folder)

print(f"\nTotal word images extracted: {total_words}")
print(f"Word images have been saved in the '{output_folder}' folder.")
input("Press Enter to exit...")