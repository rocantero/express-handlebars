# ShopKeeper Challenge
Build an Express + Handlebars application to answer the question "How many new listings per month are created by each broker and what is the average revenue per listing?".

Stack:
- NodeJS 
- Express 
- KnexJS
- Handlebars 
- ChartJS 
- SimpleDatatables 

## Installation
NodeJS 20 is needed to run this app.
``` $ nvm use 20 
$ npm install
$ npm run start
```
Then navigate to [http://localhost:3000](http://localhost:3000)

## Live Demo
You can see a pre-rendered version [here](https://rocantero.github.io/express-handlebars/)


## Considerations
* Get data from PostgreSQL using KnexJS
* Graph a line chart where X-axis is the avg revenue per deal, X-axis are the months between Nov 2020 and Nov 2021
* Load ChartJS and SimpleDatatables from CDN
* Display the count of new deals per broker on a tooltip legend


