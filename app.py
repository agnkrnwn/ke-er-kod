from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/tahlilpanjang', methods=['GET'])
def get_tahlilpanjang():
    with open('./aseet/data/tahlilpanjang.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    return jsonify(data)

@app.route('/tahlilpendek', methods=['GET'])
def get_tahlilpendek():
    with open('./aseet/data/tahlilpendek.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
