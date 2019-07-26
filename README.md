# Restaurant Pocket List

Expense-tracker

# Snapshot
![image](https://github.com/umbrally/expense-tracker-sequelize/blob/master/snapshot.PNG)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Install node.js by nvm
    * download nvm-setup.zip from nvm-windows on github and then unzip it
    * install LTS version of node.js 
```
$ nvm install 10.16.0
```
2. Download MySQL and workbench from official website and install 
* [MAC](https://dev.mysql.com/downloads/mysql)
* [Windows](https://dev.mysql.com/downloads/windows/installer/)


### Installing

1. Download this project 
```
$ git clone https://github.com/umbrally/expense-tracker-sequelize.git
```

2. Install packages used in this project
```
$ npm install
```

3. Create database in MySQL
* Open MySQL workbench.
* Input below code in query tab and execute.
```
drop database if exists expense_tracker;
create database expense_tracker;
use expense_tracker;
```

4. Create table and models by executing db:migrate
* Input below code in terminal
```
$ $ npx sequelize db:migrate
```

5. Create facebook login OAuth
[Facebook for Developers](https://developers.facebook.com/)
Create an new app and using facebook login, and then get applicaiton ID and application Secret. 

6. Set .env and use it
* Step 1. Create an .env file in root.  

* Step 2. Write env data as following. 
```
FACEBOOK_ID=//your fackbook application ID from '5. Create facebook login OAuth' setting
FACEBOOK_SECRET=//your fackbook application Secret from '4. Create facebook login OAuth' setting
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback 
```

6. [http://localhost:3000](http://localhost:3000) execution on your browser
```
$ npm run dev
```


## Features

* User can register by giving email and password. If the email is registered, user will be reminded.
* User can login by email/password or facebook. If email or password is incorrect, user will be reminded. 
* If login is not successful, user will not visit any page and redirect to login page.
* After login is successful, an login session will created and save cookie in user's side. Then, user can use following function:
  ** Only the expense records created by the user will be showed.
  ** Create new record.
  ** Edit, delete function on main page.
  ** Copy the record to create a new one.
  ** Alert modal will show if delete button is clicked. 
  ** User can filter records with month and category.
* User can logout and session will be deleted.  

## Authors

* [Zoey Liu](https://github.com/umbrally) 
