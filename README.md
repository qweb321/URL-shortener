# Restaurant List

This project provide user can shorten the URL that too much long.

## Table of contents

- [Overview](#Overview)
- [Screenshot](#Screenshot)
- [Installation](#Installation)
- [Built with](#built-with)
- [Author](#author)

## Overview

Users should be able to:

- Input the URL you want to shorten
- Click the button to shorten
- Get the URL after shortening

## Screenshot

![Screenshot](images/screenshot.png)

## Installation

1. Before start, make sure you already install Express and npm

```
git clone https://github.com/qweb321/URL-shortener.git
```

2. In local side, run npm install
3. After installation finished, create an `.env` file and insert the code

```
MONGODB_URI =
  "mongodb+srv://(your mongodb account):(password)@cluster0.w9mfqtb.mongodb.net/(My mongodb)?retryWrites=true&w=majority"
```

4. Run code below to install modules needed

```
npm install
```

5. After installation, run

```
npm run start
```

6. If terminal show the sentence below, means run successfully and click the url

```
app is listening in http://localhost:3000
```

7. If you want to stop

```
ctrl + C
```

## Built with

- Node.js
- Express
- Express-Handlebars
- Javascript
- CSS
- Body-parser
- Dotenv
- Mongoose
- Sweetalert2

## Author

- Website - [Isis Lin](https://github.com/qweb321)
