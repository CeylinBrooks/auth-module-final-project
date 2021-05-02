# auth-module-final-project

##Code Fellows Lab 09/ 401 JavaScript

##LAB - Class 09

## Project: Project Name: Auth-Module

##Author: 
  - Fizzo Pannosch
  - Ellis Yoo
  - Ceylin Brooks
  - Nicholas Cerillo

## Links and Resources

- ci/cd (https://github.com/CeylinBrooks/auth-module-final-project/pulse) 
- back-end code (https://github.com/CeylinBrooks/auth-module-final-project/tree/dev) 
- front-end code (https://github.com/CeylinBrooks/auth-module-final-project/tree/dev/FRONTEND)
Setup

##.env requirements 
- PORT - 3333
- MONGODB_URI - mongodb://localhost:27017/mydb
- How to initialize/run your application (where applicable)
  - FRONTEND in directory `/FRONTEND' run `nodemon`
  - BACKEND `node index.js`


## Tests
- Tests made
  - can create user to login
  - can sign in with basic
  - can sign in with bearer
  - can save token to cookies
  - basic fails with unknown user
  - bearer fails with bad token
  - Admin can access `/users` route
  - Users cannot access `/users` route
  - Only Admin can delete/add books. 
- Tests not made
  - book can be added
  - book can be deleted
 
##UML / Application Wiring Diagram
![image](https://user-images.githubusercontent.com/66962689/116622043-ad2adf80-a909-11eb-8f47-e07c57a38b08.png)
![image](https://user-images.githubusercontent.com/66962689/116623761-58d52f00-a90c-11eb-8ea2-d8c9a753310d.png)
