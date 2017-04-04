# API
## Setup
Assuming you are in root directory of project
```bash
cd api/
npm install
```

## Configure
Edit the `dbconfig.js` file as per your user specifications

## Run the API
 - oracle-xe service should be running or start it using `sudo service oracle-xe start`
 - To start the server, run the following command
```bash
node index.js
```
 - On success, it will show `"Server listening on port 3000!"`
 
## Usage
### select query
 - Make a GET request to, 
```
localhost:3000/select?columns=<comma separated columns or *>&table=<table name>
```
 - Similarly other optional query parameters can be specified
   - where&nbsp;&nbsp;&nbsp;: where condition string
   - groupby&nbsp;: groupby column name
   - orderby&nbsp;: orderby statement
 - Note that the keywords WHERE, GROUP BY or ORDER BY should not be added, only the predicates are needed
### insert query
  - Make a POST request to,
  ```
  localhost:3000/insert
  ```
  - The request body needs to be of type json and the parameters are
    - table&nbsp;&nbsp;&nbsp;`required` : name of table
    - values&nbsp;&nbsp;`required` : comma separated values
    - columns&nbsp;`optional` : comma separated column names
### update query
 - Make a PUT request to,
 ```
 localhost:3000/update
 ```
 - The request body needs to be of type json and the parameteres are
   - table&nbsp;`required` : name of table
   - set&nbsp;&nbsp;&nbsp;`required` : the portion of an update query that follows `SET`
   - where&nbsp;`required` : `WHERE` condition as a string
### delete query
 - Make a DELETE request to,
 ```
 localhost:3000/delete
 ```
 - The request body needs to be of type json and the parameteres are
   - table&nbsp;`required` : name of table
   - where&nbsp;`required` : `WHERE` condition as a string
