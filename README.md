# airtable-schema-generator

This was made since Airtable disabled their meta API access.  
Download an Airtable app schema to JSON file.  

# Clone the repository && install dependencies

`git clone https://github.com/qumaujean/airtable-schema-generator.git && cd airtable-schema-generator && npm i`  

# Edit generate.js file

Make sure you have password enabled on your Airtable account.  

Change the values of `email`, `password`, `appId`. The appId can be gotten from the URL `https://airtable.com/api`. You should get something like `https://airtable.com/{appId}/api/docs`.  

# Npm start

Running `npm start` will open an electron app browser window that will fill in your username and password. Once the api page loads it will download a json file with the schema information. 

The file will be named something like app3ER7DpQLAKuVP6-dump.json.

# All credits are for https://github.com/cape-io

Forked from https://github.com/cape-io/airtable-schema.

Just fixed some bugs to make it work. Evil airtable. 👿

This was tested under linux.
