import csv
import json

def csv_to_json(csv_file):
    # Read CSV file
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter=';')
        data = list(reader)

    # Assign sequential numbers to 'nAnuncio'
    for i, entry in enumerate(data):
        entry['nAnuncio'] = i + 1

    # Write JSON data to file
    json_file = 'converted_data.json'
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"Converted data saved to '{json_file}'.")

# Usage
csv_to_json('contratos2024.csv')
