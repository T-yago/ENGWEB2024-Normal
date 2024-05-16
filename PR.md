# REAL TESTE

## Normalização de dados

Para a normalização de dados, criei um script que converte o csv em json, que facilitará o processo de servir rotas CRUD, e adicionei a variante de colocar o campo *"nAnuncio"* como um valor que começa em 1 e que é constantemente incrementado


## Base de dados

Para criar a base de dados e colocar os registos referentes aos contratos, rodei os comandos:

`````
docker exec -it mongoEW mongosh
`````

```
docker cp contratos2024.json mongoEW:/tmp
```

Depois, para criar a base de dados e fazer a importação para a base de dados com o nome "contratos":

````
mongoimport --db <nome_db> --collection <nome_collection> --file /tmp/<nome_ficheiro> --jsonArray
`````

Para testar, usei:

```
show dbs
````

Vi que existia a bd "contratos", entrei:

````
use contratos
````

e depois procurei os registos:

```
db.contratos.find()
````

que devolveu o esperado.


percebi depois que precisa de floats e por isso converti com o novo script e :

`````
db.contratos.drop()
true
`````

e adicionei os novos registo da mesma forma que antes.



*Nota*: Ainda após isso, apercebi-me que faria sentido substituir o campo "idcontrato" por "_id", pelo que procedi a tal alteração usando "CTRL + f" e fiz novamento o processo de adição à base de dados
