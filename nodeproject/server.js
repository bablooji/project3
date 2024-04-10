const express = require("express");
const { Client } = require("pg");
const app = express();
const port = 3000;
// Database connection configuration
const client = new Client({
  user: "postgres",
  host: "evchargerdb.cjlsbfswobs8.us-east-1.rds.amazonaws.com",
  database: "evchargerinst",
  password: "charger2024",
  port: 5432, // PostgreSQL default port
});
// Connect to the PostgreSQL database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

// Route to fetch data from the database
app.get("/red", (req, res) => {
  const query = 'SELECT * FROM "evChargers".evchargesupdated_v2 WHERE ST_DWithin( geom,ST_MakePoint(-74.05166858972046, 40.74988975154915)::geography, 30 *1609.34) AND NOT ST_DWithin( geom, ST_MakePoint(-74.05166858972046, 40.74988975154915)::geography, 19 *1609.34)';
  sendquery(res, query);
});

// Route to fetch data from the database
app.get("/yellow", (req, res) => {
  const query = 'SELECT * FROM "evChargers".evchargesupdated_v2 WHERE ST_DWithin( geom,ST_MakePoint(-74.05166858972046, 40.74988975154915)::geography, 30 *1609.34) AND NOT ST_DWithin(geom, ST_MakePoint(-74.05166858972046, 40.74988975154915)::geography, 19 *1609.34)';
  sendquery(res, query);
});

// Route to fetch data from the database
app.get("/green", (req, res) => {
  const query = 'SELECT * FROM "evChargers".evchargesupdated_v2 WHERE ST_DWithin( geom,ST_MakePoint(-74.05166858972046, 40.74988975154915)::geography, 10 *1609.34)';
  sendquery(res, query);
});

// Execute the query
function sendquery(res, query) {
  client
    .query(query)
    .then((result) => {
      const rows = result.rows;
      res.json(rows); // Send retrieved data as JSON response
    })
    .catch((err) => {
      console.error("Query error", err.stack);
      res.status(500).send("Error retrieving data from database");
    });
}
// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});