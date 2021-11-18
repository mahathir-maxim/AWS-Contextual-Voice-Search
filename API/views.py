from flask import Blueprint, render_template, jsonify, request
import json

tick = [{"name": "MMM", "cik": "0000066740"}, {"name": "ABT", "cik": "0000001800"}, {"name": "ABBV", "cik": "0001551152"}, {"name": "ABMD", "cik": "0000815094"}, {"name": "ACN", "cik": "0001467373"}, {"name": "ATVI", "cik": "0000718877"}, {"name": "ADBE", "cik": "0000796343"}, {"name": "AMD", "cik": "0000002488"}, {"name": "AAP", "cik": "0001158449"}, {"name": "AES", "cik": "0000874761"}, {"name": "AFL", "cik": "0000004977"}, {"name": "A", "cik": "0001090872"}, {"name": "APD", "cik": "0000002969"}, {"name": "AKAM", "cik": "0001086222"}, {"name": "ALK", "cik": "0000766421"}, {"name": "ALB", "cik": "0000915913"}, {"name": "ARE", "cik": "0001035443"}, {"name": "ALGN", "cik": "0001097149"}, {"name": "ALLE", "cik": "0001579241"}, {"name": "LNT", "cik": "0000352541"}, {"name": "ALL", "cik": "0000899051"}, {"name": "GOOGL", "cik": "0001652044"}, {"name": "GOOG", "cik": "0001652044"}, {"name": "MO", "cik": "0000764180"}, {"name": "AMZN", "cik": "0001018724"}, {"name": "AMCR", "cik": "0001748790"}, {"name": "AEE", "cik": "0001002910"}, {"name": "AAL", "cik": "0000006201"}, {"name": "AEP", "cik": "0000004904"}, {"name": "AXP", "cik": "0000004962"}, {"name": "AIG", "cik": "0000005272"}, {"name": "AMT", "cik": "0001053507"}, {"name": "AWK", "cik": "0001410636"}, {"name": "AMP", "cik": "0000820027"}, {"name": "ABC", "cik": "0001140859"}, {"name": "AME", "cik": "0001037868"}, {"name": "AMGN", "cik": "0000318154"}, {"name": "APH", "cik": "0000820313"}, {"name": "ADI", "cik": "0000006281"}, {"name": "ANSS", "cik": "0001013462"}, {"name": "ANTM", "cik": "0001156039"}, {"name": "AON", "cik": "0000315293"}, {"name": "AOS", "cik": "0000091142"}, {"name": "APA", "cik": "0000006769"}, {"name": "AAPL", "cik": "0000320193"}, {"name": "AMAT", "cik": "0000006951"}, {"name": "APTV", "cik": "0001521332"}, {"name": "ADM", "cik": "0000007084"}, {"name": "ANET", "cik": "0001596532"}, {"name": "AJG", "cik": "0000354190"}, {"name": "AIZ", "cik": "0001267238"}, {"name": "T", "cik": "0000732717"}, {"name": "ATO", "cik": "0000731802"}, {"name": "ADSK", "cik": "0000769397"}, {"name": "ADP", "cik": "0000008670"}, {"name": "AZO", "cik": "0000866787"}, {"name": "AVB", "cik": "0000915912"}, {"name": "AVY", "cik": "0000008818"}, {"name": "BKR", "cik": "0001701605"}, {"name": "BLL", "cik": "0000009389"}, {"name": "BAC", "cik": "0000070858"}, {"name": "BBWI", "cik": "0000701985"}, {"name": "BAX", "cik": "0000010456"}, {"name": "BDX", "cik": "0000010795"}, {"name": "BRK.B", "cik": "0001067983"}, {"name": "BBY", "cik": "0000764478"}, {"name": "BIO", "cik": "0000012208"}, {"name": "TECH", "cik": "0000842023"}, {"name": "BIIB", "cik": "0000875045"}, {"name": "BLK", "cik": "0001364742"}, {"name": "BK", "cik": "0001390777"}, {"name": "BA", "cik": "0000012927"}, {"name": "BKNG", "cik": "0001075531"}, {"name": "BWA", "cik": "0000908255"}, {"name": "BXP", "cik": "0001037540"}, {"name": "BSX", "cik": "0000885725"}, {"name": "BMY", "cik": "0000014272"}, {"name": "AVGO", "cik": "0001730168"}, {"name": "BR", "cik": "0001383312"}, {"name": "BRO", "cik": "0000079282"}, {"name": "BF.B", "cik": "0000014693"}, {"name": "CHRW", "cik": "0001043277"}, {"name": "CDNS", "cik": "0000813672"}, {"name": "CZR", "cik": "0001590895"}, {"name": "CPB", "cik": "0000016732"}, {"name": "COF", "cik": "0000927628"}, {"name": "CAH", "cik": "0000721371"}, {"name": "KMX", "cik": "0001170010"}, {"name": "CCL", "cik": "0000815097"}, {"name": "CARR", "cik": "0001783180"}, {"name": "CTLT", "cik": "0001596783"}, {"name": "CAT", "cik": "0000018230"}, {"name": "CBOE", "cik": "0001374310"}, {"name": "CBRE", "cik": "0001138118"}, {"name": "CDW", "cik": "0001402057"}, {"name": "CE", "cik": "0001306830"}, {"name": "CNC", "cik": "0001071739"}, {"name": "CNP", "cik": "0001130310"}, {"name": "CDAY", "cik": "0001725057"}, {"name": "CERN", "cik": "0000804753"}]

d = {}
for entry in tick:
    d[entry["name"]] = int(entry["cik"])

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("index.html")

@views.route("/data/<company>")
def data(company):

    args = request.args

    at = args["attrb"]

    cik = d[company]

    file_name = "/Users/srs1029/Desktop/AWS-Contextual-Voice-Search/parsed_json_files/" + str(cik) + "_cik.json"

    with open(file_name, "r") as js:
        data = json.load(js)

    attrb_data = data["facts"]["us-gaap"]

    return attrb_data[at]