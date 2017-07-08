from flask import Flask
from flask import request
import ml_application as ml

app = Flask(__name__)

@app.route('/placeholder_get', methods=['GET'])
def placeholder_get():
    return "Hello, World!"

@app.route('/placeholder_post', methods=['POST'])
def placeholder_post():
    model = ml.train()
    val = ml.classify("Lovely stuff right now", model)
    return val

if __name__ == '__main__':
    app.run(debug=True)
    print ml.classify("This is a very positive tweet, its great.",model)

# Test the get - curl -X GET http://localhost:5000/placeholder_get
# test the post curl -d "test" -X POST http://localhost:5000/placeholder_post
