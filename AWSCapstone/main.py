# import urllib.request, json 
# with urllib.request.urlopen("https://data.sec.gov/submissions/CIK0000078003.json") as url:
#     data = json.loads(url.read().decode())
#     print(data)

import sys
sys.path.append(".")

from Downloader import Downloader
import bs4 as bs
import requests
 
resp = requests.get('http://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
soup = bs.BeautifulSoup(resp.text, 'lxml')
table = soup.find('table', {'class': 'wikitable sortable'})

it = {}
for row in table.findAll('tr')[1:]:
    ticker = row.findAll('td')[0].text.strip()
    #fourth element is the sector
    industry = row.findAll('td')[3].text.strip()

    if industry in it:
        it[industry].append(ticker)
    else:
        it[industry] = [ticker, ]
    

# for key in it.keys():
#     print(key)

# print(it["Information Technology"])

# # Initialize a downloader instance. If no argument is passed
# # to the constructor, the package will download filings to
# # the current working directory.
obj = Downloader("/home/ubuntu/AWS-Contextual-Voice-Search")

# Get all 10-K and 8-K filings for Apple (ticker: AAPL)
for ticker in it["Information Technology"]:
    obj.get("10-K", ticker, amount=1)
    obj.get("8-K", ticker, amount=1)
 