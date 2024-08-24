import dewiktionaryparser as dw

##################################################################
# Generate dictionary with translation information from xml file #
##################################################################

# Initialize a dictionary for translation information
translations = dw.GermanNounTranslationDict()

# Path to the Wiktionary XML dump file
xml_file_path = './data/dewiktionary-latest-pages-meta-current.xml'

# Generate entries from the Wiktionary XML file
translations.generate_translations(xml_file_path)

# Save the resulting dictionary to a JSON file
output_file_path = './data/de_noun_translations.json'
translations.export_to_json(output_file_path)

print(f"Translation dictionary generated and saved to {output_file_path}.")
