# project3 node JS implemention


Title: EV CHARGERS ACCESSIBILITY & AVAILABILITY


completed by: Alan Lawrence, Bhagya Prasad, Bryan Serino, Christopher Marinello, Li Chen

complete date: 4/16/2024

description:

Nowadays, the adoption of electric vehicles in the US has been steadily increasing. In the meantime, the expansion of charging infrastructure is critical for the widespread adoption of EVs. In the US, various entities, including governments, utilities, and private companies, are investing in the development of charging stations accross the country.

In this project, we explore EV charger station data in Data Engineering track:

    extract raw data from NREL API

    transform the data in Pandas DataFrame and finalize in  PostgreSQL database via AWS RDS (psycopg2)
        add Geometric column to enable spatial selection (PGIS)

    load data to both static API web page in GitHub and Node.js web server 
        build real-time Object Models based on client-defined criteria 
            original design is red/green/yellow zone, due to limited time we only completed part of this
            
    access final, clean data via lightweight browser as an interactive map prepared by Leaflet JavaScript
        user can find operational EV charging stations within a driving range by 1 single click.

keywords & references:

NREL API - EV data
https://developer.nrel.gov/

RDS Connection
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL-Lambda.html

RDS PostgreSQL in AWS
https://www.youtube.com/watch?v=I_fTQTsz2nQ

Node.js
https://nodejs.org/en

GEO query in PostgreSQL
https://postindustria.com/postgresql-geo-queries-made-easy/


