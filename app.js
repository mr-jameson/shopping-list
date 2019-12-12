const express = require("express");
const db = require("./db/db");
const bodyParser = require("body-parser");
const methodOverride = require('method-override') // Allows us to use PUT/PATCH/DELETE, because thr browser only has get&post
const routes = require("./routes")
const app = express();
const PORT = 5000;

// allow full CRUD verbs
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(routes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});