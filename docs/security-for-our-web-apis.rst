Security for our Web APIs
=========================

In this chapter, I will show you various methods to secure your RESTful Web APIs. You should use at least one or combine those methods for a more secure API application.

And if you want to use services like `mLab <https://mlab.com/>`_ , `compose <https://www.compose.com/>`_  …, they have already implemented a secured system on their end. All that you need to do is to follow their instructions to hook the database to your app.

Method 1: The first and foremost is that you should always use HTTPS over HTTP
------------------------------------------------------------------------------

For local testing, I will use OpenSSL on Windows to generate the key and certificate for HTTPS configuration. The process is similar on Mac or Linux.

After installing OpenSSL, I will open `OpenSSL <https://slproweb.com/products/Win32OpenSSL.html>`_  and start generating key and cert files.

.. code-block:: bash

    OpenSSL> req -newkey rsa:2048 -nodes -keyout keytemp.pem -x509 -days 365 -out cert.pem
    OpenSSL> rsa -in keytemp.pem -out key.pem

After that, we will move **key.pem** and **cert.pem** files to our project. They will be in the config folder.

Then we will edit the server.ts file to enable https.

.. code-block:: typescript

    // server.ts

    import app from './app';
    import * as https from 'https';
    import * as fs from 'fs';
    const PORT = 3000;
    const httpsOptions = {
        key: fs.readFileSync('./config/key.pem'),
        cert: fs.readFileSync('./config/cert.pem')
    }
    https.createServer(httpsOptions, app).listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
    })

For testing the server, we will run

.. code-block:: bash

    ts-node .\lib\server.ts

From now on, our application will always run over HTTPS.

.. figure:: images/get-data-over-https.png
    :scale: 70%
    :align: center

    Getting data over HTTPS (Postman)

.. figure:: images/cannot-get-data-with-http.png
    :scale: 70%
    :align: center

    You will get no response and an error if trying to access over HTTP

Method 2: Using secret key for authentication
---------------------------------------------

This method uses a unique key to pass in the URL, so you can access the database. You can use crypto to create a key from your command line.

.. code-block:: bash

    node -e "console.log(require('crypto').randomBytes(20).toString('hex'))"

.. image:: images/unique-key.png

Now, we will use middleware to check for the key before responding to a request. For example, if you want to get all contacts, you need to pass a key.

.. code-block:: bash

    // GET request
    https://127.0.0.1:3000?key=78942ef2c1c98bf10fca09c808d718fa3734703e

We will edit the **/lib/routes/crmRouters.ts** before sending the request. 

.. important:: Remember that, in production, you should pass the key in the environment, not directly like in the example.

.. code-block:: typescript

    // lib/routes/crmRouters.ts

    // get all contacts
    app.route('/contact')
    .get((req: Request, res: Response, next: NextFunction) => {
        // middleware          
        if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
            res.status(401).send('You shall not pass!');
        } else {
            next();
        }                        
    }, this.contactController.getContacts)

.. figure:: images/get-data-with-key.png
    :scale: 70%
    :align: center

    We are allowed to get the data with key

.. figure:: images/cannot-get-data-without-key.png
    :scale: 70%
    :align: center
    
    You cannot access without a key

Method 3: Secure your MongoDB
-----------------------------

It’s sad that by default, there is no security for MongoDB like at all. If you want to check your current configuration. Go to your mongo installation directory and type mongo.

.. image:: images/mongo-windows.png

As you can see, there is no Access control for the database and anyone can do anything with the database. So we will enable authentication feature for MongoDB.

First, we need to create an account in order to authenticate with Mongodb.

.. image:: images/create-mongodb-account.png

After that, we will stop and restart MongoDB with authentication. Remember to check your dbpath.

.. code-block:: bash

    // Stop MongoDB (Windows)
    net stop MongoDB

    // Start mongodb with authentication
    mongod --auth --port 27017 --dbpath C:\your-data\path

Now, if we login to the mongo shell, there is no warning about access control.

.. image:: images/login-mongodb.png

Or you can connect to the mongo shell with username and password you just created.

.. code-block:: bash 

    mongo --port 27017 -u dalenguyen -p 123123  --authenticationDatabase CRMdb

Now, if we try to access the database even with the key, we are not able to.

.. figure:: images/cannot-get-data-without-login.png
    :scale: 70%
    :align: center

    Cannot get data even with key


That’s why we need to edit the mongodb URL in order for the app to work. Again, you should put the mongodb URI to the environment.

.. code-block:: typescript

    // lib/app.ts

    class App {
    ...
    public mongoUrl: string = 'mongodb://dalenguyen:123123@localhost:27017/CRMdb';

Then you restart RESTful API, everything will starts working fine again, but now you have a more secure and control API application. There are more security methods that we can implement to improve our application. I will try to update all of them in other posts.

After this, now we have a fully secure and working RESTful Web APIs application with TypeScript and Nodejs. If you want to check all the code, please visit my `github repository <https://github.com/dalenguyen/rest-api-node-typescript>`_  for the full code.