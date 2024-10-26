import json

# Load the reference file and store it in a dictionary with word as key and gender as value
reference_file = "reference.txt"
reference_genders = {}

with open(reference_file, "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split("\t")
        if len(parts) == 2:
            gender_prefix = parts[0]
            word = parts[1]
            # Map 'der', 'die', 'das' to 'm', 'f', 'n' respectively
            gender = {'der': 'm', 'die': 'f', 'das': 'n'}.get(gender_prefix)
            if gender:
                reference_genders[word] = gender

# Load the JSON file
json_file = "german_nouns.json"
with open(json_file, "r", encoding="utf-8") as file:
    data = json.load(file)

# Correct the data based on the reference file and filter out words not in reference
corrected_data = [
    [word, reference_genders[word], plural, translation]
    for word, gender, plural, translation in data
    if word in reference_genders
]

# Save the corrected data to a new JSON file
corrected_json_file = "corrected_german_nouns.json"
with open(corrected_json_file, "w", encoding="utf-8") as file:
    json.dump(corrected_data, file, ensure_ascii=False, indent=4)

print(f"Corrected data has been saved to {corrected_json_file}")
