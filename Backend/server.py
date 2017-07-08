from flask import Flask
from flask import request
import ml_application as ml

app = Flask(__name__)

@app.route('/placeholder_get', methods=['GET'])
def placeholder_get():
    return "Hello, World!"

@app.route('/placeholder_post', methods=['POST'])
def placeholder_post():
    return ml.classify(request.stream.read())

@app.route('/placeholder_post_image', methods=['POST'])
def placeholder_post_image():
    return ml.classify_image(request.data)

if __name__ == '__main__':
    app.run(debug=True)

# Test the get - curl -X GET http://localhost:5000/placeholder_get
# test the post curl -d "test" -X POST http://localhost:5000/placeholder_post
