## NodeJS, Express Boilerplate
This project was created in order to ease the initial steps of the most projects with NodeJS using Exress (you're right, only for backend developers).

When you are chossing which technologies are going to use in your project, there are lots of options, for instance you could use MongoDB with its ODM called Mongoose or maybe you opt to use MySQL with Knex ORM and so.

Therefore, this project has many branchs, one for each option you can choose (if there are).

Before to start check this points:

- ### Create your evironments files 

Make sure to create your `.env.{env}.json` files with your private information (credetians), you must create a file for each environment you will have.

For example: `.env.production.json` will be the file por `production`. 
  
The environments must be: `production`, `development`, `test` & `staging`.

Inside your file you must write this initial options (in order to run our project with no fails)

```
{
  "db": {
    "host": "YOUR_DEVELOPMENT_DB_HOST",
    "port": "YOUR_DEVELOPMENT_DB_PORT",
    "user": "YOUR_DEVELOPMENT_DB_USER",
    "password": "YOUR_DEVELOPMENT_DB_PASSWORD",
    "database": "YOUR_DEVELOPMENT_DB_DATABASE"
  }
}
```
