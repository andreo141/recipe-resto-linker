# recipe-resto-linker
Linked Open Data Project

## Getting started:
1. Clone into the repository with ```git clone git@github.com:andreo141/recipe-resto-linker.git```
2. ```cd recipe-resto-linker```
3. ```docker compose build``` or ```docker-compose build```
4. ```cd frontend```
5. run ```npm install --legacy-peer-deps```
6. ```cd ..```
7. ```docker compose up``` or ```docker-compose up```

## Access the frontend:
Go to [http://localhost:4200/](http://localhost:4200/)

## Access the backend:
- For recipes -> [http://localhost/recipes/](http://localhost/recipes/)
- For restaurants -> [http://localhost/restaurants/](http://localhost/restaurants/)

## Test the SPARQL endpoint
1. Go to [http://localhost:8890/sparql/](http://localhost:8890/sparql/)
2. Set the Default Data Set Name to `http://mu.semte.ch/graphs/public`
3. Gather all the data with the following query
```sql
SELECT ?s ?p ?o WHERE{
?s ?p ?o .
}
```

