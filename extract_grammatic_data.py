import dewiktionaryparser as dw

# Initialize a dictionary for grammatical information
word_entries = dw.GermanNounEntriesDict()

# Generate entries from the Wiktionary XML file
# word_entries.generate_entries('./data/dewiktionary-latest-pages-meta-current.xml')

# Save the resulting dictionary to a JSON file
# word_entries.export_to_json('./data/de_noun_entries.json')

# Retrieve the dictionary from the JSON file
word_entries.retrieve_from_json('./data/de_noun_entries.json')

# Example: Access the gender information for the word "Fußball"
word = "Fußball"
if word in word_entries:
    entry = word_entries[word]
    
    # Extracting gender
    gender = None
    plural_form = None
    for usage in entry.values():
        gender = usage['gen_case_num']['genus']['sg1'][0]  # Accessing gender
        
        # Extracting the plural form in the nominative case
        if 'nominativ' in usage['gen_case_num'] and 'plural' in usage['gen_case_num']['nominativ']:
            plural_form = usage['gen_case_num']['nominativ']['plural']['pl1'][0]
    
    # Print the results
    print(f"The gender of '{word}' is {gender}.")
    if plural_form:
        print(f"The plural form of '{word}' in the nominative case is '{plural_form}'.")
    else:
        print(f"Plural form in the nominative case not found for '{word}'.")
else:
    print(f"The word '{word}' was not found in the dictionary.")