import json

def convert_to_number(input_file, output_file):
    with open(input_file, 'r') as f:
        json_data = json.load(f)

    for obj in json_data:
        obj['precoContratual'] = float(obj['precoContratual'].replace(',', '.'))  # Convert string to float

    with open(output_file, 'w') as f:
        json.dump(json_data, f, indent=4, ensure_ascii=False)

    print(f"Converted data saved to '{output_file}'.")

# Example usage:
convert_to_number('contratos2024.json', 'contratos2024_float.json')
