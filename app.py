from flask import Flask, render_template, request, redirect, url_for, jsonify
import pandas as pd
import numpy as np
import joblib

# app = Flask(__name__, template_folder='/components')
app = Flask(__name__, static_url_path='/static')

modelRF = joblib.load('RF5Feature.pkl')
model = joblib.load('KNN5Feature.pkl')
modelDCT = joblib.load('DCT5Feature.pkl')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    error_message = None

    # Jika file diunggah
    if 'file' in request.files and 'modelfile' in request.form:
        file = request.files['file']
        if file:
            required_columns = ['pkts', 'bytes', 'spkts', 'sbytes', 'TnBPDstIP']

            modell = 'single'
            df = pd.read_csv(file)
            df_selected = df[required_columns]


            if request.form['modelfile'] == 'knn':
                prediction = model.predict(df_selected.values).tolist() 
                modell = 'KNN'
            elif request.form['modelfile'] == 'dct':
                prediction = modelDCT.predict(df_selected.values).tolist()
                modell = 'Decision Tree'
            elif request.form['modelfile'] == 'rf':
                prediction = modelRF.predict(df_selected.values).tolist()
                modell = 'Random Forest'
            elif request.form['modelfile'] == 'combined':
                #make predictions using all models and average the results and change to list like the others
                prediction_knn = model.predict(df_selected.values).tolist()
                prediction_dct = modelDCT.predict(df_selected.values).tolist()
                prediction_rf = modelRF.predict(df_selected.values).tolist()

                prediction = [((knn + dct + rf) / 3)*100 for knn, dct, rf in zip(prediction_knn, prediction_dct, prediction_rf)]
                modell = 'combined'


            # Include each row's data and prediction
            data = [{'type': 'multiple', 
                     'prediction': prediction, 
                     'data': df_selected.to_dict(orient='records'), 
                     'model' : modell
                     }]  # Convert df to list of dictionaries
            return jsonify({'data': data})
            
    # Jika input manual
    if 'pkts' in request.form and 'bytes' in request.form and 'spkts' in request.form and 'sbytes' in request.form and 'TnBPDstIP' in request.form:
        pkts = float(request.form['pkts'])
        bytes = float(request.form['bytes'])
        spkts = float(request.form['spkts'])
        sbytes = float(request.form['sbytes'])
        TnBPDstIP = float(request.form['TnBPDstIP'])

        input_features = np.array([[pkts, bytes, spkts, sbytes, TnBPDstIP]])

        percent = 0.0

        if request.form['model'] == 'knn':
            prediction = model.predict(input_features)
            model_name = 'KNN'
        elif request.form['model'] == 'dct':
            prediction = modelDCT.predict(input_features)
            model_name = 'Decision Tree'
        elif request.form['model'] == 'rf':
            prediction = modelRF.predict(input_features)
            model_name = 'Random Forest'
        elif request.form['model'] == 'combined':
            prediction_knn = model.predict(input_features)
            prediction_dct = modelDCT.predict(input_features)
            prediction_rf = modelRF.predict(input_features)
            model_name = 'Combined'
            percent = np.mean([prediction_knn, prediction_dct, prediction_rf])*100
            print(f"Combined prediction: {percent}")
            
            prediction = [2]

        data = [{'type': 'single', 'prediction': int(prediction[0]), 'model': model_name, 'percent': percent}]
        return jsonify({'data': data})

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)
