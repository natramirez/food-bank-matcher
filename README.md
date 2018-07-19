# food-bank-matcher
iXP Hackathon project: Match food banks with each other based on supplies surplus and needs



Getting started with MERN
What's a MERN?

MERN is a combination of four technological platforms: MongoDB, Express, React, and Node.js. Each of these components serve an important purpose: Mongo is the most popular NoSQL database around, Express is a minimal web server, React makes pretty websites, and Node.js allows Javascript to run as a server-side language.
Install dependencies

    First off, we need Node and its package manager, npm.
    Run npm install
    'npm install -g create-react-app' (might need sudo)
    npm install --save express
    Install MongoDB

Get on Git

    Go wherever you want your repo to live and git clone https://github.com/csc648-sp18/csc648-team06.git
    Run git branch -l. Note that there are already branches, including a dev branch and another branching off of dev. Meditate on this, and remember: Do. Not. Push. To. Master.
    git checkout -b dev
    Make a branch off of dev: git checkout -b myBranch
    Now you have a branch. This branch is where your work lives before it's ready for us to see it. It's where you do all your funky, broken things, before they even get pushed to dev. Dev is for code that is production-ready but not yet live--it is not Your Branch. There are many branches, but this one is yours.

Create a frontend with Create-React-App

    create-react-app spill
    cd spill
    npm start
    Visit http://localhost/3000 and bask in the glory!

Create a local MongoDB instance

    Instructions for this can be found on the installation page

Make the Express middleware

    Make a file called app.js, and put this in it: var express = require('express'); var app = express(); var port = 4200; app.listen(port, function(){ console.log('hello world'); })
    Exit the file and run node app

Boom

You now have a working installation of Node.js, a React frontend, a local instance of MongoDB, and an Express app to interact with your Node.js computation. Nice job!
Commit and push

    To YOUR BRANCH.
    Pull the changes into dev. There are probably merge conflicts! Please resolve them with your team.


