import json

def convert_tahlil_to_json():
    # Membaca file tahlil.txt
    with open('tahlil.txt', 'r', encoding='utf-8') as file:
        content = file.read()

    # Memisahkan konten menjadi blok-blok
    blocks = content.split('\n\n')

    # Inisialisasi struktur data
    tahlil_data = []

    for i, block in enumerate(blocks, 1):
        lines = block.strip().split('\n')
        if len(lines) >= 3:
            item = {
                'id': i,
                'title': f"{i:02d}",  # Format nomor dengan leading zero
                'arabic': lines[0],
                'latin': lines[1],
                'translation': lines[2]
            }
            tahlil_data.append(item)

    # Menyimpan ke file JSON
    with open('tahlilteks.json', 'w', encoding='utf-8') as json_file:
        json.dump(tahlil_data, json_file, ensure_ascii=False, indent=2)

    print("File tahlilteks.json telah berhasil dibuat.")

# Menjalankan fungsi
convert_tahlil_to_json()