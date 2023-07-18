from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/random_meal')
def get_random_meal():
    try:
        response = requests.get('https://www.themealdb.com/api/json/v1/1/random.php')
        data = response.json()
        return jsonify(data['meals'][0])
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run()