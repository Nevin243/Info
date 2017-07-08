# Add your imports here - SK Learn, Pandas, Keras (only what you need needs imported)
import pickle #for object deserialization
import numpy as np
from keras.datasets import imdb
from keras.preprocessing import sequence
from keras.optimizers import Adam
from keras.models import Sequential
from keras.layers import Input, Embedding, Reshape, merge, LSTM, Bidirectional, Conv1D
from keras.layers import TimeDistributed, Activation, SimpleRNN, GRU, SpatialDropout1D
from keras.layers.core import Flatten, Dense, Dropout, Lambda
from keras.layers.pooling import MaxPooling1D
from sklearn.externals import joblib
import keras

# placeholder function - take in data, load model, classify and return result
def classify(data,model):
    word_indexes = imdb.get_word_index()
    split = data.lower().split()
    for i in range(0,len(split)):
        val = split[i]
        keyval = word_indexes[val]
        if keyval < 5000:
            split[i] = keyval
        else:
            split[i] = 0
    arrays = np.array(split)
    empty = np.zeros(140)
    for i in range(0, len(arrays)):
        empty[i] = arrays[i]
    prediction =model.predict(np.array([empty]))
    return str(np.asscalar(prediction[0][0])*100)

# placeholder function - create model here (see week one exercises for examples)
def train():
    #load data
    conv1 = Sequential([
        Embedding(5000, 32, input_length=140),
        Conv1D(64, 5, padding='same', activation='relu'),
        MaxPooling1D(),
        Flatten(),
        Dense(100, activation='relu'),
        Dropout(0.7),
        Dense(1, activation='sigmoid')])
    conv1.compile(loss='binary_crossentropy', optimizer=Adam(), metrics=['accuracy'])
    conv1.load_weights('weights.h5')
    return conv1
