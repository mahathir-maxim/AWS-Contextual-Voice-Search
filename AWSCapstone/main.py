# import urllib.request, json 
# with urllib.request.urlopen("https://data.sec.gov/submissions/CIK0000078003.json") as url:
#     data = json.loads(url.read().decode())
#     print(data)

import sys
sys.path.append(".")
from downloader import Downloader
from s3_bucket import Bucket

import bs4 as bs
import requests
import os
import subprocess
import shutil

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

# Initialize a downloader instance. If no argument is passed
# to the constructor, the package will download filings to
# the current working directory.
obj = Downloader("/home/" + os.environ.get('USER') + "/AWS-Contextual-Voice-Search")

# Initialize S3 instance.
mover = Bucket()

count = 0

# # Get all 10-K and 8-K filings for Apple (ticker: AAPL)
for ticker in it["Information Technology"]:
    obj.get("10-K", ticker, amount=1)
    obj.get("8-K", ticker, amount=1)
    count += 1

    # For every 10 company information pulled, store files in S3 and remove from EC2
    if count >= 10:
        count = 0
        out = subprocess.run('aws s3 cp /home/' + os.environ.get('USER') + '/AWS-Contextual-Voice-Search/sec-edgar-filings s3://capstoneproject21/sec-edgar-filings/ --recursive', shell=True)
        # Remove file directory with remaining files
        shutil.rmtree('/home/rakeen/AWS-Contextual-Voice-Search/sec-edgar-filings')

# Save remaining downloaded files
out = subprocess.run('aws s3 cp /home/' + os.environ.get('USER') + '/AWS-Contextual-Voice-Search/sec-edgar-filings s3://capstoneproject21/sec-edgar-filings/ --recursive', shell=True)
# Remove file directory with remaining files
shutil.rmtree('/home/rakeen/AWS-Contextual-Voice-Search/sec-edgar-filings')