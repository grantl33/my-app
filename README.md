# Welcome to my-app!
This is the capstone React project for the [Meta Front-End Developer Professional Certificate](https://www.coursera.org/professional-certificates/meta-front-end-developer) aka The Little Lemon. This project was built with the React JS framework and deployed on Azure with a Azure SQL database connection.
The live working web app can be viewed here:
[https://white-grass-019da1a10.4.azurestaticapps.net/](https://white-grass-019da1a10.4.azurestaticapps.net/)

Features:
|Home Page|Reservations Page|Responsive Design|
|--------------------|--------------------|----------|
|<img src="https://white-grass-019da1a10.4.azurestaticapps.net/images/screenshot_01.png" alt="Home Page" />|<img src="https://white-grass-019da1a10.4.azurestaticapps.net/images/screenshot_02.png" alt="Reservations Page" />|<img src="https://white-grass-019da1a10.4.azurestaticapps.net/images/screenshot_iphone01.png" alt="Responsive Design" />|
|Semantic HTML, interactive UI components, responsive CSS, React routes for naviation, modern web page design with grids/flex|Live data and connection to Azure SQL database, use of React features (reducers, hooks, side effects, state, and context), form validation and intuitive form controls, mocked API tests and unit tests|Responsive design that adapts to mobile phone screens, use of CSS media queries|

Please feel free to leave
comments, make pull requests, or just contact/connect with me directly! 

LinkedIn: [https://www.linkedin.com/in/grantklee/](https://www.linkedin.com/in/grantklee/)

# Note:
The API provided in the course is no longer available therefore, I have implemented my 
own version of the API in Azure with a database connection to Azure SQL. 


To start the local dev API use:
```
swa start --data-api-location swa-db-connections
```
The API DB connection configuration is in:
/swa-db-connections/staticwebapp.database.config.json

and relies on the local env for DATABASE_CONNECTION_STRING:
```
export DATABASE_CONNECTION_STRING="Server=tcp:grantdb.database.windows.net,1433;Initial Catalog=grantdb01;Persist Security Info=False;User ID=CloudSA8e83c0b3;Password={MYPASSWORD};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
```
