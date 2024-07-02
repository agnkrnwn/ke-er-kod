import json
import re

def parse_tahlil(content):
    sections = re.split(r'<h3><strong>\d+\.\s*', content)
    tahlil_data = []

    for index, section in enumerate(sections[1:], start=1):  # Skip the first empty section
        title_match = re.match(r'(.*?)</strong></h3>', section)
        if title_match:
            title = title_match.group(1).strip()
            
            # Extract Arabic text
            arabic_match = re.search(r'<p style="text-align: right;"><span style="font-weight: 400;">(.*?)</span></p>', section)
            arabic = arabic_match.group(1).strip() if arabic_match else ""
            
            # Extract Latin text
            latin_match = re.search(r'<p style="text-align: right;"><em><span style="font-weight: 400;">(.*?)</span></em>', section)
            latin = latin_match.group(1).strip() if latin_match else ""
            
            # Extract translation
            translation_match = re.search(r'<p><span style="font-weight: 400;">(.*?)</span></p>', section)
            translation = translation_match.group(1).strip() if translation_match else ""
            
            tahlil_data.append({
                "id": f"tahlil_{index:02d}",
                "title": title,
                "arabic": arabic,
                "latin": latin,
                "translation": translation
            })

    return tahlil_data

# Read content from tahliltext.html
with open('tahliltext.html', 'r', encoding='utf-8') as file:
    tahlil_content = file.read()

# Parse the content
tahlil_data = parse_tahlil(tahlil_content)

# Convert to JSON
tahlil_json = json.dumps(tahlil_data, ensure_ascii=False, indent=2)

# Save to file
with open('tahlil.json', 'w', encoding='utf-8') as f:
    f.write(tahlil_json)

print("Parsing complete. Data saved to tahlil.json")