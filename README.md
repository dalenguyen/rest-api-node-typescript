# Building RESTful Web APIs with Node.js, Express, MongoDB and TypeScript

This is a simple API that saves contact information of people. 

There are two versions of this project. 

- [V1.0.0](https://github.com/dalenguyen/rest-api-node-typescript/tree/v1.0.0): you can run the server directly after cloning this version. It will create a simple RESTful API over HTTP. 
- [V2.0.0](https://github.com/dalenguyen/rest-api-node-typescript/tree/v2.0.0): this is a more secure and control API project. You need to read the post on [how to secure RESTful API application](https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-5-a80e5a7f03db) first. After that, you can run the project.

## Requirements

[NodeJS](https://nodejs.org/en/)

Install global TypeScript and TypeScript Node

```
npm install -g typescript ts-node
```

## Getting Started

You should install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) on your local machine, or use other services such as [mLab](https://mlab.com/) or [Compose](https://www.compose.com/compare/mongodb)

After that, you will have to replace the mongoURL with your MongoDB address in *lib/app.ts*

## Clone this repository

```
git clone git@github.com:dalenguyen/rest-api-node-typescript.git .
```

Then install the dependencies

```
npm install
```

## Start the server

Run in development mode

```
npm run dev
```

Run in production mode 

```
npm run prod
```

## Testing over HTTP (tag [v1.0.0](https://github.com/dalenguyen/rest-api-node-typescript/tree/v1.0.0))

The default URL is: *http://localhost:3000*

+ GET all contacts

```
Send GET request to http://localhost:3000/contact/
```

## Testing over HTTPs (tag [v2.0.0](https://github.com/dalenguyen/rest-api-node-typescript/tree/v2.0.0))

The default URL is: *https://localhost:3000*

The key and cert in the config folder is for testing purpose only. You should generate your own.

*Reference from [Lynda.com](https://www.lynda.com/Node-js-tutorials/Next-steps/633869/671263-4.html)*