# PROJECT 3 - DATA ENGINEERING TRACK 
## Title: EV CHARGERS ACCESSIBILITY & AVAILABILITY
### Project Team: Alan Lawrence, Bhagya Prasad, Bryan Serino, Christopher Marinello, Li Chen
### Completion date: 4/16/2024

## Overview - 
## EV vehicles Unit Sales expected to reach 2.46m vehicles in 2028. Just in the year 2024, EV market alone is project to reach a revenue of US 82.8 billion.
## EV demand is fuelled driven by government incentives & increasing environmental consciousness among consumers.

## Purpose - 
## 
## Nowadays, the adoption of electric vehicles in the US has been steadily increasing. In the meantime, the expansion of charging infrastructure is critical 
## for the widespread adoption of EVs. In the US, various entities, including governments, utilities, and private companies, are investing in the development of charging stations accross the country.
## Also, a need to provide a lightweight user interface with a map showing high availibilty of operational EV Charging stations within a desired radius.

## 
## Solution - 
## The EV Charger accessibility project leverages an automated ETL process using Python to pull EV Charger and their location data using API from NREL.
## The data is brought into a PostgreSQL database hosted on AWS RDS. The dataset was curated for demonstrating the user-driven functionality using JavaScript.
## The premises of our project was used in putting together a highly flexible and loosely coupled technology framework while considering simple UI from a browser.
## 
## In this project, we explore EV charger station data in Data Engineering track:

## DETAILED ETL PROCESSING
    1. extract raw data from NREL API

    2. transform the data in Pandas DataFrame and finalize in  PostgreSQL database via AWS RDS (psycopg2)
        add Geometric column to enable spatial selection (PGIS)

    3. load data to both static API web page in GitHub and Node.js web server 
        build real-time Object Models based on client-defined criteria 
            original design is red/green/yellow zone, due to limited time we only completed part of this
            
    4. access final, clean data via lightweight browser as an interactive map prepared by Leaflet JavaScript
        user can find operational EV charging stations within a driving range by 1 single click.


## keywords & references:

## NREL API - EV data
https://developer.nrel.gov/

## RDS Connection
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL-Lambda.html

## RDS PostgreSQL in AWS
https://www.youtube.com/watch?v=I_fTQTsz2nQ

## Node.js
https://nodejs.org/en

## GEO query in PostgreSQL
https://postindustria.com/postgresql-geo-queries-made-easy/


