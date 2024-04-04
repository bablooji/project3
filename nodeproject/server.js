const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Database connection configuration
const client = new Client({
  user: 'postgres',
  host: 'evchargerdb.cjlsbfswobs8.us-east-1.rds.amazonaws.com',
  database: 'evchargerinst',
  password: 'charger2024',
  port: 5432, // PostgreSQL default port

});

// Connect to the PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Route to fetch data from the database
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM "evChargers".tristate_northeast_v';

  // Execute the query
  client.query(query)
    .then(result => {
      const rows = result.rows;
      res.json(rows); // Send retrieved data as JSON response
    })
    .catch(err => {
      console.error('Query error', err.stack);
      res.status(500).send('Error retrieving data from database');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
