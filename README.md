# Welcome to my-app!
This is the capstone React project for the [Meta Front-End Developer Professional Certificate](https://www.coursera.org/professional-certificates/meta-front-end-developer). Please feel free to leave
comments, make pull requests, or just contact/connect with me directly! 

LinkedIn: [https://www.linkedin.com/in/grantklee/](https://www.linkedin.com/in/grantklee/)

# Note:
The API provided in the course is no longer available therefore, I have created my 
own version of the API in Azure with Azure SQL. 
The API is deployed on Azure and a preview version of the working web app is deployed here:
[https://white-grass-019da1a10.4.azurestaticapps.net/](https://white-grass-019da1a10.4.azurestaticapps.net/)

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
