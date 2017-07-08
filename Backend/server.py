from flask import Flask
from flask import request
import ml_application as ml
from twitter import *

try:
    import json
except ImportError:
    import simplejson as json

app = Flask(__name__)

@app.route('/placeholder_get', methods=['GET'])
def placeholder_get():
    return "Hello, World!"

@app.route('/predict_post', methods=['POST'])
def placeholder_post():
    model = ml.train()
    val = ml.classify("Lovely stuff right now", model)
    
    t = Twitter(auth=OAuth("1198351688-gu8BpVlGkwqh30yWpcv9NQiA586PlLmxa4qG583", "CVuTVpCaVbXjJG36E3wwYEHDKvePrDERVh8EujzdEdERa", "sI2HgT4fNu6sdMgnWRr6jupBG", "41pDMQrMv4gDAHQpReB7W4GzpRngpiPdFqlMMQ7OJdBKQUX99k"))
    json_out = t.statuses.user_timeline(screen_name="@KainosAcademy")

    print(json_out)

    return val

if __name__ == '__main__':
    app.run(debug=True)
    print ml.classify("This is a very positive tweet, its great.",model)

# Test the get - curl -X GET http://localhost:5000/placeholder_get
# test the post curl -d "test" -X POST http://localhost:5000/placeholder_post
