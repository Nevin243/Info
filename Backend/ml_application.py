# Add your imports here - SK Learn, Pandas, Keras (only what you need needs imported)
from PIL import Image
import StringIO

# placeholder function - take in data, load model, classify and return result
def classify(data):

    # load model
    # clf = joblib.load('Model/filename.pkl') 

    # Classify new data

    # return the result

    # placeholder return of a fake result
    return 'class a'


def classify_image(data):

    # pulls out the image from the request
    tempBuff = StringIO.StringIO()
    tempBuff.write(data)
    tempBuff.seek(0) 
    image = Image.open(tempBuff)

    # Resize image to size our model is expecting

    # Encode image as a numpy array

    # see solutions 9 on google drive for more guidance

    return 'class b'

# placeholder function - create model here (see week one exercises for examples)
def train():

    # load data

    # process data (split into training / testing etc)

    # create model (training)

    # calculate accuracy etc - good for slides to show performance!

    # save model - to classify future data from a client
    # from sklearn.externals import joblib
    # joblib.dump(clf, 'Model/filename.pkl') 

    print 'model saved'
