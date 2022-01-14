# companyName_to_cik.json and list.txt in API\static is auto-generated, and
# upon data update those files will also be updated. When they are updated with new company
# information, updated files must be manually moved to the proper destination front-end\aws-csv\src\assets
# Also, convert list.txt to list.json. 

from flask import Flask, jsonify, request

import json

app = Flask(__name__)

# @app.route("/<cik>")
# def data(cik):

#     ret = {}

#     file_name = "../parsed_json_files/" + cik + "_cik.json"

#     with open(file_name, "r") as js:
#         data = json.load(js)
    
#     ret = data["facts"]["us-gaap"]

#     return jsonify(ret)

# @app.route("/<cik>/target")
# def data2(cik):

#     args = request.args

#     ret = []

#     file_name = "parsed_json_files/" + cik + "_cik.json"

#     with open(file_name, "r") as js:
#         data = json.load(js)
    
#     if len(args) == 0:
#         return jsonify(data)
#     elif len(args) >= 1:    
#         for key in args.keys():
#             attrb = args[key]
#             ret.append(data["facts"]["us-gaap"][attrb])


#     return jsonify(ret)

@app.route("/test1/<cik>/target?")
def data2(cik):

    args = request.args

    ret = []

    file_name = "parsed_json_files/" + cik + "_cik.json"

    with open(file_name, "r") as js:
        data = json.load(js)
    
    if len(args) == 0:
        return jsonify(data)
    elif len(args) >= 1:    
        for key in args.keys():
            attrb = args[key]
            ret.append(data["facts"]["us-gaap"][attrb])


    return jsonify(ret)

# 
# attrb = <attribute> ; year = <year>
# 
@app.route("/<cik>/<attrb>/<year>")
def data3(cik, attrb, year):

    # c = company.split("#")
    # company = " ".join(c)

    args = request.args

    ret = []

    # # load company name to cik mapping
    # c_to_cik = {} 
    # file_name = "static/companyName_to_cik.json" 
    # with open(file_name, "r") as js:
    #     c_to_cik = json.load(js)

    # cik = c_to_cik[company]

    file_name = "../parsed_json_files/" + cik + "_cik.json"

    with open(file_name, "r") as js:
        data = json.load(js)
       
         
    for entry in data["facts"]["us-gaap"][attrb]["units"]["USD"]:
        filed_date = entry["filed"]
        y, m, d = filed_date.split("-")
        if int(y) == int(year):
            ret.append(entry)

    return jsonify(ret)

if __name__ == "__main__":
    app.run(debug=True, port=8000)