# Introduction - Hotel Management System
Mini Project for the subject distributed databases. Connects to an Oracle database. Built on Angular 2 using the seed repository found [here](https://github.com/mgechev/angular-seed)

# Prequisites
 - node.js with versions as mentioned in the seed repository
 - Any other requirements mentioned in the seed repository
 - Oracle 11g Enterprise or Express edition with the database ready in it

# Setup & Run
1. Clone the repository
```bash
git clone https://github.com/pavan-08/ddb-miniproject.git
```
2. Setting up node packages
```bash
cd ddb-miniproject/
npm install
```
3. Run the project on `http://localhost:8081`
```bash
npm start
```
4. Build project
```bash
npm run webpack.build               # The output is built into dist/webpack/
```
After building, the output folder(dist/webpack/) can be uploaded to the servers where the server would be spun on the output folder.
