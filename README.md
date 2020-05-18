# Restaurant Forum

A restaurant website that can allow people to see many restaurants and discuss the restaurants.

## Getting Started

This instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [npm](https://www.npmjs.com/get-npm)
* [Node.js](https://nodejs.org/en/download/)
* [MySQL](https://dev.mysql.com/downloads/mysql/)
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

### Installing

#### Clone

**Clone this repository to your local machine**

```
git clone https://github.com/a62262002/restaurant_forum.git
```

#### Setup database

Create and use forum database via MySQL Workbench**

```
drop database if exists forum;
create database forum;
use forum;
```

### Setup

**1. Open terminal, change directory to the project folder**

```
cd restaurant_forum
```

**2. Install npm packages**

```
npm install
```

**3. Create .env file**

>/.env
```
touch .env
```

**4. Store API Key in .env file and save**

```
IMGUR_CLIENT_ID = <Your IMUGUR_CLIENT_ID>
```

**5. Edit password in config.json file**

```
"development": {
    "username": "root",
    "password": <Your password>,
    "database": "forum",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": 0
  }
```

**6. Create models in database**

```
npx sequelize db:migrate
```

**7. Create seeds in database**

```
npx sequelize db:seed:all
```

**8. Run the server**

```
npm run dev
```

**9. Success activation if you see the messages below**

```
Example app listening on port 3000
```

You can see the restaurant forum on: [http://localhost:3000](http://localhost:3000)

### Features

* User can register the restaurant forum account.
* User can see all the restaurants and the restaurants in different categories.
* User can see each restaurant and write the comment below the restaurant.
* User can add like and remove like the restaurant.
* User can add favorite and remove favorite the restaurant.
* User can see the latest restaurants and comments.
* User can see the rank that who has the most followers.
* User can see the top 10 restaurants.
* Admin can add new restaurant.
* Admin can edit and delete restaurant.
* Admin can add new category.
* Admin can edit and delete category.

### Test Account information

| Email             | Password | Role  |
|-------------------|----------|-------|
| root@example.com  | 12345678 | admin |
| user1@example.com | 12345678 | user  |
| user2@example.com | 12345678 | user  |

### Built with

* [bcryptjs ^2.4.3](https://www.npmjs.com/package/bcryptjs)
* [body-parser ^1.19.0](https://www.npmjs.com/package/body-parser)
* [connect-flash ^0.1.1](https://www.npmjs.com/package/connect-flash)
* [dotenv ^8.2.0](https://www.npmjs.com/package/dotenv)
* [express ^4.17.1](https://www.npmjs.com/package/express)
* [express-handlebars ^3.1.0](https://www.npmjs.com/package/express-handlebars)
* [express-session ^1.17.0](https://www.npmjs.com/package/express-session)
* [faker ^4.1.0](https://www.npmjs.com/package/faker)
* [imgur-node-api ^0.1.0](https://www.npmjs.com/package/imgur-node-api)
* [method-override ^3.0.0](https://www.npmjs.com/package/method-override)
* [moment ^2.24.0](https://www.npmjs.com/package/moment)
* [multer ^1.4.2](https://www.npmjs.com/package/multer)
* [mysql2 ^2.1.0](https://www.npmjs.com/package/mysql2)
* [passport ^0.4.1](https://www.npmjs.com/package/passport)
* [passport-local ^1.0.0](https://www.npmjs.com/package/passport-local)
* [pg ^7.18.2](https://www.npmjs.com/package/pg)
* [sequelize ^5.21.4](https://www.npmjs.com/package/sequelize)
* [sequelize-cli ^5.5.1](https://www.npmjs.com/package/sequelize-cli)


### Author

* **Emily** - [a62262002](https://github.com/a62262002)


