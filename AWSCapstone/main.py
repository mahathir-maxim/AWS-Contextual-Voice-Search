# import urllib.request, json 
# with urllib.request.urlopen("https://data.sec.gov/submissions/CIK0000078003.json") as url:
#     data = json.loads(url.read().decode())
#     print(data)
import sys
sys.path.append(".")

from Downloader import Downloader
import bs4 as bs
import requests
import json
 
resp = requests.get('http://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
soup = bs.BeautifulSoup(resp.text, 'lxml')
table = soup.find('table', {'class': 'wikitable sortable'})

ticker_to_cik = {}
count = 0
for row in table.findAll('tr')[1:]:
    ticker = row.findAll('td')[0].text.strip()
    #fourth element is the sector
    CIK = row.findAll('td')[7].text.strip()

    count += 1

    ticker_to_cik[ticker] = CIK

    if count == 100:
        break
    
heads = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"}

for ticker in ticker_to_cik.keys():
    main_req = "https://data.sec.gov/api/xbrl/companyfacts/CIK" + ticker_to_cik[ticker] + ".json"
    resp = requests.get(main_req, headers=heads)
    x = resp.text

    # parse x:
    y = json.loads(x)

    # the result is a Python dictionary:
    outfile = "parsed_json_files/" + str(y["cik"]) + "_json"

    with open(outfile, 'w') as json_file:
        json.dump(y, json_file)

    print("Parsing complete for: " + outfile)


# for key in it.keys():
#     print(key)

# print(it["Information Technology"])

# # Initialize a downloader instance. If no argument is passed
# # to the constructor, the package will download filings to
# # the current working directory.
# obj = Downloader()

# Get all 10-K and 8-K filings for Apple (ticker: AAPL)
# for ticker in it["Information Technology"]:
#     obj.get("10-K", ticker, amount=1)
#     obj.get("8-K", ticker, amount=1)
 