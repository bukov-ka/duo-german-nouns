import dewiktionaryparser as dw
import json
import re

# Initialize dictionaries for grammatical information
word_entries = dw.GermanNounEntriesDict()

# Retrieve the dictionaries from the JSON files
word_entries.retrieve_from_json('./data/de_noun_entries.json')

# Path to the file containing the extracted German words and translations
input_file_path = './extracted_german_words.txt'

# Output data structure
output_data = []

# Function to parse the line and extract the German word and its translation
def parse_line(line):
    match = re.match(r'^(.+?)\s*\[(.*?)\]$', line.strip())
    if match:
        german_word = match.group(1)
        english_translation = match.group(2)
        return german_word, english_translation
    return None, None

# Process each word in the input file
with open(input_file_path, 'r', encoding='utf-8') as file:
    for line in file:
        german_word, english_translation = parse_line(line)

        if german_word:
            # Check if the word is in the grammatical dictionary and if it's a noun
            if german_word in word_entries:
                entry = word_entries[german_word]
                gender = None
                plural_form = ""

                for usage in entry.values():
                    if 'gen_case_num' in usage:  # Ensure it has grammatical information (likely a noun)
                        genus = usage['gen_case_num']['genus'].get('sg1', [])
                        if genus:  # Check if the genus list is not empty
                            gender = genus[0]

                        # Extracting the plural form in the nominative case
                        if 'nominativ' in usage['gen_case_num'] and 'plural' in usage['gen_case_num']['nominativ']:
                            plural_forms = usage['gen_case_num']['nominativ']['plural'].get('pl1', [])
                            if plural_forms:  # Check if the list is not empty
                                plural_form = plural_forms[0]

                if gender:  # Only process further if gender is present
                    output_data.append([german_word, gender, plural_form, english_translation])

# Save the output data to a JSON file
output_file_path = './german_nouns_with_gender_plural_and_translation.json'
with open(output_file_path, 'w', encoding='utf-8') as outfile:
    json.dump(output_data, outfile, ensure_ascii=False, indent=4)

print(f"Data extraction completed. Results saved to {output_file_path}.")
