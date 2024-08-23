import dewiktionaryparser as dw
import json

# Initialize a dictionary for grammatical information
word_entries = dw.GermanNounEntriesDict()

# Retrieve the dictionary from the JSON file
word_entries.retrieve_from_json('./data/de_noun_entries.json')

# Path to the file containing the extracted German words
input_file_path = './extracted_german_words.txt'

# Output data structure
output_data = []

# Process each word in the input file
with open(input_file_path, 'r', encoding='utf-8') as file:
    for line in file:
        word = line.strip()  # Remove any leading/trailing whitespace
        
        # Check if the word is in the dictionary and if it's a noun
        if word in word_entries:
            entry = word_entries[word]
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
            
            if gender:  # Only add to output if gender is not empty
                output_data.append([word, gender, plural_form])

# Save the output data to a JSON file
output_file_path = './german_nouns_with_gender_and_plural.json'
with open(output_file_path, 'w', encoding='utf-8') as outfile:
    json.dump(output_data, outfile, ensure_ascii=False, indent=4)

print(f"Data extraction completed. Results saved to {output_file_path}.")
