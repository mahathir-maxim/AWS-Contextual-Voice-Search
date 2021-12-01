# AWS-Contextual-Voice-Search
Sponsored by AWS

Fall 2021

Group 6:
Maxim
Rakeen 
Bao
Raj
Shivam

-----------------------------------------------------------------------

To run front-end:

cd to /AWS-Contextual-Voice-Search/front-end/aws-csv

To build: npm install

Run command: npm run start

-----------------------------------------------------------------------

To run back-end:

cd to API folder

run . venv/bin/activate

run python3 app.py

-----------------------------------------------------------------------

To run heroku server for ML endpoint connection:

git clone https://github.com/Rob--W/cors-anywhere.git

cd cors-anywhere/

npm install

heroku login -i

heroku create

git push heroku master

After running those commands, you’ll end up with your own CORS Anywhere proxy running at, e.g. https://cryptic-headland-94862.herokuapp.com/. So then instead of prefixing your request URL with https://cors-anywhere.herokuapp.com, prefix it with your proxy’s URL.
