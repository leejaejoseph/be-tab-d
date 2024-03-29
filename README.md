# be tab’d: CSV to Relational Database Tables Web Application

Welcome to be tab’d! This is a full stack web application for CSV file uploaders who want to organize files into relational database tables.

As a software developer who is interested in backend development, I wanted to build a project that would help me gain a deeper understanding of working with data and databases. I created be tab’d, a web application that allows users to upload CSV files and convert them into relational database tables. While the project currently requires users to upload a set collection of CSV file, my plan is to improve the project by making it automatically parse CSV files with a multitude of headers. Through building this project, I have learned a lot about backend technologies such as PostgreSQL, as well as how to structure and manipulate data in the backend. I am excited to continue improving this project and applying my newfound knowledge to future projects.

## Link To Project
[be-tab-d.youngjae.me](http://be-tab-d.youngjae.me)

## Demonstration
https://user-images.githubusercontent.com/116613246/227737090-475e1144-37f2-4bef-b7fd-8a32cc762834.mp4


## Used Technologies
- ES6, React
- TailwindCSS, Css
- PostgreSQl
- Node.js, npm
- Figma
- Heroku
- Express.js
- AWS EC2, Dokku
- jwt, argon2

## Features
- User can sign up and login to account.
- User can upload set-csv
- User can view relational database table based on uploaded CSV files

## In-Development Stretch Features
- User can upload any csv files.
- User can upload docs or pdf files.
- User can gain statistical keywords from doc or pdf files.
- User can organize folder/file groups based on keywords.

## Requirements
- Runtime: Node.js
- Database: PostgreSQL

## Instructions
Go to the repository and under 'downloads' and install the csv for students, teachers, and courses. Enter [be-tab-d.youngjae.me](be-tab-d.youngjae.me), go to the sign-up page, sign-in then input the files for the teacher's csv first, input a description, and enter the table's type [teachers], repeat for courses, then for students. Click on the view tables button and view.

You can also use the account information below to check what the table looks like when all of the tables are uploaded. 
Username: Username
Password: Password

To run in personal computer, download repository and install necessary dependencies with npm -i. Most of the development side can be viewed with npm run dev, but in terms of starting up the database and creating PostgreSQL, you will need to run 'sudo service postgresql start', 'npm run db:import', pgweb --db=csvDatabase'. In the console you can open the database on localhost set to port 8081. For seeing the page npm run dev to view on localhost:3000. Go to the repository and under 'downloads' and install the csv for students, teachers, and courses. Go to the sign-up page, sign-in then input the files for the teacher's csv first, input a description, and enter the table's type [teachers], repeat for courses, then for students. Click on the view tables button and view. 

In case of npm run dev not running in '/server/error-middleware.js', change path of ClientError = require to './public/client-error.'

