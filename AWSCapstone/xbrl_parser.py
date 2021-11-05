import glob
from typing import Dict
from bs4 import BeautifulSoup
import re
import pandas as pd
import pprint
import json
# print(glob.glob("sec-edgar-filings/*/10-K/*/*.html"))
file_list = [f for f in glob.glob("sec-edgar-filings/*/10-K/*/*.txt")]


for file in file_list:

    try:
        out_arr = file.split("\\")
        out_file = out_arr[1] + "_" + out_arr[2] + "_table.json"
        out_file = "json_files/" + out_file
        print(out_file)
        with open(file, 'r') as file:
            raw_10k = file.read()
        
        #  print(raw_10k[0:1300])

        # Regex to find <DOCUMENT> tags
        doc_start_pattern = re.compile(r'<DOCUMENT>')
        doc_end_pattern = re.compile(r'</DOCUMENT>')

        # Regex to find <TYPE> tag prceeding any characters, terminating at new line
        type_pattern = re.compile(r'<TYPE>[^\n]+')

        doc_start_is = [x.end() for x in doc_start_pattern.finditer(raw_10k)]
        doc_end_is = [x.start() for x in doc_end_pattern.finditer(raw_10k)]

        doc_types = [x[len('<TYPE>'):] for x in type_pattern.findall(raw_10k)]

        document = {}

        # Create a loop to go through each section type and save only the 10-K section in the dictionary
        for doc_type, doc_start, doc_end in zip(doc_types, doc_start_is, doc_end_is):
            if doc_type == '10-K':
                document[doc_type] = raw_10k[doc_start:doc_end]
        
        # display excerpt the document
        print(document['10-K'][0:500])

        # Write the regex
        regex = re.compile(r'(>Item(\s|&#160;|&nbsp;)(1A|1B|6|7A|7|8)\.{0,1})|(ITEM\s(1A|1B|6|7A|7|8))')

        # Use finditer to math the regex
        matches = regex.finditer(document['10-K'])

        # Write a for loop to print the matches
        for match in matches:
            print(match) 
    
        # Matches
        matches = regex.finditer(document['10-K'])

        # Create the dataframe
        test_df = pd.DataFrame([(x.group(), x.start(), x.end()) for x in matches])

        test_df.columns = ['item', 'start', 'end']
        test_df['item'] = test_df.item.str.lower()

        test_df.replace('&#160;',' ',regex=True,inplace=True)
        test_df.replace('&nbsp;',' ',regex=True,inplace=True)
        test_df.replace(' ','',regex=True,inplace=True)
        test_df.replace('\.','',regex=True,inplace=True)
        test_df.replace('>','',regex=True,inplace=True)

        # Display the dataframe
        print(test_df.head())

        # Drop duplicates
        pos_dat = test_df.sort_values('start', ascending=True).drop_duplicates(subset=['item'], keep='last')

        # Set item as the dataframe index
        pos_dat.set_index('item', inplace=True)

        item_6_raw = document['10-K'][pos_dat['start'].loc['item6']:pos_dat['start'].loc['item7']]

        item_6_content = BeautifulSoup(item_6_raw, 'lxml')
        # Display the dataframe
        arr = item_6_content.find_all('td')

        
        capture_next = False
        key = ""
        
        ak = []
        for con in arr: 
            txt = con.get_text()
            
            ak.append(txt)

            # if txt.isalpha():
            #     key = txt
            #     main_dict[key] = []

            # if capture_next:
            #     capture_next = False
            #     if txt.isnumeric():
            #         main_dict[key].append(txt)

            # if "$" in txt:
            #     capture_next = True

        def is_word_string(str):
            for word in str.split():
                for ch in word:
                    if((ch >= 'a' and ch <= 'z') or (ch >= 'A' and ch <= 'Z')):
                        pass
                    elif ch in [":", "-", ",", "(", ")", "."]:
                        pass
                    else:
                        return False
            
            return True

        
        while("" in ak) :
            ak.remove("")
        while("$" in ak) :
            ak.remove("$")
        at = []
        for str in ak:
            at.append(str.strip())
        
        print(at)

        main_dict = {}
        key = "columns"
        main_dict[key] = []
        for i in range(len(at)):

            if is_word_string(at[i]):
                key = at[i]
                main_dict[key] = []
            else:
                main_dict[key].append(at[i])

        pprint.pprint(main_dict)

        f = open(out_file, "w")
        json.dump(main_dict, f)
        f.close()
    except Exception as e:
        print(e)

    



        



