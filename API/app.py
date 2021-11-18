from flask import Flask, jsonify, request

import json

app = Flask(__name__)

@app.route("/<cik>")
def data(cik):

    ret = {}

    file_name = "../parsed_json_files/" + cik + "_cik.json"

    with open(file_name, "r") as js:
        data = json.load(js)
    
    ret = data["facts"]["us-gaap"]

    return jsonify(ret)

@app.route("/<cik>/target")
def data2(cik):

    args = request.args

    ret = []

    file_name = "../parsed_json_files/" + cik + "_cik.json"

    with open(file_name, "r") as js:
        data = json.load(js)
    
    if len(args) == 0:
        return jsonify(data)
    elif len(args) >= 1:    
        for key in args.keys():
            attrb = args[key]
            ret.append(data["facts"]["us-gaap"][attrb])


    return jsonify(ret)

if __name__ == "__main__":
    app.run(debug=True, port=8000)