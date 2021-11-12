import glob
import bs4 as bs
import re
import pandas as pd
import json
import csv
from pprint import pprint

# print(glob.glob("sec-edgar-filings/*/10-K/*/*.html"))
file_list = [f for f in glob.glob("parsed_json_files/*.json")]

data_file = open('json_output.csv', 'w', newline='')
csv_writer = csv.writer(data_file)
 
print(len(file_list))

# print(file_list)
count = 0
for file in file_list:

    master_dict = []
    
    with open(file, 'r') as file:
        j_file = file.read()
        y = json.loads(j_file)
        
        
        for attrb in ["Revenues", "NetIncomeLoss", "OperatingIncomeLoss", "ProfitLoss", "ReceivablesNetCurrent", "Assets", "AssetsCurrent", "DebtCurrent", "CommonStockValue"]:
            dict = {}

            if attrb in y["facts"]["us-gaap"]:
                z = y["facts"]["us-gaap"][attrb]
                dict["val_info"] = []
                for val in z["units"]["USD"]:
                    nested_dict = {}
                    
                    dict = {}

                    dict["cik"] = y["cik"]
                    dict["entityName"] = y["entityName"]
                    dict["attribute_name"] = attrb
                    if val["fp"] == "FY":
                        dict["accn"] = val["accn"]
                        dict["value"] = val["val"]
                        dict["filing_date"] = val["filed"]

                        master_dict.append(dict)
                    
                    # if nested_dict != {}:
                    #     dict["val_info"].append(nested_dict)
            
    print(master_dict[0].keys())
    print(master_dict[0].values())

    
    for data in master_dict:
        
        if count == 0:
            header = data.keys()
            csv_writer.writerow(header)
            count += 1
        
        csv_writer.writerow(data.values())
    
    count += 1

print(count)
data_file.close()
        
        # print(y["facts"]["us-gaap"]["CommonStockValue"]["description"])
        # for z in y["facts"]["us-gaap"].keys(): 
        #  ["Revenues", "NetIncomeLoss", "OperatingIncomeLoss", "ProfitLoss", "ReceivablesNetCurrent", "Assets", "AssetsCurrent", "DebtCurrent", "CommonStockValue"]    
        #   accn, cik,form, name_attrb, filing_date, value 

    
    
