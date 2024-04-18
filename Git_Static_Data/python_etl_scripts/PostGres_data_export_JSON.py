import json
import psycopg2
from pathlib import Path
from postgresRDSConnect import host, database, user, password, port

# File path for JSON export
JSON_FILE = Path("data/tristatecharingstations.json")

# Connect to PostgreSQL
conn = psycopg2.connect(
    host=host,
    database=database,
    user=user,
    password=password,
    port=port
)
query = 'SELECT * FROM "evChargers"."EV_Charging_Tristate";'

# Execute query and fetch results
cur = conn.cursor()
cur.execute(query)
rows = cur.fetchall()

# Convert rows to JSON
data = []
for row in rows:
    data.append(dict(zip([col[0] for col in cur.description], row)))

# Write JSON data to file
with open(JSON_FILE, "w") as json_file:
    json.dump(data, json_file, indent=4)

# Close cursor and connection
cur.close()
conn.close()
