1. Download NodeJS and MySQL
https://dev.mysql.com/downloads/mysql/8.0.html
https://nodejs.org/en/download/prebuilt-installer 

2. Setup Environtment of the MySQL
    a. Environment Variables
    b. System Variables
    c. find "Path"
    d. Add MySQL bin directory to the Path: 
                        C:\Program Files\MySQL\MySQL Server 8.0\bin

3. Download Dependecies:
<npm i>
<init -y>
<npm install express body-parser cors>
<npm install dotenv>

4. Create Database:
a. Open CMD
b. mysql -u root -p 
c. login with root password based on the .env file
d. CREATE DATABASE <name of the database>;
e. USE <name of the database>;
f. CREATE TABLE users (
    Id INT AUTO_INCREMENT PRIMARY key,
    username varchar(100) UNIQUE,
    name varchar(100),
    email varchar(100),
    password varchar(100)
    );

5. Check .env File
a. rename the "DB_NAME" to "name of the created database"
b.

6. Rund the nodeJS server in your terminal
  <node app.js>


To Test the API: using POSTMAN
a. Select the Proper HTTP Method: <POST> or <GET>
b. Enter in the URL: http://localhost:9479/users
c. Go to "Body" and chosoe "RAW"
d. Enter this sample data in a JSON format:

{
  "username": "jdc",
  "name": "Juan Dela Cruz",
  "email": "JDC@gmail.com"
}
Return Value:
{
    "message": "User added successfully.",
    "id": 2,
    "name": "Geroge Dela Cruz",
    "username": "JC"
}

Return Value: (duplicate username or email)
{
    "error": "Username or email already exists."
}


Change password in MYSQL: if needed
1. Open the terminal
2. mysql -u root -p
3. login with root password based on the .env file
4. SET PASSWORD FOR 'root'@'localhost' = 'new_password';
5. FLUSH PRIVILEGES;
6. Re-Login