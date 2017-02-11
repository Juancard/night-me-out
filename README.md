# Night me out!

## Overview

Here are the specific user stories you should implement for this project:
- User Story: As an unauthenticated user, I can view all bars in my area.
- User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
- User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.
- User Story: As an unauthenticated user, when I login I should not have to search again.

# Quick Start Guide

### Prerequisites

In order to use this app, you must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)

### Installation & Startup

To install this app, simply enter the below in the terminal window:

```bash
$ git clone https://github.com/Juancard/night-me-out your-project
```

To install the dependencies, enter the following in your terminal:

```
$ cd your-project
$ npm install
```

This will install the night-me-out components into the `your-project` directory.

### Setup Twitter Authentication

Please follow [this guide](https://themepacific.com/how-to-generate-api-key-consumer-token-access-key-for-twitter-oauth/994/) to register the application with Twitter and get API keys / secrets.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
TWITTER_KEY=your-client-id-here
TWITTER_SECRET=your-client-secret-here
MONGO_URI=mongodb://localhost:27017/night-me-out
PORT=8080
APP_URL=http://localhost:8080/
```

### Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!

## License

MIT License. [Click here for more information.](LICENSE.md)
