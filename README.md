# Spaced Repetition API Server

## Repositories
Server Repo: https://github.com/RX-78GP02A/spaced-repetition-backend 

Client Repo: https://github.com/RX-78GP02A/spaced-repetition-frontend

## Live Links
Heroku Server | Live Link: https://pure-fortress-25740.herokuapp.com/

## Summary
This project uses spaced repetition to allow the user to create an account, learn a set number of Japanese words from a database, keep track of their score, and the number of times they've gotten a word correct and incorrect.

## Technologies Used

### FrontEnd
- JavaScript
- React
- React-Router
- Context
- Cypress (testing)

### Backend
- NodeJs
- Express
- Knex
- CORS
- Chai, Mocha, supertest (testing)
- Frontend
- PostgreSQL

## API documentation

### POST '/api/auth'
Posting a login with a username and password, this endpoint will make sure they match and will create a json web token

### GET '/api/language/'
Endpoint will get the words for the user

### GET '/api/language/head'
Endpoint will get the word the user is learning next

### GET '/api/language/guess'
Endpoint will get the user's guess and compare it to the translation in the database