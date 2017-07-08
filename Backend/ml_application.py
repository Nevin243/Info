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

# placeholder function - take in data, load model, classify and return result
def classify(data):

    # load model
    # clf = joblib.load('Model/filename.pkl') 

    # Classify new data

    # return the result

    # placeholder return of a fake result
    return 'class a'


# placeholder function - create model here (see week one exercises for examples)
def train():

    # load data
    from keras.utils.data_utils import get_file

    path = get_file('imdb_full.pkl',
                origin='https://s3.amazonaws.com/text-datasets/imdb_full.pkl',
                md5_hash='d091312047c43cf9e4e38fef92437263')
    f = open(path, 'rb')
    # process data (split into training / testing etc)
    (training_data, training_labels), (test_data, test_labels)  = pickle.load(f)
    ', '.join(map(str, training_data[0]))
    word_indexes = imdb.get_word_index()
    word_list = sorted(word_indexes, key=word_indexes.get) 
    indexToWord = {v: k for k, v in word_indexes.iteritems()}
    ' '.join([indexToWord[o] for o in training_data[0]])
    vocab_size = 5000
    training_data_reduced = [np.array([i if i<vocab_size-1 else vocab_size-1 for i in s]) for s in training_data]
    test_data_reduced = [np.array([i if i<vocab_size-1 else vocab_size-1 for i in s]) for s in test_data]
    reviewLengths = np.array(map(len, training_data_reduced))
    review_len = 500
    training_data_reduced = sequence.pad_sequences(training_data_reduced, maxlen=review_len, value=0)
    test_data_reduced = sequence.pad_sequences(test_data_reduced, maxlen=review_len, value=0)
    # create model (training)
    conv1 = Sequential([
        Embedding(vocab_size, 32, input_length=review_len),
        Conv1D(64, 5, padding='same', activation='relu'),
        MaxPooling1D(),
        Flatten(),
        Dense(100, activation='relu'),
        Dropout(0.7),
        Dense(1, activation='sigmoid')])
    conv1.compile(loss='binary_crossentropy', optimizer=Adam(), metrics=['accuracy'])
    conv1.fit(training_data_reduced,training_labels, validation_data=(test_data_reduced, test_labels), nb_epoch=4, batch_size=64)
    # calculate accuracy etc - good for slides to show performance!

    # save model - to classify future data from a client
    # from sklearn.externals import joblib
    #joblib.dump(clf, 'Model/filename.pkl') 

    return conv1