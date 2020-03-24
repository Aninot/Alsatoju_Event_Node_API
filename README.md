# Alsajuto

## FileTree

* __config__ : contains the config to the database to use (depands from the environment)
* __controllers__ : contains the route + the function associate.
* __crawler__ :
* __data__ : base data to use the application
* __models__ : contains the structure of the database
* __services__ : different function use in the project
* __tests__ : all the unit tests are save here

## Debut de doc

`POST /login`

```JSON
{
 "email": "email@mail.com",
 "password": "password"
}
```

`POST /app_users`

```JSON
{
 "email": "ceciEstUnTest@test.com",
 "password": "password",
 "firstName": "",
 "lastName": "",
 "gender": "",
 "sexualityPref": "",
 "avatar": "",
 "username": "",
 "ageTargeted": "",
 "heightInCentimeter": "",
 "description": "",
 "positionRange": 0,
 "geoLocPosition": ""
}
```

## Documentation

* install the npm module with this command : ``npm install apidoc -g``
* regenerate the documentation with this command : ``apidoc -i . -o ./doc -e node_modules`` The documentation is generated from comment into the code.

## URL

* `https://alsatoju-dev.herokuapp.com/` Pour la version develop
* `https://alsajuto.herokuapp.com/` Pour la version master

## Security

* Sequelize a ajouté à partir de la version 5.15 une sécurité contre la plupart des attaques classiques comme l'injection sql.
